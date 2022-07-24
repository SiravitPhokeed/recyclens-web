// Supabase
import { supabase } from "@utils/supabase-client";

export async function getCategoriesForRegion(regionID: number) {
  const { data, error } = await supabase
    .from("categories")
    .select("name, bin:bins(*), should_repair, can_donate")
    .match({ region: regionID });

  if (error) return { data: null, error };
  return { data, error: null };
}
