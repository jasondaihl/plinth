import { Text } from "@plinth/components";
import type { Meta, StoryObj } from "@storybook/react-vite";

const SIZES = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"] as const;
const WEIGHTS = ["regular", "medium", "semibold", "bold"] as const;
const TONES = ["default", "muted", "inverse"] as const;
const LEADINGS = ["tight", "normal", "relaxed"] as const;

const meta = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    as: {
      control: "select",
      options: [
        "p",
        "span",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "label",
        "strong",
        "em",
      ],
    },
    size: { control: "select", options: SIZES },
    weight: { control: "select", options: WEIGHTS },
    tone: { control: "select", options: TONES },
    leading: { control: "select", options: LEADINGS },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {SIZES.map((size) => (
        <Text key={size} size={size}>
          {size} — The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {WEIGHTS.map((weight) => (
        <Text key={weight} weight={weight} size="lg">
          {weight} — The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text tone="default">default — primary body text</Text>
      <Text tone="muted">muted — secondary body text</Text>
      <div
        className="rounded-md p-3"
        style={{ background: "var(--plinth-semantic-color-text)" }}
      >
        <Text tone="inverse">inverse — on dark surface</Text>
      </div>
    </div>
  ),
};

export const Leading: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {LEADINGS.map((leading) => (
        <div key={leading} className="max-w-xs">
          <Text size="sm" tone="muted" weight="semibold">
            {leading}
          </Text>
          <Text leading={leading}>
            Multi-line copy to demonstrate line height. The quick brown fox
            jumps over the lazy dog, then turns around and does it again for
            good measure.
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text as="h1" size="4xl" weight="bold" leading="tight">
        Heading 1
      </Text>
      <Text as="h2" size="3xl" weight="semibold" leading="tight">
        Heading 2
      </Text>
      <Text as="h3" size="2xl" weight="semibold">
        Heading 3
      </Text>
      <Text as="p">
        Body paragraph rendered as the default <code>&lt;p&gt;</code>.
      </Text>
      <Text as="label" size="sm" weight="medium" tone="muted">
        Inline label
      </Text>
    </div>
  ),
};
