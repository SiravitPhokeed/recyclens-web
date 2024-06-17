export type Bin = {
  id: number;
  name: string;
  hexColor: string;
  image: string | null;
  collection: Partial<{
    info: string;
    start: string;
    end: string;
    lastTruck: string;
  }>;
};
