import fs from "node:fs";

const extractTitleFromMdx = (source: string) => {
  const metadataBlockMatch = source.match(
    /export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};?/,
  );
  if (!metadataBlockMatch) return null;

  const titleMatch = metadataBlockMatch[1].match(
    /title\s*:\s*(["'`])([\s\S]*?)\1/,
  );
  return titleMatch?.[2]?.trim() ?? null;
};

const extractDescriptionFromMdx = (source: string) => {
  const metadataBlockMatch = source.match(
    /export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};?/,
  );
  if (!metadataBlockMatch) return null;

  const descriptionMatch = metadataBlockMatch[1].match(
    /description\s*:\s*(["'`])([\s\S]*?)\1/,
  );
  return descriptionMatch?.[2]?.trim() ?? null;
};

const extractPublishedAtFromMdx = (source: string) => {
  const metadataBlockMatch = source.match(
    /export\s+const\s+metadata\s*=\s*\{([\s\S]*?)\};?/,
  );
  if (!metadataBlockMatch) return null;

  const publishedAtMatch = metadataBlockMatch[1].match(
    /publishedAt\s*:\s*(["'`])([\s\S]*?)\1/,
  );
  return publishedAtMatch?.[2]?.trim() ?? null;
};

const sortPosts = <T extends { id: string; publishedAt: string }>(
  posts: T[],
) => {
  return [...posts].sort((a, b) => {
    const aTime = new Date(a.publishedAt).getTime();
    const bTime = new Date(b.publishedAt).getTime();

    if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
      return b.id.localeCompare(a.id);
    }
    if (Number.isNaN(aTime)) return 1;
    if (Number.isNaN(bTime)) return -1;
    return bTime - aTime;
  });
};

export const GET = async () => {
  const postDirectory = "src/app/(main)/posts";
  const postIndexDirs = await fs.promises.readdir(postDirectory);
  const posts = await Promise.all(
    postIndexDirs
      .filter((dir) => fs.existsSync(`${postDirectory}/${dir}/page.mdx`))
      .map(async (dir) => {
        const filePath = `${postDirectory}/${dir}/page.mdx`;
        const id = dir;
        const content = await fs.promises.readFile(filePath, "utf-8");
        const title = extractTitleFromMdx(content) ?? id;
        const description = extractDescriptionFromMdx(content) ?? "";
        const publishedAt = extractPublishedAtFromMdx(content) ?? "";
        return { id, title, description, publishedAt };
      }),
  );
  return Response.json(sortPosts(posts));
};
