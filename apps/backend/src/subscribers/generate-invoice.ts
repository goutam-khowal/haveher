import { SubscriberConfig, SubscriberArgs } from "@medusajs/medusa";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import os from "os";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// Explicit type layout definition for Medusa's standard order addresses
interface OrderAddress {
  first_name?: string;
  last_name?: string;
  address_1?: string;
  city?: string;
  postal_code?: string;
  phone?: string;
}

export default async function orderPlacedInvoiceHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve("query");
  const orderId = event.data.id;

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

  const tempFolder = os.tmpdir();
  const outputPath = path.join(tempFolder, invoiceFilename);

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const stream = fs.createWriteStream(outputPath);

  doc.pipe(stream);

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

  doc
    .fillColor("#111827")
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Bill & Ship To:", 50, 155);

  // FIX: Casting 'as OrderAddress' to satisfy strict compiler checks
  const addr = (order.shipping_address || {}) as OrderAddress;
  doc
    .fillColor("#4B5563")
    .font("Helvetica")
    .fontSize(9)
    .text(`${addr.first_name || ""} ${addr.last_name || ""}`, 50, 175)
    .text(`${addr.address_1 || ""}`, 50, 190)
    .text(`${addr.city || ""}, ${addr.postal_code || ""}`, 50, 205)
    .text(`Phone: ${addr.phone || "N/A"}`, 50, 220);

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

  doc.fillColor("#4B5563").font("Helvetica");
  order.items?.forEach((item: any) => {
    itemY += 25;
    const itemPriceRaw = Number(item.unit_price);
    const itemQuantity = Number(item.quantity);
    const rawPrice = itemPriceRaw > 100000 ? itemPriceRaw / 100 : itemPriceRaw;

    // FIX: Removed invalid 'truncate' field from TextOptions config dictionary block
    doc.text(item.title, 60, itemY, { width: 280 });
    doc.text(itemQuantity.toString(), 350, itemY, {
      width: 30,
      align: "center",
    });
    doc.text(`${rawPrice.toFixed(2)}`, 400, itemY, {
      width: 60,
      align: "right",
    });
    doc.text(`${(rawPrice * itemQuantity).toFixed(2)}`, 480, itemY, {
      width: 60,
      align: "right",
    });
  });

  itemY += 40;
  doc
    .strokeColor("#E5E7EB")
    .lineWidth(0.5)
    .moveTo(350, itemY)
    .lineTo(550, itemY)
    .stroke();

  itemY += 10;
  const numSubtotal = Number(order.subtotal);
  const numShipping = Number(order.shipping_total);
  const numTotal = Number(order.total);

  const rawSubtotal = numSubtotal > 100000 ? numSubtotal / 100 : numSubtotal;
  const rawShipping = numShipping > 100000 ? numShipping / 100 : numShipping;
  const rawTotal = numTotal > 100000 ? numTotal / 100 : numTotal;

  doc.font("Helvetica").text("Subtotal:", 350, itemY);
  doc.text(`INR ${rawSubtotal.toFixed(2)}`, 480, itemY, {
    width: 60,
    align: "right",
  });

  itemY += 15;
  doc.text("Shipping:", 350, itemY);
  doc.text(`INR ${rawShipping.toFixed(2)}`, 480, itemY, {
    width: 60,
    align: "right",
  });

  itemY += 20;
  doc
    .fillColor("#9D174D")
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("Total Paid Amount:", 320, itemY);
  doc.text(`INR ${rawTotal.toFixed(2)}`, 480, itemY, {
    width: 60,
    align: "right",
  });

  doc.end();

  // FIX: Explicitly tracking void params inside stream resolver hooks
  await new Promise<void>((resolve, reject) => {
    stream.on("finish", () => resolve());
    stream.on("error", reject);
  });

  console.log(
    `[HaveHer Assets] Local invoice PDF built safely in temp storage: ${invoiceFilename}`,
  );

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) return;

    const resend = new Resend(resendApiKey);
    const invoiceUrl = order.metadata?.razorpay_invoice_url || "";
    const customerName = addr.first_name || "there";

    const finalFormattedTotal = rawTotal.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

    const pdfBuffer = fs.readFileSync(outputPath);

    const emailHtmlPayload = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body>
        <p>Hi ${customerName}, your order validation details have arrived.</p>
        <p>Order Reference: ${displayId}</p>
        <p>Total Paid: ${finalFormattedTotal}</p>
      </body>
      </html>
    `;

    // FIX: String matching execution matrix block mapping applied to ensure email is never null
    const finalDestinationEmail = order.email || "support@haveher.com";

    await resend.emails.send({
      from: "HaveHer <onboarding@resend.dev>",
      to: [finalDestinationEmail],
      subject: `Your HaveHer Order Confirmation - ${displayId}`,
      html: emailHtmlPayload,
      attachments: [
        {
          filename: invoiceFilename,
          content: pdfBuffer,
        },
      ],
    });
  } catch (emailError) {
    console.error(
      "[Resend System Error] Failed to complete email execution:",
      emailError,
    );
  } finally {
    try {
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    } catch (cleanupError) {
      console.error("[Cleanup Warning]", cleanupError);
    }
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
