/** @type {import('next').NextConfig} */
// require dotenv module
require("dotenv").config();
const nextConfig = {
  env: {
    API_KEY: process.env.NEXT_APP_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_APP_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_APP_PROJECT_ID,
    STORAGE_BUK: process.env.NEXT_APP_STORAGE_BUCKET,
    MSG_SENDER_ID: process.env.NEXT_APP_MSG_SENDER_ID,
    APP_ID: process.env.NEXT_APP_APP_ID,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
    formats: ["image/webp", "image/avif"],
  },
};

module.exports = nextConfig;
