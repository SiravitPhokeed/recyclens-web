// External libraries
import { GetServerSideProps } from "next";

// Material UI Components
import { Paper, Stack, Typography } from "@mui/material";

// Backend
import { getCategoryDetails } from "@utils/backend/categories";

// Componetns
import Markdown from "@components/Markdown";
import MaterialSymbol from "@components/MaterialSymbol";

// Types
import { RecycLensPage } from "@utils/types/common";
import { CategoryDetails } from "@utils/types/categories";

// Helpers
import { formatSupabaseTime } from "@utils/helpers/datetime";

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
      <Markdown>{preparation.info}</Markdown>
    </Stack>

    {preparation.restrictions && (
      <Stack>
        <Typography>Before you proceed, do note the following:</Typography>
        <Markdown>{preparation.restrictions}</Markdown>
      </Stack>
    )}
  </Stack>
);

const BinSection = ({
  city,
  bin,
}: {
  city: string;
  bin: CategoryDetails["bin"];
}): JSX.Element => (
  <Stack spacing={2} className="p-4" component="section">
    <Stack direction="row" spacing={1.5}>
      <MaterialSymbol
        icon="delete"
        size="large"
        className="text-light-primary dark:text-dark-primary"
      />
      <Typography variant="h2">Garbage bin</Typography>
    </Stack>

    <Typography>
      For smaller numbers, use the <strong>{bin.name}</strong>. In {city}, the
      bin is{" "}
      <strong>
        colored{" "}
        <span
          className="inline-block h-4 w-4 rounded-full
            dark:border-2 dark:border-solid dark:border-dark-text-primary"
          style={{ backgroundColor: bin.hexColor }}
        />
      </strong>
      {bin.localName ? (
        <>
          {" "}
          and <strong>labelled “{bin.localName}.”</strong>
        </>
      ) : (
        "."
      )}
    </Typography>
  </Stack>
);

const CollectionSection = ({
  name,
  collection,
}: {
  name: string;
  collection: CategoryDetails["collection"];
}): JSX.Element => (
  <Stack spacing={2} className="p-4" component="section">
    <Stack direction="row" spacing={1.5}>
      <MaterialSymbol
        icon="local_shipping"
        size="large"
        className="text-light-primary dark:text-dark-primary"
      />
      <Typography variant="h2">Collection info</Typography>
    </Stack>

    {(collection.binInfo || collection.categoryInfo) && (
      <Stack>
        {collection.binInfo && (
          <>
            <Typography>
              “{name}” can be place for collection at a collection point,
              together with other trash of the same bin type. Here’s how:
            </Typography>
            <Markdown>{collection.binInfo}</Markdown>
          </>
        )}
        {collection.categoryInfo && (
          <Markdown>{collection.categoryInfo}</Markdown>
        )}
      </Stack>
    )}

    {collection.times?.start && collection.times?.end && (
      <Typography>
        Set out bags at{" "}
        <strong>
          {formatSupabaseTime(collection.times.start)}-
          {formatSupabaseTime(collection.times.end)}
        </strong>
        .{" "}
        {collection.times?.lastTruck && (
          <>
            Last truck leaves at{" "}
            {formatSupabaseTime(collection.times.lastTruck)}.
          </>
        )}
      </Typography>
    )}
  </Stack>
);

const DonationSection = ({
  name,
  donate,
}: {
  name: string;
  donate: CategoryDetails["donate"];
}): JSX.Element => (
  <Stack spacing={2} className="p-4" component="section">
    <Stack direction="row" spacing={1.5}>
      <MaterialSymbol
        icon="volunteer_activism"
        size="large"
        className="text-light-primary dark:text-dark-primary"
      />
      <Typography variant="h2">Donation guide</Typography>
    </Stack>

    {donate.info ? (
      <Stack>
        <Typography>
          We have curated organizations accepting donations for “{name}” down
          below. Check them out:
        </Typography>
        <Markdown>{donate.info}</Markdown>
      </Stack>
    ) : (
      <Typography>
        It is highly recommended that you donate “{name}.”
      </Typography>
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
      </Stack>
      {/* <SummarySection categoryDetails={categoryDetails} /> */}
      <PreparationSection
        name={categoryDetails.name}
        preparation={categoryDetails.preparation}
      />
      <BinSection city={categoryDetails.regionCity} bin={categoryDetails.bin} />
      {categoryDetails.collection.allowCollect && (
        <CollectionSection
          name={categoryDetails.name}
          collection={categoryDetails.collection}
        />
      )}
      {categoryDetails.donate.canDonate && (
        <DonationSection
          name={categoryDetails.name}
          donate={categoryDetails.donate}
        />
      )}
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
