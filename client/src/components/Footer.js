import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
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

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{fontFamily: "Fredoka One"}}>
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://fawlty22.github.io/MatthewKeys-Portfolio"
        target="_blank"
        sx={{fontFamily: "Fredoka One"}}
      >
        My Portfolio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.dark", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom
        sx={{fontFamily: "Fredoka One"}}>
          Thanks for checking out the app!
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
          sx={{fontFamily: "Fredoka One"}}
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}
