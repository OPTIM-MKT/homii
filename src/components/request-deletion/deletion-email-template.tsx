import * as React from "react";

// ── Props ─────────────────────────────────────────────────────────────────────

export interface DeletionEmailTemplateProps {
  email: string;
}

// ── Design tokens (mirrors global.css / email-template.tsx) ──────────────────

const BRAND = {
  primary: "#09ad05",
  shade: "#026600",
  red: "#dc2626",
  redLight: "#fef2f2",
  redBorder: "#fecaca",
  mateBlack: "#111315",
  mateWhite: "#f5f6f7",
  surface: "#ffffff",
  surface2: "#f5f6f7",
  border: "#e6e8ec",
  muted: "#5b6470",
} as const;

// ── Shared inline styles ──────────────────────────────────────────────────────

const s = {
  wrapper: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: BRAND.surface2,
    padding: "40px 20px",
    margin: 0,
  } as React.CSSProperties,

  card: {
    maxWidth: 600,
    margin: "0 auto",
    backgroundColor: BRAND.surface,
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(17,19,21,0.08)",
    border: `1px solid ${BRAND.border}`,
  } as React.CSSProperties,

  // Red-tinted header to signal urgency/deletion
  header: {
    background: `linear-gradient(135deg, ${BRAND.red} 0%, #991b1b 100%)`,
    padding: "36px 40px",
  } as React.CSSProperties,

  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.02em",
  } as React.CSSProperties,

  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    margin: "6px 0 0",
    fontWeight: 400,
  } as React.CSSProperties,

  logoBadge: {
    display: "inline-block",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: "4px 12px",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    marginBottom: 16,
  } as React.CSSProperties,

  urgencyBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    backgroundColor: `${BRAND.red}18`,
    color: BRAND.red,
    border: `1px solid ${BRAND.red}30`,
    borderRadius: 20,
    padding: "5px 14px",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    marginBottom: 20,
  } as React.CSSProperties,

  body: {
    padding: "32px 40px",
  } as React.CSSProperties,

  greeting: {
    fontSize: 16,
    color: BRAND.mateBlack,
    marginBottom: 24,
    lineHeight: 1.6,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: BRAND.muted,
    margin: "0 0 12px",
  } as React.CSSProperties,

  emailHighlight: {
    backgroundColor: BRAND.redLight,
    borderRadius: 10,
    padding: "16px 20px",
    border: `1px solid ${BRAND.redBorder}`,
    marginBottom: 24,
  } as React.CSSProperties,

  emailLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: BRAND.red,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 4,
  } as React.CSSProperties,

  emailValue: {
    fontSize: 18,
    color: BRAND.mateBlack,
    fontWeight: 700,
    margin: 0,
    wordBreak: "break-all" as const,
  } as React.CSSProperties,

  noteBox: {
    backgroundColor: `${BRAND.muted}10`,
    border: `1px solid ${BRAND.border}`,
    borderRadius: 10,
    padding: "16px",
    marginBottom: 24,
  } as React.CSSProperties,

  noteText: {
    fontSize: 14,
    color: BRAND.muted,
    lineHeight: 1.7,
    margin: 0,
  } as React.CSSProperties,

  divider: {
    border: "none",
    borderTop: `1px solid ${BRAND.border}`,
    margin: "24px 0",
  } as React.CSSProperties,

  cta: {
    display: "block",
    backgroundColor: BRAND.primary,
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: 999,
    padding: "14px 28px",
    fontWeight: 700,
    fontSize: 14,
    textAlign: "center" as const,
    marginBottom: 24,
  } as React.CSSProperties,

  footer: {
    borderTop: `1px solid ${BRAND.border}`,
    padding: "20px 40px",
    backgroundColor: BRAND.surface2,
    textAlign: "center" as const,
  } as React.CSSProperties,

  footerText: {
    fontSize: 12,
    color: BRAND.muted,
    margin: 0,
    lineHeight: 1.6,
  } as React.CSSProperties,
};

// ── Email Template ────────────────────────────────────────────────────────────

export function DeletionEmailTemplate({ email }: DeletionEmailTemplateProps) {
  const replyLink = `mailto:${email}?subject=${encodeURIComponent("Re: Solicitud de eliminación de datos — Homii")}`;

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        {/* ── Header ── */}
        <div style={s.header}>
          <div style={s.logoBadge}>Homii</div>
          <h1 style={s.headerTitle}>Solicitud de eliminación de datos</h1>
          <p style={s.headerSubtitle}>
            Un usuario ha solicitado la eliminación de su cuenta y datos
            personales.
          </p>
        </div>

        {/* ── Body ── */}
        <div style={s.body}>
          {/* Urgency indicator */}
          <div style={s.urgencyBadge}>⚠ Acción requerida</div>

          {/* Greeting */}
          <p style={s.greeting}>
            Hola equipo 👋, han recibido una <strong>solicitud de eliminación
            de cuenta y datos personales</strong>. El usuario asociado al
            siguiente correo ha pedido que se elimine su información de la
            plataforma Homii.
          </p>

          {/* Email highlight */}
          <p style={s.sectionTitle}>Correo del usuario solicitante</p>
          <div style={s.emailHighlight}>
            <span style={s.emailLabel}>Correo electrónico</span>
            <p style={s.emailValue}>{email}</p>
          </div>

          <hr style={s.divider} />

          {/* Note */}
          <div style={s.noteBox}>
            <p style={s.noteText}>
              <strong>Nota:</strong> De acuerdo con las políticas de privacidad
              de Homii y la legislación aplicable (LFPDPPP / GDPR), esta
              solicitud debe procesarse en un plazo máximo de{" "}
              <strong>30 días hábiles</strong>. Confirma la recepción al usuario
              y procede con el proceso interno de eliminación.
            </p>
          </div>

          {/* CTA reply button */}
          <a href={replyLink} style={s.cta}>
            Confirmar recepción a {email} →
          </a>
        </div>

        {/* ── Footer ── */}
        <div style={s.footer}>
          <p style={s.footerText}>
            Este correo fue generado automáticamente por el formulario de
            eliminación de datos de <strong>homii.net</strong>. Por favor no
            respondas directamente a este mensaje.
          </p>
          <p style={{ ...s.footerText, marginTop: 8 }}>
            © {new Date().getFullYear()} Homii · Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  );
}
