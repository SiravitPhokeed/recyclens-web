// Related types
import { DBBin } from "./bins";
import { DBRegion } from "./regions";

// Frontend types
export type CategoryListItem = {
  id: number;
  name: string;
  binColor: string;
  shouldRepair?: boolean;
  canDonate?: boolean;
};

// Backend types
export type DBCategory = {
  id: number;
  created_at: string;
  region: number;
  name: string;
  preparation: string;
  restrictions?: string;
  bin: number;
  allow_collect: boolean;
  collect_info?: string;
  should_repair: boolean;
  can_donate: boolean;
  donate_info?: string;
};

export type DBJoinedCategory = Omit<DBCategory, "region" | "bin"> & {
  region: DBRegion;
  bin: DBBin;
};
