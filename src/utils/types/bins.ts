export type Bin = {
  id: number;
  name: string;
  hexColor: string;
  image?: string;
  collection?: Partial<{
    info: string;
    start: string;
    end: string;
    lastTruck: string;
  }>;
};

export type DBBin = {
  id: number;
  name: string;
  name_local: string;
  hex_color: string;
  image?: string;
  collect_info?: string;
  collect_start?: string;
  collect_end?: string;
  last_truck?: string;
};
