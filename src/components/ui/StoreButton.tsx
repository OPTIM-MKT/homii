import { FaApple, FaGooglePlay } from "react-icons/fa";

type StoreType = "appStore" | "playStore";

interface StoreButtonProps {
  store: StoreType;
  href: string;
  caption: string;
  storeName: string;
  ariaLabel: string;
  className?: string;
}

const icons: Record<StoreType, React.ReactNode> = {
  appStore: <FaApple className="h-7 w-7" aria-hidden />,
  playStore: <FaGooglePlay className="h-6 w-6" aria-hidden />,
};

export default function StoreButton({
  store,
  href,
  caption,
  storeName,
  ariaLabel,
  className = "",
}: StoreButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={
        "group inline-flex items-center gap-3 rounded-2xl bg-mateBlack px-5 py-3 text-white " +
        "shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] transition-all duration-200 " +
        "hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-18px_rgba(0,0,0,0.55)] " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 " +
        "dark:bg-white dark:text-mateBlack " +
        className
      }
    >
      <span className="shrink-0">{icons[store]}</span>
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[10px] uppercase tracking-widest opacity-75">
          {caption}
        </span>
        <span className="text-base font-semibold">{storeName}</span>
      </span>
    </a>
  );
}
