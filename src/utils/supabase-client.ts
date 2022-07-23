// Imports
import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabase configuration missing, check your .env.local file");
}

// Set token and session options
const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

// Create the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
