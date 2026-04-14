import { motion } from "framer-motion";
import { useReactI18n } from "@/i18n/useReacti18n";
import Button from "@/components/ui/Button";

interface WorkInProgressProps {
  lang?: string;
}

function GearIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary-600 dark:text-primary-400"
    >
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

export default function WorkInProgress({ lang }: WorkInProgressProps) {
  const { t, locale } = useReactI18n(lang);
  const prefix = locale === "es" ? "" : `/${locale}`;

  return (
    <div className="min-h-screen flex items-center justify-center pt-10 pb-20 sm:pt-12">
      <div className="mx-auto max-w-lg px-6 text-center">
        {/* Animated gear icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-primary-100 dark:bg-primary-900/30 mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <GearIcon />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.wip.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t.wip.subtitle}
        </motion.p>

        {/* Progress bar decoration */}
        <motion.div
          className="mt-8 mx-auto max-w-xs h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400"
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{
              duration: 1.5,
              delay: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        </motion.div>

        {/* Back button */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button variant="secondary" href={`${prefix}/`}>
            {t.wip.backHome}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
