// MUI Components
import { Button, Paper, Stack, Typography } from "@mui/material";

// Types
import { RecycLensPage } from "@utils/types/common";

const Welcome: RecycLensPage = () => {
  return (
    <Stack>
      <Paper
        className="h-60 bg-[url('/images/welcome-light.png')] bg-cover bg-bottom p-4
          dark:bg-[url('/images/welcome-dark.png')]"
      >
        <Stack>
          <Typography variant="h1">RecycLens</Typography>
          <Typography variant="subtitle1">Recyling. Localized.</Typography>
        </Stack>
      </Paper>
      <Paper className="rounded-none bg-light-background p-4 dark:bg-dark-background">
        <Stack className="mb-6">
          <Typography variant="h2">Point. Tap. Know.</Typography>
          <Typography variant="body1">
            Use your camera to learn more about where your trash belongs.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained">Scan</Button>
        </Stack>
      </Paper>
      <Paper className="rounded-none p-4">
        <Stack className="mb-6">
          <Typography variant="h2">Recycling for your area.</Typography>
          <Typography variant="body1">
            We localized guides on recycling just for the city you’re in. Learn
            and follow your local regulations.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained">Search</Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Welcome;

