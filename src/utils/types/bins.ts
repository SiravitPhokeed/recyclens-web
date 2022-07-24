export type Bin = {
  id: number;
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
  hex_color: string;
  image?: string;
  collect_info?: string;
  collect_start?: string;
  collect_end?: string;
  last_truck?: string;
};
