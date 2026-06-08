import { neon } from "@neondatabase/serverless";
import { RecycLensBackendReturn } from "@utils/types/common";
import { Region } from "@utils/types/regions";

export async function getRegions(): Promise<RecycLensBackendReturn<Region[]>> {
  const sql = neon(process.env.NEON_DATABASE_URL!);
  try {
    const regions =
      (await sql`SELECT id, code, city, country FROM regions ORDER BY country`) as Region[];
    return { data: regions, error: null };
  } catch (error) {
    return { data: [], error: error as Error };
  }
}

export async function getRegionID(
  code: string,
): Promise<RecycLensBackendReturn<number>> {
  const sql = neon(process.env.NEON_DATABASE_URL!);
  try {
    const region =
      (await sql`SELECT id FROM regions WHERE code = ${code} LIMIT 1`) as {
        id: number;
      }[];
    return { data: region[0]?.id || 0, error: null };
  } catch (error) {
    return { data: 0, error: error as Error };
  }
}
