// @see https://github.com/esamattis/babel-plugin-ts-optchain/blob/master/packages/babel-plugin-ts-optchain/__tests__/plugin.test.ts
import path from "path";
function runPlugin(code: string) {
  const res = transform(code, {
    babelrc: false,
    filename: "test.ts",
    plugins: [path.join(__dirname, "/../src/plugin.ts")],
  });

  if (!res) {
    throw new Error("plugin failed");
  }

  return res;
}

import { transform } from "@babel/core";
describe("remove getServerSideProps", () => {
  test("remove exported sync getServerSideProps", () => {
    const code = `export getServerSideProps () { return {} }`;
    const res = runPlugin(code);
    expect(res).toEqual("");
  });
  test("remove exported async getServerSideProps", () => {
    const code = `export async getServerSideProps () { return {} }`;
    const res = runPlugin(code);
    expect(res).toEqual("");
  });
  test("remove exported sync arrow getServerSideProps", () => {
    const code = `export const getServerSideProps = () => { return {} }`;
    const res = runPlugin(code);
    expect(res).toEqual("");
  });
  test("remove exported async getServerSideProps", () => {
    const code = `export const getServerSideProps = async () => { return {} }`;
    const res = runPlugin(code);
    expect(res).toEqual("");
  });
});
