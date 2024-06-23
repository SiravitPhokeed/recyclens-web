import { supabase } from "@utils/supabase-client";
import { CategoryDetails, CategoryListItem } from "@utils/types/categories";
import { RecycLensBackendReturn } from "@utils/types/common";

export async function getCategoriesForRegion(
  regionID: number,
): Promise<RecycLensBackendReturn<CategoryListItem[]>> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, bin:bins!inner(*), should_repair, can_donate")
    .match({ region: regionID })
    .order("name");

  if (error) return { data: null, error };
  return {
    data: data.map((category) => ({
      id: category.id,
      name: category.name,
      regionID,
      binColor: category.bin.hex_color,
      shouldRepair: category.should_repair,
      canDonate: category.can_donate,
    })),
    error: null,
  };
}

export async function getCategoryDetails(
  categoryID: number,
): Promise<RecycLensBackendReturn<CategoryDetails>> {
  const { data, error } = await supabase
    .from("categories")
    .select("*, region:regions(city), bin:bins!inner(*)")
    .match({ id: categoryID })
    .limit(1)
    .single();

  if (error) return { data: null, error };
  return {
    data: {
      id: data.id,
      name: data.name,
      regionCity: data.region.city,
      preparation: {
        info: data.preparation,
        restrictions: data.restrictions,
        shouldRepair: data.should_repair,
      },
      bin: {
        name: data.bin.name,
        localName: data.bin.name_local,
        hexColor: data.bin.hex_color,
        image: data.bin.image,
      },
      collection: {
        allowCollect: data.allow_collect,
        times: {
          start: data.bin.collect_start,
          end: data.bin.collect_end,
          lastTruck: data.bin.last_truck,
        },
        binInfo: data.bin.collect_info,
        categoryInfo: data.collect_info,
      },
      donate: {
        canDonate: data.can_donate,
        info: data.donate_info,
      },
    },
    error: null,
  };
}
