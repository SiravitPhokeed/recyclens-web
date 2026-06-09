import { neon } from "@neondatabase/serverless";
import type { CategoryListItem } from "@utils/types/categories";
import type { RecycLensBackendReturn } from "@utils/types/common";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecycLensBackendReturn<CategoryListItem[]>>,
) {
  if (req.method !== "GET") {
    res
      .status(405)
      .json({ data: null, error: { message: "Method not allowed" } });
    return;
  }

  const regionID = Number(req.query.regionID);
  if (isNaN(regionID)) {
    res
      .status(400)
      .json({ data: null, error: { message: "Invalid region ID" } });
    return;
  }

  const sql = neon(process.env.NEON_DATABASE_URL!);
  try {
    const rows = await sql`
      SELECT c.id, c.name, b.hex_color AS bin_color, c.should_repair, c.can_donate
      FROM categories c
      JOIN bins b ON c.bin = b.id
      WHERE c.region = ${regionID}
      ORDER BY c.name;
    `;

    const categories: CategoryListItem[] = rows.map((row) => ({
      id: row.id,
      name: row.name,
      regionID,
      binColor: row.bin_color,
      shouldRepair: row.should_repair,
      canDonate: row.can_donate,
    }));

    res.status(200).json({ data: categories, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ data: null, error: { message: "Internal server error" } });
  }
}
