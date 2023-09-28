import run from "@rollup/plugin-run";
import typescript from "@rollup/plugin-typescript";

const dev = process.env.NODE_ENV !== "production";

export default {
  input: "src/app.ts",
  output: {
    file: "dist/app.js",
    format: "esm",
  },
  plugins: [dev && run(), typescript()],
  external: ["express", "dotenv", "fs", "cors", "jsonwebtoken"],
};
