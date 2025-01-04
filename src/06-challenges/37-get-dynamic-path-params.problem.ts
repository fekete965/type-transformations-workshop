import { S } from "ts-toolbelt";
import { Equal, Expect } from "../helpers/type-utils";

type UserPath = "/users/:id";

type UserOrganisationPath = "/users/:id/organisations/:organisationId";

// My solution
type ExtractPathParams<T extends string> = {
  [K in S.Split<
    T,
    "/"
  >[number] as K extends `:${infer A extends `${string}${"id" | "Id"}`}`
    ? A
    : never]: string;
};

// Matt's solution
type ExtractPathParams2<TPath extends string> = {
  [K in S.Split<TPath, "/">[number] as K extends `:${infer P}`
    ? P
    : never]: string;
};

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >,
];
