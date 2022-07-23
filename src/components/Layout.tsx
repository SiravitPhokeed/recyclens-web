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

const Layout = ({
  title,
  children,
}: {
  title: string;
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
            {title || "RecycLens"}
          </Typography>
          <IconButton size="large" edge="start" color="inherit">
            <MaterialSymbol icon="more_vert" />
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
            label="Recents"
            icon={<MaterialSymbol icon="restore" />}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<MaterialSymbol icon="favorite" />}
          />
          <BottomNavigationAction
            label="Nearby"
            icon={<MaterialSymbol icon="pin_drop" />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default Layout;
