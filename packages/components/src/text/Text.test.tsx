import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Text } from "./Text.js";

afterEach(() => {
  cleanup();
});

describe("<Text>", () => {
  it("renders a <p> with base defaults", () => {
    render(<Text>Hello</Text>);
    const node = screen.getByText("Hello");
    expect(node.tagName).toBe("P");
    expect(node.className).toContain("text-base");
    expect(node.className).toContain("font-regular");
    expect(node.className).toContain("text-text");
    expect(node.className).toContain("leading-normal");
  });

  it("renders the element specified by `as`", () => {
    render(<Text as="h2">Heading</Text>);
    expect(screen.getByText("Heading").tagName).toBe("H2");
  });

  it("applies variant classes", () => {
    render(
      <Text size="2xl" weight="bold" tone="muted" leading="tight">
        Variant
      </Text>,
    );
    const node = screen.getByText("Variant");
    expect(node.className).toContain("text-2xl");
    expect(node.className).toContain("font-bold");
    expect(node.className).toContain("text-text-muted");
    expect(node.className).toContain("leading-tight");
  });

  it("merges consumer `className` after variant classes", () => {
    render(<Text className="custom-class">Merged</Text>);
    const node = screen.getByText("Merged");
    expect(node.className).toContain("text-base");
    expect(node.className).toContain("custom-class");
  });

  it("forwards native props to the underlying element", () => {
    render(
      <Text as="label" htmlFor="email">
        Email
      </Text>,
    );
    const node = screen.getByText("Email") as HTMLLabelElement;
    expect(node.tagName).toBe("LABEL");
    expect(node.htmlFor).toBe("email");
  });
});
