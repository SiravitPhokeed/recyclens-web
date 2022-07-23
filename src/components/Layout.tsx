// External libraries
import { useRouter } from "next/router";
import { ReactNode } from "react";

// Material UI
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

// Components
import MaterialSymbol from "@components/MaterialSymbol";

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const router = useRouter();

  return (
    <div className="pb-14">
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
