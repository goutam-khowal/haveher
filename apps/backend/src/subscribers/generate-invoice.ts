import { SubscriberConfig, SubscriberArgs } from "@medusajs/medusa";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import os from "os";
import { Resend } from "resend";
import dotenv from "dotenv";

// Force load project .env keys inside background subscriber threads
dotenv.config();

export default async function orderPlacedInvoiceHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve("query");
  const orderId = event.data.id;

  // 1. Fetch complete order context data using Medusa v2 unified Graph Engine
  const {
    data: [order],
  } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "total",
      "subtotal",
      "shipping_total",
      "created_at",
      "email",
      "metadata",
      "items.*",
      "shipping_address.*",
    ],
    filters: { id: orderId },
  });

  if (!order) return;

  const displayId =
    order.metadata?.custom_invoice_id || order.id.slice(-8).toUpperCase();
  const invoiceFilename = `invoice-${displayId}.pdf`;

  // FIXED FOR WINDOWS WATCHER CRASH: Route output to absolute machine temp memory
  const tempFolder = os.tmpdir();
  const outputPath = path.join(tempFolder, invoiceFilename);

  // 2. Local PDF Rendering Pipeline
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Header & Brand Styling (Blush & Berry Accent)
  doc
    .fillColor("#D45C88")
    .font("Helvetica-Bold")
    .fontSize(24)
    .text("HaveHer", 50, 50);
  doc
    .fillColor("#4B5563")
    .font("Helvetica")
    .fontSize(9)
    .text("HaveHer Fashion Ltd.", 50, 80)
    .text("New Delhi, Delhi, India", 50, 95)
    .text("support@haveher.com", 50, 110);

  doc
    .fillColor("#111827")
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("INVOICE", 400, 50, { align: "right" });
  doc
    .fillColor("#4B5563")
    .font("Helvetica")
    .fontSize(9)
    .text(`Invoice No: ${displayId}`, 400, 75, { align: "right" })
    .text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 400, 90, {
      align: "right",
    });

  doc
    .strokeColor("#F3F4F6")
    .lineWidth(1)
    .moveTo(50, 135)
    .lineTo(550, 135)
    .stroke();

  // Shipping Addresses
  doc
    .fillColor("#111827")
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Bill & Ship To:", 50, 155);
  const addr = order.shipping_address || {};
  doc
    .fillColor("#4B5563")
    .font("Helvetica")
    .fontSize(9)
    .text(`${addr.first_name || ""} ${addr.last_name || ""}`, 50, 175)
    .text(`${addr.address_1 || ""}`, 50, 190)
    .text(`${addr.city || ""}, ${addr.postal_code || ""}`, 50, 205)
    .text(`Phone: ${addr.phone || "N/A"}`, 50, 220);

  // Item List Header Box
  let itemY = 260;
  doc.fillColor("#F9EEF2").rect(50, itemY, 500, 20).fill();
  doc
    .fillColor("#9D174D")
    .font("Helvetica-Bold")
    .fontSize(9)
    .text("Item Summary", 60, itemY + 6)
    .text("Qty", 350, itemY + 6, { width: 30, align: "center" })
    .text("Price", 400, itemY + 6, { width: 60, align: "right" })
    .text("Total", 480, itemY + 6, { width: 60, align: "right" });

  // Render Line Items
  doc.fillColor("#4B5563").font("Helvetica");
  order.items?.forEach((item: any) => {
    itemY += 25;
    doc.text(item.title, 60, itemY, { width: 280, truncate: true });
    doc.text(item.quantity.toString(), 350, itemY, {
      width: 30,
      align: "center",
    });
    doc.text(`${(item.unit_price / 100).toFixed(2)}`, 400, itemY, {
      width: 60,
      align: "right",
    });
    doc.text(
      `${((item.unit_price * item.quantity) / 100).toFixed(2)}`,
      480,
      itemY,
      { width: 60, align: "right" },
    );
  });

  // Calculation Footers
  itemY += 40;
  doc
    .strokeColor("#E5E7EB")
    .lineWidth(0.5)
    .moveTo(350, itemY)
    .lineTo(550, itemY)
    .stroke();

  itemY += 10;
  doc.font("Helvetica").text("Subtotal:", 350, itemY);
  doc.text(`INR ${(order.subtotal / 100).toFixed(2)}`, 480, itemY, {
    width: 60,
    align: "right",
  });

  itemY += 15;
  doc.text("Shipping:", 350, itemY);
  doc.text(`INR ${(order.shipping_total / 100).toFixed(2)}`, 480, itemY, {
    width: 60,
    align: "right",
  });

  itemY += 20;
  doc
    .fillColor("#9D174D")
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Total Paid Amount:", 320, itemY);
  doc.text(`INR ${(order.total / 100).toFixed(2)}`, 480, itemY, {
    width: 60,
    align: "right",
  });

  doc.end();
  console.log(
    `[HaveHer Assets] Local invoice PDF built safely in temp storage: ${invoiceFilename}`,
  );

  // 3. SECURE RESEND TRANSACTIONAL EMAIL TRANSMISSION
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn(
        "⚠️ [Resend Skip] Missing RESEND_API_KEY inside project environment mapping file.",
      );
      return;
    }

    const resend = new Resend(resendApiKey);
    const invoiceUrl = order.metadata?.razorpay_invoice_url || "";
    const customerName = order.shipping_address?.first_name || "there";
    const orderTotalAmount = (order.total / 100).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

    const emailHtmlPayload = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background-color: #fcfbfa; color: #1a1a1a; margin: 0; padding: 0; }
          .wrapper { max-width: 580px; margin: 40px auto; background: #ffffff; border: 1px solid #f0eded; border-radius: 24px; overflow: hidden; }
          .header { text-align: center; padding: 40px 20px; background: #fffcfd; border-bottom: 1px solid #fef0f5; }
          .logo { font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #be185d; text-transform: uppercase; text-decoration: none; }
          .content { padding: 40px 32px; }
          .greeting { font-size: 18px; font-weight: 600; color: #111111; margin-bottom: 8px; }
          .infobox { background: #faf8f7; border-radius: 16px; padding: 20px; margin: 24px 0; }
          .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
          .label { color: #71717a; }
          .value { font-weight: 600; color: #18181b; }
          .btn-container { text-align: center; margin-top: 32px; }
          .btn { display: inline-block; background-color: #be185d; color: #ffffff !important; font-weight: 600; font-size: 14px; text-decoration: none; padding: 14px 32px; border-radius: 50px; }
          .footer { text-align: center; padding: 32px 20px; font-size: 12px; color: #a1a1aa; background: #fafafa; border-top: 1px solid #f4f4f5; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header"><a href="https://haveher.com" class="logo">HAVEHER</a></div>
          <div class="content">
            <div class="greeting">Hi ${customerName},</div>
            <p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin: 0;">
              Your order has been placed successfully! We are preparing your heritage selection with the utmost care. Here are your purchase details:
            </p>
            <div class="infobox">
              <div class="row"><span class="label">Order Reference</span><span class="value" style="color: #be185d;">${displayId}</span></div>
              <div class="row"><span class="label">Total Amount Paid</span><span class="value">${orderTotalAmount}</span></div>
              <div class="row"><span class="label">Shipping Destination</span><span class="value">${order.shipping_address?.city || "India"}</span></div>
            </div>
            ${
              invoiceUrl
                ? `
              <div class="btn-container">
                <a href="${invoiceUrl}" target="_blank" class="btn">Download Razorpay Tax Invoice</a>
              </div>
            `
                : ""
            }
          </div>
          <div class="footer">&copy; ${new Date().getFullYear()} HAVEHER. All Rights Reserved.</div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: "HaveHer <onboarding@resend.dev>",
      to: [order.email],
      subject: `Your HaveHer Order Confirmation - ${displayId}`,
      html: emailHtmlPayload,
    });

    console.log(
      `[Resend Email] Confirmation successfully transmitted to ${order.email}`,
    );
  } catch (emailError) {
    console.error(
      "[Resend System Error] Failed to drop email notification execution:",
      emailError,
    );
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
