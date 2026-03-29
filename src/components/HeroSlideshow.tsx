"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroStyles } from "@/constants/styles";

type Slide = {
  path: string;
  label: string;
};

const slides: Slide[] = [
  {
    path: "sample/daily_cloud_01.png",
    label: "デイリーワードクラウドの例01",
  },
  {
    path: "sample/manual_network_01.png",
    label: "手動実行での会話ネットワークの例01",
  },
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const controlButtonClassName = `flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--hero-headline) transition-transform duration-200 hover:scale-105 cursor-pointer`;

  return (
    <section id="hero" className={HeroStyles.wrapper}>
      <div className={HeroStyles.layouts.imageSide}>
        <div className="w-full lg:w-[44%]">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <h2 className={`${HeroStyles.headline} mb-4`}>活動分析くん</h2>
            <p className={`${HeroStyles.paragraph} mb-8`}>
              Discordサーバーの活動を解析するDiscordBotです。
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/invite" className={`${HeroStyles.button}`}>
                導入する
              </Link>
              <Link href="/howto" className={HeroStyles.button}>
                使い方を見る
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[56%]">
          <div className="relative mx-auto max-w-3xl">
            <div className="rounded-[28px] border border-black/10 bg-white p-3">
              <div className="relative aspect-video overflow-hidden rounded-[20px] bg-white">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-linear-to-t from-black/12 to-transparent" />
                {slides.map((s, i) => (
                  <div
                    key={s.path}
                    className={`absolute inset-0 transition-opacity duration-1800 ease-in-out ${
                      i === index
                        ? "z-10 opacity-100"
                        : "pointer-events-none z-0 opacity-0"
                    }`}
                  >
                    <Image
                      src={`/imgs/${s.path}`}
                      alt={s.label}
                      fill
                      sizes="(min-width: 1024px) 32rem, 100vw"
                      priority={i === 0}
                      style={{ objectFit: "cover" }}
                      className="w-full h-full"
                    />
                  </div>
                ))}
                <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between px-4 pb-4">
                  <div className="flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 backdrop-blur-sm">
                    {slides.map((slideItem, i) => (
                      <button
                        type="button"
                        key={slideItem.path}
                        onClick={() => setIndex(i)}
                        aria-label={`スライド${i + 1}へ移動`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          i === index
                            ? "w-7 bg-white"
                            : "w-2.5 bg-white/45 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-black/45 p-1.5 backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="前のスライド"
                      className={controlButtonClassName}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="次のスライド"
                      className={controlButtonClassName}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
