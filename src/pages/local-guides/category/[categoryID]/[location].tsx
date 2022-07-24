// External libraries
import { GetServerSideProps } from "next";

// Material UI Components
import { Stack } from "@mui/material";

// Types
import { RecycLensPage } from "@utils/types/common";

// Page
const CategoryGuide: RecycLensPage = () => {
  return (
    <Stack>
      <Stack className="p-4"></Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {},
  };
};

CategoryGuide.appBar = {
  title: "Category Details",
  backGoesTo: "/local-guides",
};

export default CategoryGuide;
