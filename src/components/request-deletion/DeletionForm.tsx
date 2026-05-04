"use client";
import { actions } from "astro:actions";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { FiMail, FiSend, FiLoader, FiAlertTriangle } from "react-icons/fi";

import { deletionSchema, type DeletionFormData } from "./deletion.schema";

// ── Props ─────────────────────────────────────────────────────────────────────

interface DeletionFormProps {
  locale?: "es" | "en";
}

// ── Base styles (mirror ContactForm) ─────────────────────────────────────────

const inputBase =
  "w-full rounded-xl px-4 py-3 text-sm font-medium " +
  "bg-[var(--bg-2)] border border-[var(--border)] text-[var(--fg)] " +
  "placeholder:text-[var(--muted)] " +
  "transition-all duration-200 " +
  "outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const inputError = "border-red-400 focus:border-red-400 focus:ring-red-400/20";

// ── DeletionForm ──────────────────────────────────────────────────────────────

export default function DeletionForm({ locale = "es" }: DeletionFormProps) {
  const isEs = locale === "es";

  const copy = {
    warning: isEs
      ? {
          text: "Esta acción es",
          strong: "irreversible",
          rest: ". Al enviar esta solicitud, tu cuenta y todos los datos asociados serán eliminados de forma permanente de la plataforma Homii.",
        }
      : {
          text: "This action is",
          strong: "irreversible",
          rest: ". By submitting this request, your account and all associated data will be permanently deleted from the Homii platform.",
        },
    label: isEs ? "Correo electrónico de la cuenta" : "Account email address",
    placeholder: isEs ? "tu@correo.com" : "your@email.com",
    submitLabel: isEs
      ? "Enviar solicitud de eliminación"
      : "Submit deletion request",
    submittingLabel: isEs ? "Enviando solicitud..." : "Submitting request...",
    disclaimer: isEs
      ? {
          prefix: "Procesaremos tu solicitud en un plazo máximo de 30 días hábiles, conforme a nuestra ",
          link: "política de privacidad",
          href: "/privacy",
        }
      : {
          prefix: "We will process your request within a maximum of 30 business days, in accordance with our ",
          link: "privacy policy",
          href: "/en/privacy",
        },
    toastTitle: isEs ? "Solicitud recibida" : "Request received",
    toastDesc: isEs
      ? "Nuestro equipo está trabajando en ello. Recibirás una confirmación pronto."
      : "Our team is working on it. You will receive a confirmation soon.",
    errorTitle: isEs
      ? "No se pudo enviar la solicitud"
      : "Could not send the request",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<DeletionFormData>({
    resolver: zodResolver(deletionSchema),
  });

  const onSubmit: SubmitHandler<DeletionFormData> = async (data) => {
    try {
      const { error } = await actions.sendDeletion(data);

      if (error) {
        throw new Error(error.message || "Error al enviar la solicitud.");
      }

      toast.success(copy.toastTitle, {
        description: copy.toastDesc,
        duration: 8000,
        icon: "✅",
      });
      reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al enviar la solicitud.";
      toast.error(copy.errorTitle, {
        description: message,
        duration: 6000,
      });
    }
  };

  return (
    <>
      {/* Sonner Toast */}
      <Toaster
        position="bottom-center"
        theme="system"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: "inherit",
            borderRadius: "12px",
          },
        }}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Formulario de solicitud de eliminación de datos"
        className="w-full space-y-5"
      >
        {/* ── Warning notice ── */}
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
          <FiAlertTriangle
            size={18}
            className="mt-0.5 shrink-0 text-red-500"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-red-700 dark:text-red-400">
            {copy.warning.text} <strong>{copy.warning.strong}</strong>{copy.warning.rest}
          </p>
        </div>

        {/* ── Email field ── */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="rd-email"
            className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)] flex items-center gap-1.5"
          >
            <FiMail size={12} className="text-red-500 shrink-0" aria-hidden="true" />
            {copy.label}
            <span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            id="rd-email"
            type="email"
            autoComplete="email"
            placeholder={copy.placeholder}
            className={`${inputBase} ${errors.email ? inputError : ""}`}
            aria-describedby={errors.email ? "rd-email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="rd-email-error"
              className="text-red-500 dark:text-red-400 text-xs font-medium mt-0.5 flex items-center gap-1"
            >
              <span className="inline-block w-1 h-1 rounded-full bg-red-500 shrink-0" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            "w-full inline-flex items-center justify-center gap-2 " +
            "rounded-full h-13 px-7 text-sm font-semibold text-white " +
            "bg-red-600 hover:bg-red-700 " +
            "shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)] " +
            "transition-all duration-200 active:scale-[0.98] " +
            "disabled:opacity-60 disabled:pointer-events-none " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
          }
        >
          {isSubmitting ? (
            <>
              <FiLoader size={16} className="animate-spin shrink-0" aria-hidden="true" />
              {copy.submittingLabel}
            </>
          ) : (
            <>
              <FiSend size={16} className="shrink-0" aria-hidden="true" />
              {copy.submitLabel}
            </>
          )}
        </button>

        {/* Disclaimer */}
        <p className="text-center text-xs text-[var(--muted)] leading-relaxed">
          {copy.disclaimer.prefix}
          <a
            href={copy.disclaimer.href}
            className="underline underline-offset-2 hover:text-[var(--fg)] transition-colors"
          >
            {copy.disclaimer.link}
          </a>
          .
        </p>
      </form>
    </>
  );
}
