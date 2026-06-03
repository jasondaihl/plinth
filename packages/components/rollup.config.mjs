import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";

const external = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "@plinth/tokens",
  "clsx",
];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      nodeResolve({ extensions: [".ts", ".tsx"] }),
      typescript({
        tsconfig: "./tsconfig.build.json",
        declaration: false,
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external,
    plugins: [dts()],
  },
];
