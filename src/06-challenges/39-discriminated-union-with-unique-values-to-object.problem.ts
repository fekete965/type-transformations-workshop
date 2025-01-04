import { Equal, Expect } from "../helpers/type-utils";

type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about" }
  | { route: "/admin" }
  | { route: "/admin/users" };

// My solution
type RoutesObject = {
  [K in Route as K["route"]]: K extends { route: string; search: infer S }
    ? S
    : never;
};

// Matt's solution
type RoutesObject2 = {
  [R in Route as R["route"]]: R extends { search: infer S } ? S : never;
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": never;
        "/admin": never;
        "/admin/users": never;
      }
    >
  >,
];
