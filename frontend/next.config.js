/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const moduleExports = withBundleAnalyzer({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            typescript: true,
            svgProps: { fill: "currentColor" },
          },
        },
      ],
    });
    return config;
  },
});

module.exports = moduleExports;
