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
import { AnimatePresence, motion } from "framer-motion";

const Layout = ({
  appBar,
  children,
}: {
  appBar: RecycLensPage["appBar"];
  children: ReactNode;
}): JSX.Element => {
  const router = useRouter();

  return (
    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <div className="pb-14">
        {/* App bar */}
        <AppBar position="fixed">
          <Toolbar>
            {appBar?.backGoesTo ? (
              <IconButton
                LinkComponent={Link}
                href={appBar.backGoesTo}
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <MaterialSymbol icon="arrow_back" />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <MaterialSymbol icon="menu" />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {appBar?.title || "RecycLens"}
            </Typography>
            {router.asPath != "/scan" && (
              <IconButton
                LinkComponent={Link}
                href="/scan"
                size="large"
                edge="start"
                color="inherit"
              >
                <MaterialSymbol icon="photo_camera" />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Toolbar />

        {/* Content */}
        <motion.div
          key={router.asPath}
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          exit={{ y: -10 }}
        >
          {children}
        </motion.div>

        {/* Navigation */}
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
    </AnimatePresence>
  );
};

export default Layout;
