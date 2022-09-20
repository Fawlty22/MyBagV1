import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function HeaderSmall() {
  
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

  return (
   <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
          sx={{
            bgcolor: "background.dark",
            pt: 2,
            pb: 2
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              sx={{fontFamily: 'Fredoka One'}}
            >
              <Link href="/login" style={{textDecoration: "none", color: "black"}}>
              MyDiscs</Link>
            </Typography>
          </Container>
        </Box>
   </ThemeProvider>
    
  )
}
