// TS support is still incomplete
// @see https://github.com/babel/babel/issues/10637

// import { PluginDefinition } from "@babel/core";
import * as BabelTypes from "@babel/types";
import { Visitor } from "@babel/traverse";

interface Babel {
  types: typeof BabelTypes;
}

export default function ({ types: t }: Babel) {
  const visitor: Visitor = {
    // export ...
    ExportNamedDeclaration(path) {
      path.traverse({
        // export getServerSideProps
        Identifier(path) {
          if (path.node.name === "getServerSideProps") {
            path.remove();
          }
        },
      });
    },
  };
  return { visitor };
}
