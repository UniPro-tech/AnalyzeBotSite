import Link from "next/link";
import { headers } from "next/headers";
import { HomeStyles } from "../../constants/styles";

type Post = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
};

type PostsPageProps = {
  searchParams?: {
    page?: string;
  };
};

const PAGE_SIZE = 10;

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

const parsePage = (rawPage?: string) => {
  const page = Number(rawPage);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.floor(page);
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const headerStore = await headers();
  const protocol = headerStore.get("x-forwarded-proto") || "http";
  const host = headerStore.get("host");
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/posts`);
  const posts: Post[] = await res.json();

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const currentPage = Math.min(parsePage(searchParams?.page), totalPages);

  const start = (currentPage - 1) * PAGE_SIZE;
  const currentPosts = posts.slice(start, start + PAGE_SIZE);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <section id="news" className={HomeStyles.news.section}>
        <h3 className={HomeStyles.news.heading}>ニュース</h3>

        {currentPosts.length === 0 ? (
          <p className={HomeStyles.news.emptyText}>投稿はまだありません。</p>
        ) : (
          <ul className={HomeStyles.news.list}>
            {currentPosts.map((post) => (
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
        )}

        <nav
          className={HomeStyles.news.pagination}
          aria-label="投稿ページネーション"
        >
          {currentPage > 1 && (
            <Link
              href={`/posts?page=${currentPage - 1}`}
              className={HomeStyles.news.pageButton}
            >
              前へ
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <Link
                key={page}
                href={`/posts?page=${page}`}
                className={`${HomeStyles.news.pageButton} ${isActive ? HomeStyles.news.pageButtonActive : ""}`.trim()}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </Link>
            );
          })}

          {currentPage < totalPages && (
            <Link
              href={`/posts?page=${currentPage + 1}`}
              className={HomeStyles.news.pageButton}
            >
              次へ
            </Link>
          )}
        </nav>
      </section>
    </main>
  );
}
