// Supabase
import { supabase } from "@utils/supabase-client";

// Types
import { RecycLensBackendReturn } from "@utils/types/common";
import { Region } from "@utils/types/regions";

export async function getRegions(): Promise<RecycLensBackendReturn<Region[]>> {
  const { data, error } = await supabase
    .from("regions")
    .select("id, code, city, country")
    .order("country");

  if (error) return { data: [], error };
  return { data, error: null };
}

export async function getRegionID(
  code: string
): Promise<RecycLensBackendReturn<number>> {
  const { data, error } = await supabase
    .from("regions")
    .select("id")
    .match({ code })
    .limit(1)
    .single();

  if (error) return { data: 0, error };
  return { data: data.id, error: null };
}
