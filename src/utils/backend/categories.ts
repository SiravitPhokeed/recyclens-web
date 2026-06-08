import { neon } from "@neondatabase/serverless";
import { CategoryDetails } from "@utils/types/categories";
import { RecycLensBackendReturn } from "@utils/types/common";

export async function getCategoryDetails(
  categoryID: number,
): Promise<RecycLensBackendReturn<CategoryDetails>> {
  const sql = neon(process.env.NEON_DATABASE_URL!);
  try {
    const rows = (await sql`
      SELECT
        c.id, c.name, c.preparation, c.restrictions, c.should_repair, c.allow_collect, c.collect_info, c.donate_info, c.can_donate,
        r.city AS region_city,
        b.name AS bin_name, b.name_local AS bin_name_local, b.hex_color AS bin_hex_color, b.image AS bin_image,
        b.collect_start AS bin_collect_start, b.collect_end AS bin_collect_end, b.last_truck AS bin_last_truck
      FROM categories c
      JOIN regions r ON c.region = r.id
      JOIN bins b ON c.bin = b.id
      WHERE c.id = ${categoryID}
      LIMIT 1
    `) as {
      id: number;
      name: string;
      preparation: string;
      restrictions: string;
      should_repair: boolean;
      allow_collect: boolean;
      collect_info: string;
      donate_info: string;
      can_donate: boolean;
      region_city: string;
      bin_name: string;
      bin_name_local: string;
      bin_hex_color: string;
      bin_image: string;
      bin_collect_start: string;
      bin_collect_end: string;
      bin_last_truck: string;
    }[];

    if (rows.length === 0) {
      return { data: null, error: new Error("Category not found") };
    }

    const category = rows[0];

    const data: CategoryDetails = {
      id: category.id,
      name: category.name,
      regionCity: category.region_city,
      preparation: {
        info: category.preparation,
        restrictions: category.restrictions,
        shouldRepair: category.should_repair,
      },
      bin: {
        name: category.bin_name,
        localName: category.bin_name_local,
        hexColor: category.bin_hex_color,
        image: category.bin_image,
      },
      collection: {
        allowCollect: category.allow_collect,
        times: {
          start: category.bin_collect_start,
          end: category.bin_collect_end,
          lastTruck: category.bin_last_truck,
        },
        binInfo: category.collect_info,
        categoryInfo: category.collect_info,
      },
      donate: {
        canDonate: category.can_donate,
        info: category.donate_info,
      },
    };

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
