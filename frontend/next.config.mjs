/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: every page is rendered to HTML at build time,
  // no Node server needed at runtime.
  output: "export",
  distDir: "build",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
