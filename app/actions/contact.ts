"use server";

import { Resend } from "resend";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

interface ContactResult {
  success: boolean;
  error?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(
  data: ContactFormData
): Promise<ContactResult> {
  try {
    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return { success: false, error: "Email service not configured" };
    }

    if (!process.env.CONTACT_EMAIL_TO) {
      console.error("CONTACT_EMAIL_TO is not set");
      return { success: false, error: "Email recipient not configured" };
    }

    if (!process.env.HUBSPOT_PORTAL_ID || !process.env.HUBSPOT_FORM_ID) {
      console.error("HubSpot configuration missing");
      return { success: false, error: "CRM service not configured" };
    }

    // Step 1: Send email via Resend
    const emailResult = await resend.emails.send({
      from: `Contact Form <onboarding@resend.dev>`,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
        ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
      `,
      replyTo: data.email,
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
      return { success: false, error: "Failed to send email" };
    }

    // Step 2: Submit to HubSpot Forms API
    const hubspotResult = await submitToHubSpot(data);
    if (!hubspotResult.success) {
      console.warn("HubSpot submission failed:", hubspotResult.error);
      // Don't fail the whole operation if HubSpot fails, but log it
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

async function submitToHubSpot(
  data: ContactFormData
): Promise<ContactResult> {
  try {
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: [
            { name: "firstname", value: data.name.split(" ")[0] },
            { name: "lastname", value: data.name.split(" ").slice(1).join(" ") },
            { name: "email", value: data.email },
            ...(data.phone ? [{ name: "phone", value: data.phone }] : []),
            ...(data.company ? [{ name: "company", value: data.company }] : []),
            { name: "message", value: data.message },
          ],
          context: {
            pageUri: process.env.SITE_URL || "https://example.com/contact",
            pageName: "Contact",
          },
        }),
      }
    );

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status}`);
      return { success: false, error: "HubSpot submission failed" };
    }

    return { success: true };
  } catch (error) {
    console.error("HubSpot submission error:", error);
    return { success: false, error: "HubSpot submission error" };
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
