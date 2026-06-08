export function formatNeonTime(neonTime: string) {
  return new Date(`1980-01-01T${neonTime}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
}
