// Frontend types
export type Region = {
  id: number;
  code: string;
  city: string;
  country?: string;
};

// Backend types
export type DBRegion = Region & { created_at: string };
