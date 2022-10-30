import { createTheme, ThemeProvider } from "@mui/material/styles";


export const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#5EBEC4",
        light: "#7ECBCF",
      },
      secondary: {
        main: "#F92C85",
      },
      background: {
        default: "#FDF5DF",
        dark: "#C1C1C1",
      },
    },
  });