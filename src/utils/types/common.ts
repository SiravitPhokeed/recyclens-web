import { PostgrestError } from "@supabase/supabase-js";
import { NextPage } from "next";

export type RecycLensPage<T = {}> = NextPage<T> & {
  appBar?: {
    title: string;
    backGoesTo?: string;
  };
};

export type RecycLensBackendReturn<T> =
  | { data: T; error: null }
  | { data: null; error: Partial<PostgrestError> };
