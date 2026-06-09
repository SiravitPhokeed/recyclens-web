import Layout from "@components/Layout";
import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  type ThemeOptions,
} from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v16-pagesRouter";
import GlobalStyles from "@mui/material/GlobalStyles";
import { emotionCache } from "@utils/emotion";
import getDesignTokens from "@utils/theme";
import { RecycLensPage } from "@utils/types/common";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfig } from "motion/react";
import type { AppProps } from "next/app";
import { Grandstander, Rubik, Sarabun } from "next/font/google";
import { useEffect, useMemo } from "react";
import "../styles/globals.css";

// Fonts
const bodyFontEN = Rubik({ subsets: ["latin"] });
const bodyFontTH = Sarabun({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai"],
});
const displayFontEN = Grandstander({ subsets: ["latin"] });

function App({
  Component,
  pageProps,
}: Omit<AppProps, "Component"> & { Component: RecycLensPage }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme(
        getDesignTokens(prefersDarkMode ? "dark" : "light") as ThemeOptions,
      ),
    [prefersDarkMode],
  );

  useEffect(() => {
    (async () => {
      const countryCode = localStorage.getItem("countryCode");
      if (countryCode) return;
      const response = await fetch("https://api.country.is/");
      const { country: ipCountry } = (await response.json()) as {
        country: string;
      };
      localStorage.setItem("countryCode", ipCountry);
    })();
  }, []);

  return (
    <>
      <MotionConfig reducedMotion="user">
        <AppCacheProvider emotionCache={emotionCache}>
          <ThemeProvider theme={theme}>
            <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
            <Layout appBar={Component.appBar}>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </AppCacheProvider>
      </MotionConfig>
      <Analytics />
      <style>{`
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
