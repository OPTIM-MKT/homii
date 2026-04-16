import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { useEffect } from "react";
import { useReactI18n } from "@/i18n/useReacti18n";
import cel from "@/assets/cel.png";


interface DemoProps {
  lang?: string;
}

export default function Demo({ lang }: DemoProps) {
  const { t } = useReactI18n(lang);

  // Load Swiper CSS dynamically to avoid render-blocking
  useEffect(() => {
    import("swiper/css");
    import("swiper/css/effect-coverflow");
    import("swiper/css/pagination");
    import("swiper/css/navigation");
  }, []);


  return (
    <section id="demo" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-bluePrimary/10 via-primary/10 to-transparent blur-3xl" />
      </div>

      <div className="container-x">
        <div className="flex flex-col items-center gap-4 text-center max-w-3xl mx-auto">
          <span className="eyebrow">{t.demo.eyebrow}</span>
          <h2 className="heading-lg">{t.demo.title}</h2>
          <p className="text-lg text-muted leading-relaxed">{t.demo.subtitle}</p>
        </div>

        <div className="relative mt-16">
          {/* Prev arrow */}
          <button
            type="button"
            className="homii-swiper-prev swiper-nav-btn"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            type="button"
            className="homii-swiper-next swiper-nav-btn"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            autoplay={{ delay: 3800, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 180,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: ".homii-swiper-prev",
              nextEl: ".homii-swiper-next",
            }}
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            className="homii-swiper !pb-14"
          >
            {t.demo.slides.map((slide, i) => (
              <SwiperSlide
                key={i}
              className="!w-[300px]"
              >
                <div className="group relative flex flex-col items-center">
                  <div className="absolute inset-0 -z-10 mx-auto h-[540px] w-[280px] rounded-[44px] bg-gradient-to-b from-primary/20 to-bluePrimary/10 blur-2xl" />
                  <img
                    src={cel.src}
                    alt={slide.title}
                    width={280}
                    height={540}
                    loading="lazy"
                    decoding="async"
                    className="h-[540px] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
                  />
                  <div className="mt-5 text-center">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {slide.title}
                    </h3>
                    <p className="mt-1 max-w-[260px] text-sm text-muted">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        /* ── Pagination dots ── */
        .homii-swiper .swiper-pagination-bullet {
          background: var(--color-primary);
          opacity: 0.3;
          transition: opacity 0.25s, width 0.25s;
        }
        .homii-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 9999px;
        }

        /* ── Nav arrows ── */
        .swiper-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-60%);
          z-index: 10;
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-shadePrimary));
          color: #fff;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px -4px rgba(9, 173, 5, 0.55);
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }
        @media (min-width: 640px) {
          .swiper-nav-btn { display: flex; }
        }
        .swiper-nav-btn:hover {
          transform: translateY(-60%) scale(1.1);
          box-shadow: 0 6px 28px -4px rgba(9, 173, 5, 0.7);
        }
        .swiper-nav-btn:active {
          transform: translateY(-60%) scale(0.95);
        }
        .homii-swiper-prev { left: 0; }
        .homii-swiper-next { right: 0; }

        /* Disable state when no more slides (loop=false only) */
        .swiper-nav-btn.swiper-button-disabled {
          opacity: 0.35;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
