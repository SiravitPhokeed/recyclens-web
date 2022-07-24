// External libraries
import { GetServerSideProps } from "next";

// Material UI Components
import { Paper, Stack, Typography } from "@mui/material";

// Backend
import { getCategoryDetails } from "@utils/backend/categories";

// Types
import { RecycLensPage } from "@utils/types/common";
import { CategoryDetails } from "@utils/types/categories";
import MaterialSymbol from "@components/MaterialSymbol";
import ReactMarkdown from "react-markdown";

// Components
const SummarySection = ({
  categoryDetails,
}: {
  categoryDetails: CategoryDetails;
}): JSX.Element => (
  <Stack direction="row" spacing={1} justifyContent="stretch" className="p-4">
    <Paper className="w-1/3 rounded-lg px-2 py-1">
      <Stack spacing={1} justifyContent="space-between" alignItems="center">
        <Typography component="span" alignSelf="flex-start" className="text-sm">
          Preparation
        </Typography>
        <MaterialSymbol icon="cleaning_bucket" size="extra-large" />
        <Typography component="span" className="font-medium">
          Empty+Clean
        </Typography>
      </Stack>
    </Paper>
    <Paper className="w-1/3 rounded-lg px-2 py-1">
      <Stack spacing={1} justifyContent="space-between" alignItems="center">
        <Typography component="span" alignSelf="flex-start" className="text-sm">
          Goes in
        </Typography>
        <div
          className="grid aspect-square h-16 place-content-center rounded-full"
          style={{ backgroundColor: categoryDetails.bin.hexColor }}
        >
          <MaterialSymbol icon="recycling" size="large" />
        </div>
        <Typography component="span" className="font-medium">
          Blue
        </Typography>
      </Stack>
    </Paper>
    <Paper className="w-1/3 rounded-lg px-2 py-1">
      <Stack spacing={1} justifyContent="space-between" alignItems="center">
        <Typography component="span" alignSelf="flex-start" className="text-sm">
          Set out as
        </Typography>
        <MaterialSymbol icon="circle" size="extra-large" />
        <Typography component="span" className="font-medium">
          Yellow
        </Typography>
      </Stack>
    </Paper>
  </Stack>
);

const PreparationSection = ({
  name,
  preparation,
}: {
  name: string;
  preparation: CategoryDetails["preparation"];
}): JSX.Element => (
  <Stack spacing={2} className="p-4" component="section">
    <Stack direction="row" spacing={1.5}>
      <MaterialSymbol
        icon="checklist"
        size="large"
        className="text-light-primary dark:text-dark-primary"
      />
      <Typography variant="h2">Preparation</Typography>
    </Stack>

    <Stack>
      <Typography>“{name}” must be prepared. Here’s how:</Typography>
      <ReactMarkdown className="markdown">{preparation.info}</ReactMarkdown>
    </Stack>

    {preparation.restrictions && (
      <Stack>
        <Typography>Before you proceed, do note the following:</Typography>
        <ReactMarkdown className="markdown">
          {preparation.restrictions}
        </ReactMarkdown>
      </Stack>
    )}
  </Stack>
);

// Page
const CategoryGuide: RecycLensPage<{ categoryDetails: CategoryDetails }> = ({
  categoryDetails,
}) => {
  return (
    <Stack>
      <Stack className="p-4">
        <Typography variant="h1">{categoryDetails.name}</Typography>
        <Typography variant="subtitle1">Recognized type</Typography>
      </Stack>
      {/* <SummarySection categoryDetails={categoryDetails} /> */}
      <PreparationSection
        name={categoryDetails.name}
        preparation={categoryDetails.preparation}
      />
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
  title: "Details",
  backGoesTo: "/local-guides",
};

export default CategoryGuide;
