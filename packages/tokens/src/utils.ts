export type Ref = { readonly $ref: string };

export const ref = (path: string): Ref => ({ $ref: path });

export const isRef = (value: unknown): value is Ref =>
  typeof value === "object" && value !== null && "$ref" in value;
