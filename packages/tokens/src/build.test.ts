import { describe, expect, it } from "vitest";

import { primitive } from "./primitive/index.js";
import { semantic, semanticDark } from "./semantic/index.js";
import { brand } from "./brand/default.js";
import { isRef } from "./utils.js";

describe("token tree", () => {
  it("primitive values are all strings (no refs)", () => {
    const walk = (node: unknown): void => {
      if (typeof node === "string") return;
      expect(isRef(node)).toBe(false);
      if (typeof node === "object" && node !== null) {
        for (const v of Object.values(node)) walk(v);
      }
    };
    walk(primitive);
  });

  it("every semantic value is a ref into primitive", () => {
    const walk = (node: unknown): void => {
      if (isRef(node)) {
        expect(node.$ref.startsWith("primitive.")).toBe(true);
        return;
      }
      if (typeof node === "object" && node !== null) {
        for (const v of Object.values(node)) walk(v);
      }
    };
    walk(semantic);
    walk(semanticDark);
  });

  it("brand entries reference either primitive or semantic", () => {
    for (const namespace of Object.values(brand)) {
      for (const refValue of Object.values(namespace)) {
        expect(
          refValue.$ref.startsWith("primitive.") ||
            refValue.$ref.startsWith("semantic."),
        ).toBe(true);
      }
    }
  });

  it("light and dark semantic layers expose the same keys", () => {
    expect(Object.keys(semantic.color).sort()).toEqual(
      Object.keys(semanticDark.color).sort(),
    );
  });
});
