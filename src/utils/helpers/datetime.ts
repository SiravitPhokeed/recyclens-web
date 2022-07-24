export function formatSupabaseTime(supabaseTime: string) {
  return new Date(`1980-01-01T${supabaseTime}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
}
