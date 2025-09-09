"use server";

import nodemailer from "nodemailer";
import { emailTemplate } from "@/_lib/email-template";
import DOMPurify from "isomorphic-dompurify";

interface EmailTemplateData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  replyTo: string;
  html: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

export async function sendEmail(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const honey = formData.get("honey");
  const recaptchaToken = formData.get("recaptchaToken")?.toString();

  try {
    if (honey !== null) {
      console.error("Invalid form submission due to non-empty honeypot field");
      return { success: false, error: "Invalid form submission" };
    }

    if (!recaptchaToken) {
      console.error("Missing reCAPTCHA token");
      return { success: false, error: "reCAPTCHA verification failed" };
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      console.error("Invalid reCAPTCHA token");
      return { success: false, error: "reCAPTCHA verification failed" };
    }

    const name = DOMPurify.sanitize(formData.get("name")?.toString() || "");
    const email = DOMPurify.sanitize(formData.get("email")?.toString() || "");
    const phone = DOMPurify.sanitize(formData.get("phone")?.toString() || "");
    const message = DOMPurify.sanitize(
      formData.get("message")?.toString() || ""
    );

    if (!name || !email || !message) {
      return { success: false, error: "Required fields are missing" };
    }

    const emailHtmlContent = emailTemplate({
      name,
      email,
      phone,
      message,
    } as EmailTemplateData);

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
      subject: "Website form submission - Clone Kings",
      replyTo: email,
      html: emailHtmlContent,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
