import fs from "node:fs";
import type { MetadataRoute } from "next";
import { getLastModifiedDate } from "@/libs/git";

const BASE_URL = "https://analyze-bot.uniproject.jp";

const STATIC_URLs: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: getLastModifiedDate("src/app/page.tsx"),
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: getLastModifiedDate("src/app/about/page.tsx"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/commands`,
    lastModified: getLastModifiedDate("src/app/commands/page.tsx"),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/posts`,
    lastModified: getLastModifiedDate("src/app/posts/page.tsx"),
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/howto`,
    lastModified: getLastModifiedDate("src/app/howto/page.tsx"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/invite`,
    lastModified: getLastModifiedDate("src/app/invite/page.tsx"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/legal`,
    lastModified: getLastModifiedDate("src/app/legal/page.tsx"),
    changeFrequency: "monthly",
    priority: 0.6,
  },
];

function getPostSitemapEntries(): MetadataRoute.Sitemap {
  const postDirectory = "src/app/posts";
  const entries: MetadataRoute.Sitemap = [];
  let postIndexDirs: string[] = [];
  try {
    postIndexDirs = fs.readdirSync(postDirectory);
  } catch (e) {
    console.log("Failed to read posts directory for sitemap generation:", e);
    return [];
  }
  for (const dir of postIndexDirs) {
    const filePath = `${postDirectory}/${dir}/page.mdx`;
    if (fs.existsSync(filePath)) {
      entries.push({
        url: `${BASE_URL}/posts/${dir}`,
        lastModified: getLastModifiedDate(filePath),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }
  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...STATIC_URLs, ...getPostSitemapEntries()];
}
