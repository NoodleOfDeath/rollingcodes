/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  webpack: (config, {
    isServer, dev, webpack,
  }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.module.rules.push({ test: /\.node$/, use: 'node-loader' });
    }
    config.plugins.push(new webpack.DefinePlugin({ __DEV__: dev ? true : false }));
    return config;
  },
};

module.exports = nextConfig;
