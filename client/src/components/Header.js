import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import {theme} from '../utils/theme'
export default function Header({currentPage, setCurrentPage}) {
  

  return (
   <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
          sx={{
            bgcolor: "background.dark",
            pt: 2,
            pb: 4
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{fontFamily: 'Fredoka One'}}
            >
              MyDiscs
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{fontFamily: 'Fredoka One'}}
            >
              Use the buttons below to switch between your collection and your
              bag! Keep track of all of those pesky circles!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" color={currentPage == "MyBag" ? "secondary" : "primary"} onClick={()=> setCurrentPage("MyBag")} sx={{fontFamily: 'Fredoka One'}}>
                My Bag
              </Button>
              <Button variant="contained" color={currentPage == "MyCollection" ? "secondary" : "primary"} onClick={()=> setCurrentPage("MyCollection")} sx={{fontFamily: 'Fredoka One'}}>
                My Collection
              </Button>
              <Button variant="contained" color={currentPage == "SearchPage" ? "secondary" : "primary"} onClick={()=> setCurrentPage("SearchPage")} sx={{fontFamily: 'Fredoka One'}}>
                Search
              </Button>
            </Stack>
          </Container>
        </Box>
   </ThemeProvider>
    
  )
}
