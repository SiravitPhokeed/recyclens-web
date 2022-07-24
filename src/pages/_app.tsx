// External libraries
import { CacheProvider, EmotionCache } from "@emotion/react";
import type { AppProps } from "next/app";
import { useMemo } from "react";

// Material UI
import { createTheme, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeOptions, ThemeProvider } from "@mui/material/styles";

// Components
import Layout from "@components/Layout";

// Fonts
import "@fontsource/grandstander/300.css";
import "@fontsource/grandstander/400.css";
import "@fontsource/grandstander/500.css";
import "@fontsource/grandstander/700.css";
import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/700.css";
import "@fontsource/sarabun/300.css";
import "@fontsource/sarabun/400.css";
import "@fontsource/sarabun/500.css";
import "@fontsource/sarabun/700.css";

// Stylesheets
import "../styles/globals.css";

// Types
import { RecycLensPage } from "@utils/types/common";

// Utils
import createEmotionCache from "@utils/emotion";
import getDesignTokens from "@utils/theme";
import { MotionConfig } from "framer-motion";

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
        getDesignTokens(prefersDarkMode ? "dark" : "light") as ThemeOptions
      ),
    [prefersDarkMode]
  );

  return (
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
  );
}

export default App;
