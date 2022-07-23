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

// Types
import { RecycLensPage } from "@utils/types/common";
import Link from "next/link";

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
          <IconButton href="/scan" size="large" edge="start" color="inherit">
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
          />
          <BottomNavigationAction
            label="Scan"
            icon={<MaterialSymbol icon="photo_camera" />}
          />
          <BottomNavigationAction
            label="Search"
            icon={<MaterialSymbol icon="search" />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default Layout;
