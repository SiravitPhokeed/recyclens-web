// External libraries
import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useState } from "react";

import { GetServerSideProps } from "next";
import Link from "next/link";

// MUI Components
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";

// Components
import MaterialSymbol from "@components/MaterialSymbol";

// Backend
import { getCategoriesForRegion } from "@utils/backend/categories";
import { getRegions } from "@utils/backend/regions";

// Types
import { CategoryListItem } from "@utils/types/categories";
import { RecycLensPage } from "@utils/types/common";
import { Region } from "@utils/types/regions";

// Page
const LocalGuides: RecycLensPage<{ regions: Region[] }> = ({ regions }) => {
  const [location, setLocation] = useState<number>(
    regions.length > 0 ? regions[0].id : 0
  );

  const [categories, setCategories] = useState<CategoryListItem[]>([]);

  useEffect(() => {
    async function fasCategories() {
      const { data, error } = await getCategoriesForRegion(location);
      if (error) return;
      setCategories(data);
    }
    fasCategories();
  }, [location]);

  return (
    <Stack className="overflow-x-hidden">
      {/* Introduction */}
      <Stack spacing={2} className="p-4">
        <Typography variant="body1">
          Search our database on all things trash in your area. Learn and follow
          your local regulations on everything from bins to bags. Find the right
          place to donate your unwanted items.
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            id="location-select"
            value={location}
            label="Location"
            onChange={(e) => setLocation(e.target.value as number)}
          >
            {regions.map((region) => (
              <MenuItem key={region.id} value={region.id}>
                {[region.city, region.country].join(", ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MaterialSymbol icon="search" />
              </InputAdornment>
            ),
          }}
          label="Search"
          variant="outlined"
          type="search"
        />
      </Stack>

      {/* By category */}
      <Stack spacing={2} className="p-4">
        <Typography variant="h2">By category</Typography>
        <Stack>
          <AnimatePresence exitBeforeEnter>
            {categories.map((category, idx) => (
              <motion.div
                key={[category.regionID, category.id].join("-")}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
              >
                {/* Category list item */}
                <ButtonBase className="block w-full py-2">
                  <Link
                    className="no-underline text-inherit"
                    href={`/local-guides/category/${category.id}`}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        {/* Label */}
                        <Typography variant="body1">{category.name}</Typography>

                        {/* Icons */}
                        <Stack direction="row" spacing={0.5}>
                          <div
                            className="border-text-primary h-4 w-4 rounded-full
                              border-2 dark:border-solid"
                            style={{ backgroundColor: category.binColor }}
                          />
                          {category.shouldRepair && (
                            <MaterialSymbol
                              icon="handyman"
                              size="small"
                              className="text-light-secondary-contrast-text
                                dark:text-dark-secondary-contrast-text"
                            />
                          )}
                          {category.canDonate && (
                            <MaterialSymbol
                              icon="volunteer_activism"
                              size="small"
                              className="text-light-secondary-contrast-text
                                dark:text-dark-secondary-contrast-text"
                            />
                          )}
                        </Stack>
                      </Stack>
                      <MaterialSymbol icon="arrow_forward" />
                    </Stack>
                  </Link>
                </ButtonBase>
                {idx < categories.length - 1 && <Divider />}
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: regions } = await getRegions();

  return {
    props: {
      regions,
    },
  };
};

LocalGuides.appBar = { title: "Local guides", backGoesTo: "/" };

export default LocalGuides;
