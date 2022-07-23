// External libraries
import React, { useState } from "react";
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

// Types
import { RecycLensPage } from "@utils/types/common";

// Dummybase
const categories = [
  {
    id: 1,
    name: "Aluminium Foil",
    color: "071776",
    reuse: false,
  },
  {
    id: 2,
    name: "Biological",
    color: "13841A",
    reuse: false,
  },
  {
    id: 3,
    name: "Book",
    color: "EAC61A",
    reuse: true,
  },
];

// Page
const LocalGuides: RecycLensPage = () => {
  const [location, setLocation] = useState(10);

  return (
    <Stack>
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
            <MenuItem value={10}>Bangkok, Thailand</MenuItem>
            <MenuItem value={20}>Singapore, Singapore</MenuItem>
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
      <Stack spacing={2} className="p-4">
        <Typography variant="h2">By Category</Typography>

        <Stack divider={<Divider />}>
          {categories.map((category) => (
            <ButtonBase key={category.id} className="block py-2">
              <Link href={`/local-guides/category/${category.id}/th-bkk`}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1">{category.name}</Typography>
                    <div
                      className="border-text-primary h-4 w-4 rounded-full border-2
                        dark:border-solid"
                      style={{ backgroundColor: `#${category.color}` }}
                    />
                  </Stack>
                  <MaterialSymbol icon="arrow_forward" />
                </Stack>
              </Link>
            </ButtonBase>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

LocalGuides.appBar = { title: "Local guides", backGoesTo: "/" };

export default LocalGuides;
