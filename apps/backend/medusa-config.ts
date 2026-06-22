// const { loadEnv, defineConfig, Modules } = require("@medusajs/framework/utils");

// // Enforce explicit production context compilation
// loadEnv(process.env.NODE_ENV || "production", process.cwd());

// module.exports = defineConfig({
//   projectConfig: {
//     databaseUrl: process.env.DATABASE_URL,
//     redisUrl: process.env.REDIS_URL,
//     http: {
//       storeCors: process.env.STORE_CORS,
//       adminCors: process.env.ADMIN_CORS,
//       authCors: process.env.AUTH_CORS,
//       jwtSecret: process.env.JWT_SECRET || "supersecret_haveher_secret",
//       cookieSecret:
//         process.env.COOKIE_SECRET || "supersecret_haveher_cookie_secret",
//     },
//   },

//   // 👑 FIXED: Medusa v2 Framework Native Routing Structure
//   admin: {
//     disable: false,
//     path: "/app",
//     backendUrl:
//       process.env.MEDUSA_BACKEND_URL || "https://haveher-backend.onrender.com",
//   },

//   modules: {
//     [Modules.EVENT_BUS]: {
//       resolve: "@medusajs/event-bus-redis",
//       options: {
//         redisUrl: process.env.REDIS_URL,
//       },
//     },
//     [Modules.FILE]: {
//       resolve: "@medusajs/file",
//       options: {
//         providers: [
//           {
//             resolve: "@medusajs/file-s3",
//             id: "s3",
//             options: {
//               file_url: process.env.S3_URL,
//               access_key_id: process.env.S3_ACCESS_KEY_ID,
//               secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
//               region: process.env.S3_REGION,
//               bucket: process.env.S3_BUCKET,
//               endpoint: process.env.S3_ENDPOINT,
//               additional_client_config: {
//                 forcePathStyle: true,
//               },
//             },
//           },
//         ],
//       },
//     },
//     [Modules.PAYMENT]: {
//       resolve: "@medusajs/payment",
//       options: {
//         providers: [
//           {
//             resolve: "@devx-commerce/razorpay/providers/payment-razorpay",
//             id: "razorpay",
//             options: {
//               key_id: process.env.RAZORPAY_ID || "rzp_test_T32p4x9a5fuR4e",
//               key_secret:
//                 process.env.RAZORPAY_SECRET || "zN2ujmPYkMkfAwhYqaUHms7y",
//               webhook_secret:
//                 process.env.RAZORPAY_WEBHOOK_SECRET ||
//                 "haveher_super_secret_webhook_string",
//               auto_capture: true,
//             },
//           },
//           {
//             resolve: "@devx-commerce/razorpay/providers/payment-razorpay",
//             id: "pp_razorpay_razorpay",
//             options: {
//               key_id: process.env.RAZORPAY_ID || "rzp_test_T32p4x9a5fuR4e",
//               key_secret:
//                 process.env.RAZORPAY_SECRET || "zN2ujmPYkMkfAwhYqaUHms7y",
//               webhook_secret:
//                 process.env.RAZORPAY_WEBHOOK_SECRET ||
//                 "haveher_super_secret_webhook_string",
//               auto_capture: true,
//             },
//           },
//         ],
//       },
//     },
//   },
// });
// const { loadEnv, defineConfig, Modules } = require("@medusajs/framework/utils");

// // Enforce explicit production context compilation
// loadEnv(process.env.NODE_ENV || "production", process.cwd());

// module.exports = defineConfig({
//   projectConfig: {
//     databaseUrl: process.env.DATABASE_URL,
//     redisUrl: process.env.REDIS_URL,
//     http: {
//       storeCors: process.env.STORE_CORS,
//       adminCors: process.env.ADMIN_CORS,
//       authCors: process.env.AUTH_CORS,
//       jwtSecret: process.env.JWT_SECRET || "supersecret_haveher_secret",
//       cookieSecret:
//         process.env.COOKIE_SECRET || "supersecret_haveher_cookie_secret",
//     },
//   },

//   // 👑 FIXED: Medusa v2 Framework Native Routing Structure
//   admin: {
//     disable: false,
//     path: "/app",
//     backendUrl:
//       process.env.MEDUSA_BACKEND_URL || "https://haveher-backend.onrender.com",
//   },

