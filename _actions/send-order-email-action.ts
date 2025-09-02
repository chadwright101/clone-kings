"use server";

import nodemailer from "nodemailer";
import { orderEmailTemplate } from "@/_lib/order-email-template";
import DOMPurify from "isomorphic-dompurify";
import { CartItem } from "@/_types/cart-types";

interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  items: CartItem[];
  totalPrice: number;
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  replyTo: string;
  html: string;
}

export async function sendOrderEmail(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const rawData = formData.get("orderData");
    if (!rawData || typeof rawData !== "string") {
      return { success: false, error: "Invalid order data" };
    }

    const orderData: OrderFormData = JSON.parse(rawData);

    const name = DOMPurify.sanitize(orderData.name);
    const email = DOMPurify.sanitize(orderData.email);
    const phone = DOMPurify.sanitize(orderData.phone);
    const notes = orderData.notes ? DOMPurify.sanitize(orderData.notes) : "";

    const sanitizedItems = orderData.items.map((item) => ({
      ...item,
      name: DOMPurify.sanitize(item.name),
      id: DOMPurify.sanitize(item.id),
    }));

    const emailHtmlContent = orderEmailTemplate({
      name,
      email,
      phone,
      notes,
      items: sanitizedItems,
      totalPrice: orderData.totalPrice,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as string,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
      },
      requireTLS: true,
    });

    const mailOptions: MailOptions = {
      from: process.env.SMTP_USER as string,
      to: process.env.SMTP_SEND_TO as string,
      subject: `New Order - Clone Kings - ${name}`,
      replyTo: email,
      html: emailHtmlContent,
    };

    await transporter.sendMail(mailOptions);
    
    return { success: true };
  } catch (error) {
    console.error("Error sending order email:", error);
    return { success: false, error: "Failed to send order email" };
  }
}