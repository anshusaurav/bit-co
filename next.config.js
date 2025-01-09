/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  async redirects() {
    return [
      // {
      //   source: '/saurabh',
      //   destination: 'https://calendar.app.google/5Q8NaBfxKPFaSitj9',
      //   permanent: true,
      // },
      {
        source: '/shreyan',
        destination: 'https://calendar.app.google/f17tUWoRfwWaHXCdA',
        permanent: true,
      },
      // {
      //   source: '/nihal',
      //   destination: 'https://calendly.com/inbitcoinhub/bm',
      //   permanent: true,
      // },
      // {
      //   source: '/amol',
      //   destination: 'https://calendar.app.google/iAm3NNUZQWYEcRy46',
      //   permanent: true,
      // },
      // {
      //   source: '/ayush',
      //   destination: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0F59wJrxWxTtvcZtPV3-D5mBVlwLx8QdZ3jbUI2IvB1XohDy6d3OGVOlh-_jh-1qnkvw-PznnO',
      //   permanent: true,
      // },
      {
        source: '/varun',
        destination: 'https://calendar.app.google/DuNB9EjWkoJqUKkDA',
        permanent: true,
      },
      // {
      //   source: '/ravi',
      //   destination: 'https://calendar.app.google/KDMMBo6K1fTohC7aA',
      //   permanent: true,
      // },
      {
        source: '/digant',
        destination: 'https://calendar.app.google/sMfPCFb7yZj2xv7Y6',
        permanent: true,
      },
      
      

    ]
  },

  reactStrictMode: true,
  swcMinify: true,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
