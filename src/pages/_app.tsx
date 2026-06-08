import Layout from "@components/Layout";
import { createTheme, useMediaQuery } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeOptions, ThemeProvider } from "@mui/material/styles";
import getDesignTokens from "@utils/theme";
import { RecycLensPage } from "@utils/types/common";
import { MotionConfig } from "framer-motion";
import type { AppProps } from "next/app";
import { Grandstander, Rubik, Sarabun } from "next/font/google";
import { useMemo } from "react";
import "../styles/globals.css";

// Fonts
const bodyFontEN = Rubik({ subsets: ["latin"] });
const bodyFontTH = Sarabun({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai"],
});
const displayFontEN = Grandstander({ subsets: ["latin"] });

function App(
  props: Omit<AppProps, "Component"> & { Component: RecycLensPage },
) {
  const { Component, pageProps } = props;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme(
        getDesignTokens(prefersDarkMode ? "dark" : "light") as ThemeOptions,
      ),
    [prefersDarkMode],
  );

  return (
    <>
      <MotionConfig reducedMotion="user">
        <AppCacheProvider {...props}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout appBar={Component.appBar}>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </AppCacheProvider>
      </MotionConfig>
      <style jsx global>{`
        :root {
          --font-body: -apple-system, BlinkMacSystemFont,
            ${bodyFontEN.style.fontFamily}, ${bodyFontTH.style.fontFamily};
          --font-display: ${displayFontEN.style.fontFamily},
            -apple-system-headline, BlinkMacSystemFont;
        }
      `}</style>
    </>
  );
}

export default App;
