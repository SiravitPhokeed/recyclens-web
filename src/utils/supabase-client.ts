import { createClient } from "@supabase/supabase-js";
import { Database } from "@utils/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("missing Supabase config.");
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
);
