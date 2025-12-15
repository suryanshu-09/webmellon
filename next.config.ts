const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      // OAuth provider avatars
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      // YouTube thumbnails
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      // WordPress/Medium common image hosts
      {
        protocol: "https",
        hostname: "*.medium.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.wordpress.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.wp.com",
        pathname: "/**",
      },
      // Google favicon service
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
      // Common CDN providers for RSS feed images
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.imgix.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Common news/blog image hosts
      {
        protocol: "https",
        hostname: "*.substack.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "substackcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.ghost.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.ghost.org",
        pathname: "/**",
      },
      // RSS feed aggregator images
      {
        protocol: "https",
        hostname: "*.feedburner.com",
        pathname: "/**",
      },
      // Gravatar for author images
      {
        protocol: "https",
        hostname: "*.gravatar.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/**",
      },
    ],
    // Performance optimizations for images
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactCompiler: true,
  // Webpack config for handling pino/thread-stream compatibility
  webpack: (config: any) => {
    // Ignore test files in node_modules
    config.module.rules.push({
      test: /\.test\.(js|ts|mjs)$/,
      loader: 'ignore-loader',
    });
    
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
