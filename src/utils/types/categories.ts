// Related types
import { Bin, DBBin } from "@utils/types/bins";
import { DBRegion } from "@utils/types/regions";

// Frontend types
export type CategoryListItem = {
  id: number;
  name: string;
  regionID: number;
  binColor: string;
  shouldRepair?: boolean;
  canDonate?: boolean;
};

export type CategoryDetails = {
  id: number;
  name: string;
  regionCity: string;
  preparation: {
    info: string;
    restrictions?: string;
    shouldRepair?: boolean;
  };
  bin: {
    hexColor: string;
    image?: string;
  };
  collection: {
    allowCollect?: boolean;
    times?: Bin["collection"];
    binInfo?: string;
    categoryInfo?: string;
  };
  donate: {
    canDonate?: boolean;
    info?: string;
  };
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
