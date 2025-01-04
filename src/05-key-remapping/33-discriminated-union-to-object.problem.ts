import { Equal, Expect } from "../helpers/type-utils";

type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about"; search: {} }
  | { route: "/admin"; search: {} }
  | { route: "/admin/users"; search: {} };

// My Solution
type RoutesObject = {
  [K in Route as K extends { route: infer R extends string; search: any }
    ? R
    : never]: K["search"];
};

// Matt's solution 1
type RoutesObject2 = {
  [R in Route["route"]]: Extract<Route, { route: R }>["search"];
};

// Matt's solution 2
type RoutesObject3 = {
  [R in Route as R["route"]]: R["search"];
};

type tests = [
  Expect<
    Equal<
      RoutesObject3,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": {};
        "/admin": {};
        "/admin/users": {};
      }
    >
  >,
];
