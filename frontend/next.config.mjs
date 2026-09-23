/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: every page is rendered to HTML at build time,
  // no Node server needed at runtime.
  output: "export",
  distDir: "build",
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  },
};

export default nextConfig;
