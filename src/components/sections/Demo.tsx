import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useReactI18n } from "@/i18n/useReacti18n";
import cel from "@/assets/cel.png";

interface DemoProps {
  lang?: string;
}

export default function Demo({ lang }: DemoProps) {
  const { t } = useReactI18n(lang);

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

        <div className="mt-16">
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
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="homii-swiper !pb-14"
          >
            {t.demo.slides.map((slide, i) => (
              <SwiperSlide
                key={i}
                className="!w-[280px] sm:!w-[320px]"
              >
                <div className="group relative flex flex-col items-center">
                  <div className="absolute inset-0 -z-10 mx-auto h-[540px] w-[280px] rounded-[44px] bg-gradient-to-b from-primary/20 to-bluePrimary/10 blur-2xl" />
                  <img
                    src={cel.src}
                    alt={slide.title}
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
        .homii-swiper .swiper-pagination-bullet {
          background: var(--color-primary);
          opacity: 0.3;
        }
        .homii-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}
