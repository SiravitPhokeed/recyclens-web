// External libraries
import React, { useState } from "react";

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
} from "@mui/material";

// Types
import { RecycLensPage } from "@utils/types/common";
import MaterialSymbol from "@components/MaterialSymbol";

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
          <InputLabel id="location-select-label">
            <Typography className="bg-light-background dark:bg-dark-background">
              Location
            </Typography>
          </InputLabel>
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
        />
      </Stack>
      <Stack spacing={2} className="p-4">
        <Typography variant="h2">By Category</Typography>
        <Stack>
          <Typography></Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

LocalGuides.appBar = { title: "Local guides", backGoesTo: "/" };

export default LocalGuides;
