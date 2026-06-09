import type { NextPage } from "next";

/**
 * NextPage modified to carry additional information about the
 * page’s App Bar.
 */
export type RecycLensPage<T = {}> = NextPage<T> & {
  appBar?: {
    title: string;
    backGoesTo?: string;
  };
};

export type RecycLensBackendReturn<T> =
  | { data: T; error: null }
  | { data: null | 0 | []; error: Error | { message: string } };
