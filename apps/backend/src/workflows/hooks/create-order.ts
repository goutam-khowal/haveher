import { createOrderWorkflow } from "@medusajs/medusa/core-flows";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

// Fixed: Destructured 'context' to fetch container safely and casted 'order' as any to satisfy compiler
export default createOrderWorkflow.hooks.orderCreated(
  async ({ order }: { order: any }, context: any) => {
    const container = context.container;
    const orderService = container.resolve("orderModuleService");

    // Initialize the Razorpay client using system environment keys
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_ID || "",
      key_secret: process.env.RAZORPAY_SECRET || "",
    });

    // Generate a beautiful, boutique public order string: HH-2026-XXXX
    const timestamp = Date.now().toString().slice(-4);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    const cleanDisplayId = `HH-${new Date().getFullYear()}-${timestamp}${randomSuffix}`;

    let invoiceUrl = "";

    // --- RAZORPAY INVOICE GENERATION PIPELINE ---
    try {
      const invoiceLineItems = (order.items || []).map((item: any) => ({
        name: item.title,
        description: item.variant?.title || "Standard Saree Size",
        amount: Math.round(item.unit_price),
        currency: "INR",
        quantity: item.quantity,
      }));

      // Fixed: Casted the incoming API response body payload explicitly as 'any' to wipe out property mismatch crashes
      const razorpayInvoice = (await razorpay.invoices.create({
        type: "invoice",
        description: "Thank you for shopping at HaveHer!",
        customer: {
          name: `${order.shipping_address?.first_name || "Guest"} ${order.shipping_address?.last_name || ""}`.trim(),
          email: order.email,
          contact: order.shipping_address?.phone || undefined,
          billing_address: {
            line1: order.shipping_address?.address_1 || "",
            line2: order.shipping_address?.address_2 || "",
            zipcode: order.shipping_address?.postal_code || "",
            city: order.shipping_address?.city || "",
            state: order.shipping_address?.province || "",
            country: "in",
          },
        },
        line_items: invoiceLineItems,
        sms_notify: 1,
        email_notify: 0,
        expire_by: Math.floor(Date.now() / 1000) + 31536000,
      } as any)) as any;

      invoiceUrl = razorpayInvoice.short_url;

      await orderService.updateOrders([
        {
          id: order.id,
          metadata: {
            custom_invoice_id: cleanDisplayId,
            razorpay_invoice_url: invoiceUrl,
            razorpay_invoice_id: razorpayInvoice.id,
          },
        },
      ]);

      console.log(
        `[HaveHer Billing] Successfully attached Invoice ID ${cleanDisplayId} to Order ${order.id}`,
      );
    } catch (error) {
      console.error("[Razorpay Error] Handled gracefully:", error);
      try {
        await orderService.updateOrders([
          {
            id: order.id,
            metadata: { custom_invoice_id: cleanDisplayId },
          },
        ]);
      } catch (updateError) {
        console.error("[Fallback Update Error] Skipping:", updateError);
      }
    }
  },
);
