"use server";

import nodemailer from "nodemailer";
import { orderEmailTemplate } from "@/_lib/order-email-template";
import DOMPurify from "isomorphic-dompurify";
import { CartItem } from "@/_types/cart-types";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  replyTo: string;
  html: string;
}

export async function sendOrderEmailStaff(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const firstName = DOMPurify.sanitize(formData.get("given-name") as string);
    const lastName = DOMPurify.sanitize(formData.get("family-name") as string);
    const email = DOMPurify.sanitize(formData.get("email") as string);
    const phone = DOMPurify.sanitize(formData.get("tel") as string);
    const addressLine1 = DOMPurify.sanitize(
      formData.get("address-line1") as string
    );
    const addressLine2 = formData.get("address-line2")
      ? DOMPurify.sanitize(formData.get("address-line2") as string)
      : "";
    const city = DOMPurify.sanitize(formData.get("address-level2") as string);
    const province = DOMPurify.sanitize(
      formData.get("address-level1") as string
    );
    const postalCode = DOMPurify.sanitize(
      formData.get("postal-code") as string
    );
    const notes = formData.get("notes")
      ? DOMPurify.sanitize(formData.get("notes") as string)
      : "";

    const name = `${firstName} ${lastName}`;

    const rawCartData = formData.get("cartData");
    const rawTotalPrice = formData.get("totalPrice");
    const rawOrderNumber = formData.get("orderNumber");

    if (!rawCartData || !rawTotalPrice || !rawOrderNumber) {
      return { success: false, error: "Missing required data" };
    }

    const cartItems = JSON.parse(rawCartData as string) as CartItem[];
    const totalPrice = parseFloat(rawTotalPrice as string);
    const orderNumber = rawOrderNumber as string;

    const sanitizedItems = cartItems.map((item) => ({
      ...item,
      name: DOMPurify.sanitize(item.name),
      id: DOMPurify.sanitize(item.id),
    }));

    const emailHtmlContent = orderEmailTemplate({
      name,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      notes,
      items: sanitizedItems,
      totalPrice,
      orderNumber,
      recipientType: "staff",
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
      subject: `New Order - ${orderNumber} (Clone Kings)`,
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

export async function sendOrderEmailCustomer(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const firstName = DOMPurify.sanitize(formData.get("given-name") as string);
    const lastName = DOMPurify.sanitize(formData.get("family-name") as string);
    const email = DOMPurify.sanitize(formData.get("email") as string);
    const phone = DOMPurify.sanitize(formData.get("tel") as string);
    const addressLine1 = DOMPurify.sanitize(
      formData.get("address-line1") as string
    );
    const addressLine2 = formData.get("address-line2")
      ? DOMPurify.sanitize(formData.get("address-line2") as string)
      : "";
    const city = DOMPurify.sanitize(formData.get("address-level2") as string);
    const province = DOMPurify.sanitize(
      formData.get("address-level1") as string
    );
    const postalCode = DOMPurify.sanitize(
      formData.get("postal-code") as string
    );
    const notes = formData.get("notes")
      ? DOMPurify.sanitize(formData.get("notes") as string)
      : "";

    const name = `${firstName} ${lastName}`;

    const rawCartData = formData.get("cartData");
    const rawTotalPrice = formData.get("totalPrice");
    const rawOrderNumber = formData.get("orderNumber");

    if (!rawCartData || !rawTotalPrice || !rawOrderNumber) {
      return { success: false, error: "Missing required data" };
    }

    const cartItems = JSON.parse(rawCartData as string) as CartItem[];
    const totalPrice = parseFloat(rawTotalPrice as string);
    const orderNumber = rawOrderNumber as string;

    const sanitizedItems = cartItems.map((item) => ({
      ...item,
      name: DOMPurify.sanitize(item.name),
      id: DOMPurify.sanitize(item.id),
    }));

    const emailHtmlContent = orderEmailTemplate({
      name,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      notes,
      items: sanitizedItems,
      totalPrice,
      orderNumber,
      recipientType: "customer",
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
      to: email,
      subject: `Clone Kings order confirmation - ${orderNumber}`,
      replyTo: process.env.SMTP_SEND_TO as string,
      html: emailHtmlContent,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error sending customer order email:", error);
    return { success: false, error: "Failed to send customer order email" };
  }
}
