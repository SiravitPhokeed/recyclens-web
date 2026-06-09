import { createEmotionCache } from "@mui/material-nextjs/v16-pagesRouter";

export const emotionCache = createEmotionCache({
  key: "css",
  enableCssLayer: true,
});
