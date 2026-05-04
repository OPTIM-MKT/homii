import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';
import { contactSchema, getLabelByValue, INTEREST_REASONS, ROLES, CONTACT_METHODS, COMMUNITY_SIZES } from "@/components/contact/contact.schema";
import { EmailTemplate } from "@/components/contact/email-template";
import { deletionSchema } from "@/components/request-deletion/deletion.schema";
import { DeletionEmailTemplate } from "@/components/request-deletion/deletion-email-template";
import { renderToString } from 'react-dom/server';
import React from 'react';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  // ── Contact form ────────────────────────────────────────────────────────────
  send: defineAction({
    accept: 'json',
    input: contactSchema,
    handler: async (data) => {
      // ── 1. Build human-readable labels ───────────────────────────────────────
      const interestLabel = getLabelByValue(INTEREST_REASONS as unknown as { value: string; label: string }[], data.interestReason);
      const roleLabel = getLabelByValue(ROLES as unknown as { value: string; label: string }[], data.role);
      const sizeLabel = getLabelByValue(COMMUNITY_SIZES as unknown as { value: string; label: string }[], data.communitySize);
      const contactLabel = data.preferredContact
        ? getLabelByValue(CONTACT_METHODS as unknown as { value: string; label: string }[], data.preferredContact)
        : undefined;

      // ── 2. Render React component to HTML string ─────────────────────────────
      // We render it to HTML manually to avoid Resend requiring @react-email/render
      const htmlOutput = renderToString(
        React.createElement(EmailTemplate, {
          ...data,
          interestReasonLabel: interestLabel,
          roleLabel,
          communitySizeLabel: sizeLabel,
          preferredContactLabel: contactLabel,
        })
      );

      // ── 3. Send email via Resend ─────────────────────────────────────────────
      const { data: resendData, error } = await resend.emails.send({
        from: "Homii Contacto <onboarding@resend.dev>",
        to: ["socialmedia@optimmkt.com"],
        replyTo: data.email,
        subject: `Nuevo contacto: ${data.name} — ${interestLabel}`,
        html: htmlOutput, // Usamos la propiedad html enviando el string en vez de react
      });

      if (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      }

      return { success: true, id: resendData?.id };
    },
  }),

  // ── Account / data deletion request ────────────────────────────────────────
  sendDeletion: defineAction({
    accept: 'json',
    input: deletionSchema,
    handler: async (data) => {
      // ── 1. Render email template to HTML string ──────────────────────────────
      const htmlOutput = renderToString(
        React.createElement(DeletionEmailTemplate, { email: data.email })
      );

      // ── 2. Send email via Resend ─────────────────────────────────────────────
      const { data: resendData, error } = await resend.emails.send({
        from: "Homii Privacidad <onboarding@resend.dev>",
        to: ["socialmedia@optimmkt.com"],
        replyTo: data.email,
        subject: `⚠ Solicitud de eliminación de datos: ${data.email}`,
        html: htmlOutput,
      });

      if (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      }

      return { success: true, id: resendData?.id };
    },
  }),
};