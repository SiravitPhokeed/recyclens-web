// External libraries
import { GetServerSideProps } from "next";

// Material UI Components
import { Stack, Typography } from "@mui/material";

// Backend
import { getCategoryDetails } from "@utils/backend/categories";
import { getRegionID } from "@utils/backend/regions";

// Types
import { RecycLensPage } from "@utils/types/common";
import { CategoryDetails } from "@utils/types/categories";

// Page
const CategoryGuide: RecycLensPage<{ categoryDetails: CategoryDetails }> = ({
  categoryDetails,
}) => {
  return (
    <Stack>
      <Stack className="p-4">
        <Typography variant="body1">
          {JSON.stringify(categoryDetails)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.categoryID) return { notFound: true, props: {} };

  const { data: categoryDetails } = await getCategoryDetails(
    Number(params.categoryID)
  );

  return {
    props: { categoryDetails },
  };
};

CategoryGuide.appBar = {
  title: "Category Details",
  backGoesTo: "/local-guides",
};

export default CategoryGuide;
