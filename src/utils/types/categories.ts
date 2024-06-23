export type CategoryListItem = {
  id: number;
  name: string;
  regionID: number;
  binColor: string;
  shouldRepair: boolean;
  canDonate: boolean;
};

export type CategoryDetails = {
  id: number;
  name: string;
  regionCity: string;
  preparation: {
    info: string;
    restrictions: string | null;
    shouldRepair: boolean;
  };
  bin: {
    name: string;
    localName: string | null;
    hexColor: string;
    image: string | null;
  };
  collection: {
    allowCollect: boolean;
    times: {
      start: string | null;
      end: string | null;
      lastTruck: string | null;
    };
    binInfo: string | null;
    categoryInfo: string | null;
  };
  donate: {
    canDonate: boolean;
    info: string | null;
  };
};
