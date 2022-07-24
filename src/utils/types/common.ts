import { NextPage } from "next";

export type RecycLensPage<T = {}> = NextPage<T> & {
  appBar?: {
    title: string;
    backGoesTo?: string;
  };
};
