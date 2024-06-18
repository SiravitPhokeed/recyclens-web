// External libraries
import { CacheProvider, EmotionCache } from "@emotion/react";
import type { AppProps } from "next/app";
import { Grandstander, Rubik, Sarabun } from "next/font/google";
import { useMemo } from "react";

// Material UI
import { createTheme, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeOptions, ThemeProvider } from "@mui/material/styles";

// Components
import Layout from "@components/Layout";

// Stylesheets
import "../styles/globals.css";

// Types
import { RecycLensPage } from "@utils/types/common";

// Utils
import createEmotionCache from "@utils/emotion";
import getDesignTokens from "@utils/theme";
import { MotionConfig } from "framer-motion";

// Fonts
const bodyFontEN = Rubik({ subsets: ["latin"] });
const bodyFontTH = Sarabun({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai"],
});
const displayFontEN = Grandstander({ subsets: ["latin"] });

const clientSideEmotionCache = createEmotionCache();

function App({
  Component,
  emotionCache,
  pageProps,
}: Omit<AppProps, "Component"> & {
  Component: RecycLensPage;
  emotionCache: EmotionCache;
}) {
  emotionCache = clientSideEmotionCache;
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
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout appBar={Component.appBar}>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
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
