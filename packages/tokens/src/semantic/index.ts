import { ref } from "../utils.js";

export const semantic = {
  color: {
    surface: ref("primitive.color.white"),
    surfaceMuted: ref("primitive.color.gray.50"),
    surfaceRaised: ref("primitive.color.white"),
    text: ref("primitive.color.gray.900"),
    textMuted: ref("primitive.color.gray.600"),
    textInverse: ref("primitive.color.white"),
    border: ref("primitive.color.gray.200"),
    borderStrong: ref("primitive.color.gray.300"),
    interactive: ref("primitive.color.blue.600"),
    interactiveHover: ref("primitive.color.blue.700"),
    interactiveText: ref("primitive.color.white"),
  },
} as const;

export const semanticDark = {
  color: {
    surface: ref("primitive.color.gray.950"),
    surfaceMuted: ref("primitive.color.gray.900"),
    surfaceRaised: ref("primitive.color.gray.800"),
    text: ref("primitive.color.gray.50"),
    textMuted: ref("primitive.color.gray.400"),
    textInverse: ref("primitive.color.gray.950"),
    border: ref("primitive.color.gray.800"),
    borderStrong: ref("primitive.color.gray.700"),
    interactive: ref("primitive.color.blue.400"),
    interactiveHover: ref("primitive.color.blue.300"),
    interactiveText: ref("primitive.color.gray.950"),
  },
} as const;

export type Semantic = typeof semantic;
