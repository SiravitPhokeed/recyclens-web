// External libraries
import { useRouter } from "next/router";
import { ReactNode } from "react";

// Material UI
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

// Components
import MaterialSymbol from "@components/MaterialSymbol";
import Link from "@components/Link";

// Types
import { RecycLensPage } from "@utils/types/common";

const Layout = ({
  appBar,
  children,
}: {
  appBar: RecycLensPage["appBar"];
  children: ReactNode;
}): JSX.Element => {
  const router = useRouter();

  return (
    <div className="pb-14">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MaterialSymbol icon="menu" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {appBar?.title || "RecycLens"}
          </Typography>
          <IconButton
            LinkComponent={Link}
            href="/scan"
            size="large"
            edge="start"
            color="inherit"
          >
            <MaterialSymbol icon="photo_camera" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {children}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels value={router.pathname}>
          <BottomNavigationAction
            label="Home"
            icon={<MaterialSymbol icon="home" />}
            LinkComponent={Link}
            href="/"
          />
          <BottomNavigationAction
            label="Scan"
            icon={<MaterialSymbol icon="photo_camera" />}
            LinkComponent={Link}
            href="/scan"
          />
          <BottomNavigationAction
            label="Search"
            icon={<MaterialSymbol icon="search" />}
            LinkComponent={Link}
            href="/local-guides"
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default Layout;
