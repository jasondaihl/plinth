import type { Preview } from "@storybook/react-vite";

import "../src/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "var(--plinth-semantic-color-surface)" },
        { name: "muted", value: "var(--plinth-semantic-color-surface-muted)" },
      ],
    },
  },
};

export default preview;
