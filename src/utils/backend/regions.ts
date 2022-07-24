// Supabase
import { supabase } from "@utils/supabase-client";

export async function getRegions() {
  const { data, error } = await supabase
    .from("regions")
    .select("id, code, city, country")
    .order("country");

  if (error) return { data: [], error };
  return { data, error: null };
}

export async function getRegionID(code: string) {
  const { data, error } = await supabase
    .from("regions")
    .select("id")
    .match({ code })
    .limit(1)
    .single();

  if (error) return { data: 0, error };
  return { data: data.id, error: null };
}
