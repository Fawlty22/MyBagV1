import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Auth from "../utils/auth"
import { ThemeProvider } from "@mui/material/styles";
import {theme} from '../utils/theme'


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{fontFamily: "Fredoka One"}}>
      {"Matthew Keys © "}
      <Link
        color="inherit"
        href="https://fawlty22.github.io/MJKPortfolio"
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
  const loggedIn = Auth.loggedIn();
  return (
    <ThemeProvider theme={theme}>
      <Box textAlign="center" sx={{ bgcolor: "background.dark", p: 2, }} component="footer">
        {loggedIn && <Button 
        variant="contained" 
        color={"secondary"} 
        sx={{fontFamily: 'Fredoka One', mb: 2}}
        onClick={() => Auth.logout()}>
          Logout
        </Button>}
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
            sx={{fontFamily: "Fredoka One"}}
          >
            Thanks for checking out the app!
          </Typography>
          <Copyright />
      </Box>
    </ThemeProvider>
  );
}
