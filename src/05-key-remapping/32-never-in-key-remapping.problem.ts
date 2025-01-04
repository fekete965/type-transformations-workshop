import { Equal, Expect } from "../helpers/type-utils";

interface Example {
  name: string;
  age: number;
  id: string;
  organisationId: string;
  groupId: string;
}

// My solution
type Helper<T> = T extends `${string}${"id" | "Id"}${string}` ? T : never;

type OnlyIdKeys<T> = {
  [K in Helper<keyof T>]: T[K];
};

// Matt's solution
type SearchForIds = `${string}${"id" | "Id"}${string}`;

type OnlyIdKeys2<T> = {
  [K in keyof T as K extends SearchForIds ? K : never]: T[K];
};

type tests = [
  Expect<
    Equal<
      OnlyIdKeys2<Example>,
      {
        id: string;
        organisationId: string;
        groupId: string;
      }
    >
  >,
  Expect<Equal<OnlyIdKeys<{}>, {}>>,
];
