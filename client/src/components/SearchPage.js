import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { TextField } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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

export default function SearchPage() {
  const [discSearchState, setDiscSearchState] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [searchResponse, setSearchResponse] = useState();

  function handleChange(e) {
    setDiscSearchState(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b0bf5b0bb7msh14df33311bba67fp159845jsn5f1a3a4d0478",
        "X-RapidAPI-Host": "disc-golf.p.rapidapi.com",
      },
    };

    fetch(
      `https://disc-golf.p.rapidapi.com/disc-name/${discSearchState}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setSearchResponse(response);
      })
      .catch((err) => console.error(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          textalign="center"
          component="form"
          sx={{
            "& > :not(style)": { m: 2, width: "35ch" },
            display: "flex",
            justifyContent: "center"
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="searchBar"
            label="Search for a disc!"
            value={discSearchState}
            onChange={handleChange}
          />
          <Button variant="contained" color="secondary" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {searchResponse && (
          <Container sx={{ py: 8}} maxWidth="md">
            <Grid container spacing={4} sx={{width: "100%", display: "flex", justifyContent: "center"}}>
              <Grid item key={searchResponse[0].name} xs={12} sm={6} md={4} sx={{width: "100%", display: "flex", justifyContent: "center"}}>
                <Card
                  variant="outlined"
                  className="disc-card"
                  sx={{
                    height: "100%%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "5%",
                    }}
                    image={searchResponse[0].flightPath}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}> 
                    <Typography gutterBottom variant="h5" component="h2">
                      {searchResponse[0].name}
                    </Typography>
                    <Typography variant="h6" component="h3">
                      {searchResponse[0].brand}
                    </Typography>
                    <Typography>Speed:{searchResponse[0].speed}</Typography>
                    <Typography>Glide:{searchResponse[0].glide}</Typography>
                    <Typography>Turn:{searchResponse[0].turn}</Typography>
                    <Typography>Fade:{searchResponse[0].fade}</Typography>
                  </CardContent>
                  <CardActions>
                    {/* this add to bag button will conditonally render based on the inBag property on the user object */}
                    <Button size="small">Remove From Bag</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        )}
      </main>
    </ThemeProvider>
  );
}
