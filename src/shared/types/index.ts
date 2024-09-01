export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type ElementKeys<T extends Record<string | number, unknown>[]> = keyof ArrElement<T>