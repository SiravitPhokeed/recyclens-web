import { NextPage } from "next";

export type RecycLensPage = NextPage & {
  appBar?: {
    title: string;
    backGoesTo?: string;
  };
};
