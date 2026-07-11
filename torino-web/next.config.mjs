/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "6500",
        pathname: "/static/images/**",
        search: "",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/profile",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
