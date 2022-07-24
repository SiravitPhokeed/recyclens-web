// Supabase
import { supabase } from "@utils/supabase-client";

// Types
import { CategoryListItem, DBJoinedCategory } from "@utils/types/categories";
import { RecycLensBackendReturn } from "@utils/types/common";

export async function getCategoriesForRegion(
  regionID: number
): Promise<RecycLensBackendReturn<CategoryListItem[]>> {
  const { data, error } = await supabase
    .from<DBJoinedCategory>("categories")
    .select("name, bin:bins(*), should_repair, can_donate")
    .match({ region: regionID });

  if (error) return { data: null, error };
  return {
    data: data.map((category) => ({
      id: category.id,
      name: category.name,
      binColor: category.bin.hex_color,
      shouldRepair: category.should_repair,
      canDonate: category.can_donate,
    })),
    error: null,
  };
}
