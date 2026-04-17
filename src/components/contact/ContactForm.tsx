"use client";
import { actions } from "astro:actions";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMessageCircle,
  FiMapPin,
  FiUsers,
  FiSend,
  FiLoader,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import {
  contactSchema,
  type ContactFormData,
  INTEREST_REASONS,
  ROLES,
  CONTACT_METHODS,
  COMMUNITY_SIZES,
} from "./contact.schema";
import type {
  FieldWrapperProps,
  InputFieldProps,
  SelectFieldProps,
  TextareaFieldProps,
} from "./formTypes";

function FieldWrapper({
  label,
  fieldId,
  required,
  error,
  icon: Icon,
  children,
}: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)] flex items-center gap-1.5"
      >
        {Icon && <Icon size={12} className="text-primary shrink-0" />}
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-0.5 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-500 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

//  Base input class

const inputBase =
  "w-full rounded-xl px-4 py-3 text-sm font-medium " +
  "bg-[var(--bg-2)] border border-[var(--border)] text-[var(--fg)] " +
  "placeholder:text-[var(--muted)] " +
  "transition-all duration-200 " +
  "outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const inputError = "border-red-400 focus:border-red-400 focus:ring-red-400/20";

//  Input field

function InputField({
  label,
  fieldId,
  required,
  icon,
  error,
  className,
  ...rest
}: InputFieldProps) {
  return (
    <FieldWrapper
      label={label}
      fieldId={fieldId}
      required={required}
      icon={icon}
      error={error}
    >
      <input
        id={fieldId}
        className={`${inputBase} ${error ? inputError : ""} ${className ?? ""}`}
        {...rest}
      />
    </FieldWrapper>
  );
}

//  Select field

function SelectField({
  label,
  fieldId,
  required,
  icon,
  error,
  placeholder,
  options,
  className,
  ...rest
}: SelectFieldProps) {
  return (
    <FieldWrapper
      label={label}
      fieldId={fieldId}
      required={required}
      icon={icon}
      error={error}
    >
      <select
        id={fieldId}
        className={`${inputBase} cursor-pointer appearance-none ${error ? inputError : ""} ${className ?? ""}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%235b6470'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          backgroundSize: "16px",
          paddingRight: "40px",
        }}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

//  Textarea field

function TextareaField({
  label,
  fieldId,
  required,
  icon,
  error,
  className,
  ...rest
}: TextareaFieldProps) {
  return (
    <FieldWrapper
      label={label}
      fieldId={fieldId}
      required={required}
      icon={icon}
      error={error}
    >
      <textarea
        id={fieldId}
        rows={3}
        className={`${inputBase} resize-none ${error ? inputError : ""} ${className ?? ""}`}
        {...rest}
      />
    </FieldWrapper>
  );
}

//  Main ContactForm

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      const { data: responseData, error } = await actions.send(data);

      if (error) {
        throw new Error(error.message || "Error al enviar el formulario.");
      }

      toast.success("¡Mensaje enviado con éxito! 🎉", {
        description: "Nos pondremos en contacto contigo pronto.",
        duration: 6000,
      });
      reset();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al enviar el formulario.";
      toast.error("No se pudo enviar el mensaje", {
        description: message,
        duration: 6000,
      });
    }
  };

  return (
    <>
      {/*  Sonner Toast */}
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
        aria-label="Formulario de contacto"
        className="w-full space-y-5"
      >
        {/* ── Title ── */}
        <div className="text-center pb-2">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--fg)]">
            Formulario
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Completa los campos y nos pondremos en contacto contigo.
          </p>
        </div>

        {/* ── Row 1: Nombre · Correo · Teléfono ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Nombre completo"
            fieldId="cf-name"
            required
            icon={FiUser}
            placeholder="Juan García"
            autoComplete="name"
            error={errors.name?.message}
            {...register("name")}
          />
          <InputField
            label="Correo electrónico"
            fieldId="cf-email"
            required
            icon={FiMail}
            type="email"
            placeholder="juan@ejemplo.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <InputField
            label="Teléfono"
            fieldId="cf-phone"
            required
            icon={FiPhone}
            type="tel"
            placeholder="+52 55 1234 5678"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        {/* ── Row 2: Razón de interés · Colonia · Rol ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectField
            label="Razón de interés"
            fieldId="cf-interest"
            required
            icon={FiMessageCircle}
            placeholder="Selecciona una razón..."
            options={INTEREST_REASONS}
            error={errors.interestReason?.message}
            defaultValue=""
            {...register("interestReason")}
          />
          <InputField
            label="Colonia / Residencia"
            fieldId="cf-community"
            required
            icon={FiMapPin}
            placeholder="Ej. Residencial Las Palmas"
            error={errors.community?.message}
            {...register("community")}
          />
          <SelectField
            label="Rol en la colonia"
            fieldId="cf-role"
            required
            icon={FiUsers}
            placeholder="Selecciona tu rol..."
            options={ROLES}
            error={errors.role?.message}
            defaultValue=""
            {...register("role")}
          />
        </div>

        {/* ── Row 3: Tamaño · Método de contacto ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Tamaño de colonia / residencia"
            fieldId="cf-size"
            required
            icon={FiUsers}
            placeholder="Selecciona el tamaño..."
            options={COMMUNITY_SIZES}
            error={errors.communitySize?.message}
            defaultValue=""
            {...register("communitySize")}
          />
          <SelectField
            label="Método de contacto preferido"
            fieldId="cf-contact"
            icon={FiPhone}
            placeholder="Sin preferencia (opcional)"
            options={CONTACT_METHODS}
            error={errors.preferredContact?.message}
            defaultValue=""
            {...register("preferredContact")}
          />
        </div>

        {/* ── Row 4: Mensaje opcional ── */}
        <TextareaField
          label="Mensaje adicional"
          fieldId="cf-message"
          icon={FiMessageCircle}
          placeholder="Cuéntanos más sobre tu caso... (opcional)"
          error={errors.message?.message}
          {...register("message")}
        />

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            "w-full inline-flex items-center justify-center gap-2 " +
            "rounded-full h-13 px-7 text-sm font-semibold text-white " +
            "bg-primary hover:bg-shadePrimary " +
            "shadow-[0_10px_30px_-10px_rgba(9,173,5,0.55)] " +
            "transition-all duration-200 active:scale-[0.98] " +
            "disabled:opacity-60 disabled:pointer-events-none " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          }
        >
          {isSubmitting ? (
            <>
              <FiLoader size={16} className="animate-spin shrink-0" />
              Enviando...
            </>
          ) : (
            <>
              <FiSend size={16} className="shrink-0" />
              Enviar mensaje
            </>
          )}
        </button>

        {/* Disclaimer */}
        <p className="text-center text-xs text-[var(--muted)] leading-relaxed">
          Al enviar este formulario aceptas que nos pongamos en contacto contigo
          para responder tu solicitud. No compartiremos tu información con
          terceros.
        </p>
      </form>
    </>
  );
}