//   modules: {
//     [Modules.EVENT_BUS]: {
//       resolve: "@medusajs/event-bus-redis",
//       options: {
//         redisUrl: process.env.REDIS_URL,
//       },
//     },
//     [Modules.FILE]: {
//       resolve: "@medusajs/file",
//       options: {
//         providers: [
//           {
//             resolve: "@medusajs/file-s3",
//             id: "s3",
//             options: {
//               file_url: process.env.S3_URL,
//               access_key_id: process.env.S3_ACCESS_KEY_ID,
//               secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
//               region: process.env.S3_REGION,
//               bucket: process.env.S3_BUCKET,
//               endpoint: process.env.S3_ENDPOINT,
//               additional_client_config: {
//                 forcePathStyle: true,
//               },
//             },
//           },
//         ],
//       },
//     },
//     [Modules.PAYMENT]: {
//       resolve: "@medusajs/payment",
//       options: {
//         providers: [
//           // Razorpay Provider 1
//           {
//             resolve: "@devx-commerce/razorpay/providers/payment-razorpay",
//             id: "razorpay",
//             options: {
//               key_id: process.env.RAZORPAY_ID || "rzp_test_T32p4x9a5fuR4e",
//               key_secret:
//                 process.env.RAZORPAY_SECRET || "zN2ujmPYkMkfAwhYqaUHms7y",
//               webhook_secret:
//                 process.env.RAZORPAY_WEBHOOK_SECRET ||
//                 "haveher_super_secret_webhook_string",
//               auto_capture: true,
//             },
//           },
//           // Razorpay Provider 2
//           {
//             resolve: "@devx-commerce/razorpay/providers/payment-razorpay",
//             id: "pp_razorpay_razorpay",
//             options: {
//               key_id: process.env.RAZORPAY_ID || "rzp_test_T32p4x9a5fuR4e",
//               key_secret:
//                 process.env.RAZORPAY_SECRET || "zN2ujmPYkMkfAwhYqaUHms7y",
//               webhook_secret:
//                 process.env.RAZORPAY_WEBHOOK_SECRET ||
//                 "haveher_super_secret_webhook_string",
//               auto_capture: true,
//             },
//           },
//         ],
//       },
//     },
//   },
// });
const { loadEnv, defineConfig, Modules } = require("@medusajs/framework/utils");

// Enforce explicit production context compilation
loadEnv(process.env.NODE_ENV || "production", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "https://haveher.onrender.com",
      authCors: process.env.AUTH_CORS || "https://haveher.onrender.com",
      jwtSecret: process.env.JWT_SECRET || "supersecret_haveher_secret",
      cookieSecret:
        process.env.COOKIE_SECRET || "supersecret_haveher_cookie_secret",
    },
  },

  // 👑 FIXED: Resolved cross-origin loop by aligning standard backend architecture
  admin: {
    disable: false,
    path: "/app",
    backendUrl:
      process.env.MEDUSA_BACKEND_URL || "https://haveher.onrender.com",
  },

  modules: {
    [Modules.EVENT_BUS]: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    [Modules.FILE]: {
      resolve: "@medusajs/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    },
    [Modules.PAYMENT]: {
      resolve: "@medusajs/payment",
      options: {
        providers: [
          // 👑 CORE RAZORPAY PROVIDERS ONLY
          {
            resolve: "@devx-commerce/razorpay/providers/payment-razorpay",
            id: "razorpay",
            options: {
              key_id: process.env.RAZORPAY_ID || "rzp_test_T32p4x9a5fuR4e",
              key_secret:
                process.env.RAZORPAY_SECRET || "zN2ujmPYkMkfAwhYqaUHms7y",
              webhook_secret:
                process.env.RAZORPAY_WEBHOOK_SECRET ||
                "haveher_super_secret_webhook_string",
              auto_capture: true,
            },
          },
          {
            resolve: "@devx-commerce/razorpay/providers/payment-razorpay",
            id: "pp_razorpay_razorpay",
            options: {
              key_id: process.env.RAZORPAY_ID || "rzp_test_T32p4x9a5fuR4e",
              key_secret:
                process.env.RAZORPAY_SECRET || "zN2ujmPYkMkfAwhYqaUHms7y",
              webhook_secret:
                process.env.RAZORPAY_WEBHOOK_SECRET ||
                "haveher_super_secret_webhook_string",
              auto_capture: true,
            },
          },
        ],
      },
    },
  },
});
