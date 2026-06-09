import { neon } from "@neondatabase/serverless";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res
      .status(405)
      .json({ data: null, error: { message: "Method not allowed" } });
    return;
  }

  const { countryCode, modelCode } = req.query as {
    countryCode: string;
    modelCode: string;
  };

  const sql = neon(process.env.NEON_DATABASE_URL!);
  try {
    const rows = (await sql`
    SELECT c.id
    FROM categories c
    JOIN regions r ON c.region = r.id
    WHERE r.country_code = ${countryCode} AND c.model_code = ${modelCode}
    LIMIT 1;
  `) as { id: number }[];

    if (rows.length === 0) {
      res.status(404).json({ error: "No category found" });
      return;
    }

    const categoryID = rows[0].id;
    res.status(200).json({ data: categoryID, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: "Internal server error" });
  }
}
