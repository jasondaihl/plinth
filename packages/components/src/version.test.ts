import { describe, expect, it } from "vitest";
import { VERSION } from "./index.js";

describe("@plinth/components", () => {
  it("exposes a version constant", () => {
    expect(VERSION).toBe("0.0.0");
  });
});
