import { Equal, Expect } from "../helpers/type-utils";

const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

type GetParserResult<T> = T extends { parse: () => infer T1 }
  ? T1
  : T extends () => infer T2
    ? T2
    : T extends { extract: () => infer T3 }
      ? T3
      : never;

// Nicer way using a union type
type GetParserResult2<T> = T extends
  | { parse: () => infer TData }
  | { extract: () => infer TData }
  | (() => infer TData)
  ? TData
  : never;

type tests = [
  Expect<Equal<GetParserResult2<typeof parser1>, number>>,
  Expect<Equal<GetParserResult2<typeof parser2>, string>>,
  Expect<Equal<GetParserResult2<typeof parser3>, boolean>>,
];
