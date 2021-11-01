declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_HOSTNAME: string;
      JWT_SECRET: string;
      NODE_ENV: "production" | "development";
    }
  }
}

export {};
