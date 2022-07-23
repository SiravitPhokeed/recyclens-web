// Material UI
import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/system/createTheme";

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, Rubik",
    h1: {
      fontFamily: "Grandstander, -apple-system-headline, BlinkMacSystemFont",
    },
    h2: {
      fontFamily: "Grandstander, -apple-system-headline, BlinkMacSystemFont",
    },
    h3: {
      fontFamily: "Grandstander, -apple-system-headline, BlinkMacSystemFont",
    },
    h4: {
      fontFamily: "Grandstander, -apple-system-headline, BlinkMacSystemFont",
    },
    h5: {
      fontFamily: "Grandstander, -apple-system-headline, BlinkMacSystemFont",
    },
    h6: {
      fontFamily: "Grandstander, -apple-system-headline, BlinkMacSystemFont",
    },
    button: {
      fontSize: "1rem",
      fontFamily: "Grandstander, -apple-system, BlinkMacSystemFont",
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
            paper: "#FEFCF8",
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
