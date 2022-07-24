// Supabase
import { supabase } from "@utils/supabase-client";

// Types
import { RecycLensBackendReturn } from "@utils/types/common";

export async function getCategoriesForRegion(
  regionID: number
): Promise<RecycLensBackendReturn<any[]>> {
  const { data, error } = await supabase
    .from("categories")
    .select("name, bin:bins(*), should_repair, can_donate")
    .match({ region: regionID });

  if (error) return { data: null, error };
  return { data, error: null };
}
