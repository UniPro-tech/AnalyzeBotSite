import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", ["remark-toc", { heading: "目次" }]],
  },
});

// MDX設定とNext.js設定をマージ
export default withMDX(nextConfig);
