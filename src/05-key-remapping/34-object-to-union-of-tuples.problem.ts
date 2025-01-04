import { Equal, Expect } from "../helpers/type-utils";

interface Values {
  email: string;
  firstName: string;
  lastName: string;
}

// My solution
type ObjectValues<T> = T[keyof T];

type ValuesAsUnionOfTuples = ObjectValues<{
  [K in keyof Values]: [K, Values[K]];
}>;

// Matt's solution
type ValuesAsUnionOfTuples2 = {
  [K in keyof Values]: [K, Values[K]];
}[keyof Values];

type tests = [
  Expect<
    Equal<
      ValuesAsUnionOfTuples2,
      ["email", string] | ["firstName", string] | ["lastName", string]
    >
  >,
];
