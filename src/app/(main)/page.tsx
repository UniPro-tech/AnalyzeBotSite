import { headers } from "next/headers";
import Link from "next/link";
import Script from "next/script";
import type { Product, WebSite, WithContext } from "schema-dts";
import { getLastModifiedDate } from "@/lib/git";
import HeroSlideshow from "../../components/HeroSlideshow";
import { HomeStyles } from "../../constants/styles";
import { BASE_URL } from "../sitemap";

type Post = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
};

const formatPublishedAt = (publishedAt: string) => {
  if (!publishedAt) return "公開日未定";

  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return "公開日未定";

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const jsonLd: WithContext<Product> = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "活動分析くん",
  image: `${BASE_URL}/img/sample/daily_cloud_01.png`,
  description: "Discordサーバーの活動を解析するDiscordBotです。",
  audience: {
    "@type": "Audience",
    audienceType: "Discordサーバー管理者",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
    availability: "https://schema.org/InStock",
  },
};

const jsonLdWebsite: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "活動分析くん公式サイト",
  url: BASE_URL,
  publisher: {
    "@type": "Organization",
    name: "デジタル創作サークルUniProject",
    url: "https://uniproject.jp",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Discordサーバー管理者",
  },
  datePublished: "2025-03-11",
  dateModified: getLastModifiedDate("src/app/page.tsx").toISOString(),
};

export default async function Home() {
  const headerStore = await headers();
  const protocol = headerStore.get("x-forwarded-proto") || "http";
  const host = headerStore.get("host");
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/posts`);
  const posts: Post[] = await res.json();
  const latestPosts = posts.slice(0, 5);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HeroSlideshow />
      <section id="news" className={HomeStyles.news.section}>
        <h3 className={HomeStyles.news.heading}>ニュース</h3>
        <ul className={HomeStyles.news.list}>
          {latestPosts.map((post) => (
            <li key={post.id} className={HomeStyles.news.item}>
              <Link
                href={`/posts/${post.id}`}
                className={HomeStyles.news.title}
              >
                {post.title}
              </Link>
              <p className={HomeStyles.news.meta}>
                公開日: {formatPublishedAt(post.publishedAt)}
              </p>
              {post.description && (
                <p className={HomeStyles.news.description}>
                  {post.description}
                </p>
              )}
              <div className={HomeStyles.news.actionRow}>
                <Link
                  href={`/posts/${post.id}`}
                  className={HomeStyles.news.detailButton}
                >
                  詳しく見る
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LDを埋め込むために必要
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LDを埋め込むために必要
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebsite).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
