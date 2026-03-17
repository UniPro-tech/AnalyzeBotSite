import { headers } from "next/headers";
import HeroSlideshow from "../components/HeroSlideshow";
import { HomeStyles } from "../constants/styles";
import Link from "next/link";

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
    </main>
  );
}
