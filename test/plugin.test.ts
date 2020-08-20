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

const normalizeBlank = (str) => {
  str.replace("\t", " ").replace("\n", " ").replace(/\s+/, " ");
};

const defaultCode = '"use strict";'; // mandatory for modules so it will always be in the response
import { transform } from "@babel/core";
describe("remove getServerSideProps", () => {
  test("remove exported sync getServerSideProps", () => {
    const code = `export function getServerSideProps () { return {} }`;
    const res = runPlugin(code);
    expect(res.code).toEqual(`${defaultCode}`);
  });
  test("remove exported async getServerSideProps", () => {
    const code = `export async function getServerSideProps () { return {} }`;
    const res = runPlugin(code);
    expect(res.code).toEqual(`${defaultCode}`);
  });
  test("remove exported sync arrow getServerSideProps", () => {
    const code = `export const getServerSideProps = () => { return {} }`;
    const res = runPlugin(code);
    expect(res.code).toEqual(`${defaultCode}`);
  });
  test("remove exported async getServerSideProps", () => {
    const code = `export const getServerSideProps = async () => { return {} }`;
    const res = runPlugin(code);
    expect(res.code).toEqual(`${defaultCode}`);
  });
  test("ignore unexported getServerSideProps", () => {
    const code = `const getServerSideProps = async () => { return {}; };`; // we have to add semis so it matches the Babel result
    const res = runPlugin(code);
    expect(normalizeBlank(res.code)).toEqual(
      normalizeBlank(`${defaultCode} ${code}`)
    );
  });
});
