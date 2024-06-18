import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/system/createTheme";

const BODY_FONT = "var(--font-body)";
const DISPLAY_FONT = "var(--font-display)";

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  typography: {
    fontFamily: BODY_FONT,
    h1: {
      fontSize: "3.5625rem",
      fontWeight: 400,
      fontFamily: DISPLAY_FONT,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 400,
      fontFamily: DISPLAY_FONT,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
      fontFamily: DISPLAY_FONT,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
      fontFamily: DISPLAY_FONT,
    },
    h5: {
      fontSize: "1.375rem",
      fontWeight: 400,
      fontFamily: DISPLAY_FONT,
    },
    h6: {
      fontSize: "1em",
      fontWeight: 500,
      fontFamily: DISPLAY_FONT,
    },
    subtitle1: {
      fontSize: "1.5rem",
      fontFamily: DISPLAY_FONT,
      color: mode === "light" ? "#486641" : "#7ABB6C",
    },
    button: {
      fontSize: "1rem",
      fontFamily: DISPLAY_FONT,
      textTransform: "none",
    },
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#486641",
            contrastText: "#FFFFFF",
          },
          secondary: {
            main: "#B4CBCC",
            contrastText: "#203435",
          },
          background: {
            default: "#FEFCF8",
            paper: "#F5F4EE",
          },
          text: {
            primary: "#1B1C1A",
            secondary: "#454842",
            helper: "#757872",
          },
        }
      : {
          primary: {
            main: "#7ABB6C",
            contrastText: "#1B3716",
          },
          secondary: {
            main: "#517E82",
            contrastText: "#FFFFFF",
          },
          background: {
            default: "#1B1C1A",
            paper: "#2C3229",
          },
          text: {
            primary: "#E4E2DE",
            secondary: "#C6C7C0",
            helper: "#8F918B",
          },
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "9999px",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: "9999px",
        },
      },
    },
  },
});

export default getDesignTokens;
