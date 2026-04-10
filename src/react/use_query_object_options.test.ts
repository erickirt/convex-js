/**
 * @vitest-environment custom-vitest-environment.ts
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { test, describe } from "vitest";
import { anyApi } from "../server/api.js";

import type { ApiFromModules, QueryBuilder } from "../server/index.js";
import { useQuery as useQueryReal } from "./client.js";

const useQuery = (() => {}) as unknown as typeof useQueryReal;
const query: QueryBuilder<any, "public"> = (() => {}) as any;

const module = {
  noArgs: query(() => "result"),
  args: query((_ctx, { _arg }: { _arg: string }) => "result"),
};
type API = ApiFromModules<{ module: typeof module }>;
const api = anyApi as unknown as API;

describe("useQuery object options", () => {
  test("supports object options and skip sentinel", () => {
    useQuery({
      query: api.module.noArgs,
      args: {},
    });

    useQuery({
      query: api.module.args,
      args: { _arg: "asdf" },
    });

    const _arg: string | undefined = undefined;
    useQuery({
      query: api.module.args,
      args: _arg ? { _arg } : "skip",
    });

    useQuery({
      query: api.module.args,
      args: { _arg: "asdf" },
    });

    useQuery({
      query: api.module.noArgs,
      args: "skip",
    });
  });
});
