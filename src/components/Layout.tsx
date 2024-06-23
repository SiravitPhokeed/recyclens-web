import MaterialSymbol from "@components/MaterialSymbol";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { RecycLensPage } from "@utils/types/common";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const Layout = ({
  appBar,
  children,
}: {
  appBar: RecycLensPage["appBar"];
  children: ReactNode;
}): JSX.Element => {
  const router = useRouter();

  const navItems: { href: string; label: string; icon: JSX.Element }[] = [
    {
      href: "/",
      label: "Home",
      icon: <MaterialSymbol icon="home" />,
    },
    {
      href: "/scan",
      label: "Scan",
      icon: <MaterialSymbol icon="photo_camera" />,
    },
    {
      href: "/local-guides",
      label: "Search",
      icon: <MaterialSymbol icon="search" />,
    },
  ];

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <div className="pb-14">
        {/* App bar */}
        <AppBar position="fixed">
          <Toolbar>
            {appBar?.backGoesTo && (
              <IconButton
                LinkComponent={Link}
                href={appBar.backGoesTo}
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <MaterialSymbol icon="arrow_back" />
              </IconButton>
            )}
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
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
          className="md:my-6 md:mx-auto md:max-w-xl md:overflow-hidden
            md:rounded-3xl"
        >
          {children}
        </motion.div>

        {/* Navigation */}
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={
              // Special case for Home since every page `href`s start with `/`
              router.pathname == "/"
                ? 0
                : // Find index in `navItems`
                  navItems
                    .slice(1) // Ignore Home
                    .findIndex((navItem) =>
                      router.pathname.startsWith(navItem.href),
                    ) + 1
            }
          >
            {navItems.map((navItem) => (
              <BottomNavigationAction
                key={navItem.label}
                label={navItem.label}
                icon={navItem.icon}
                LinkComponent={Link}
                href={navItem.href}
              />
            ))}
          </BottomNavigation>
        </Paper>
      </div>
    </AnimatePresence>
  );
};

export default Layout;
