// prisma/prisma.config.ts

import "dotenv/config"; // Ensure environment variables are loaded
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Optional: configure migrations path if it's not the default
  migrations: {
    path: "prisma/migrations", 
  },
  datasource: {
    url: env("DATABASE_URL"), // Use the env helper to load from .env file
  },
});
