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
import { useMutation } from "@apollo/client";
import { ADDDISC_MUTATION, REMOVEDISC_MUTATION } from "../graphql/mutations";

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

export default function SearchPage({ userDataState, setUserDataState }) {
  const [discSearchState, setDiscSearchState] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [responseError, setResponseError] = useState(false);

  const [searchResponse, setSearchResponse] = useState();
  const [addDisc, { addError, toggleData }] = useMutation(ADDDISC_MUTATION);
  const [removeDisc, { removeError, removeData }] =
    useMutation(REMOVEDISC_MUTATION);

  function handleChange(e) {
    setDiscSearchState(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setResponseError(false);
    setLoadingResponse(true);
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
        console.log("mutationres", response);
        response.length > 0
          ? setSearchResponse(response)
          : setResponseError(true);
        setLoadingResponse(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDiscRemove = async (e) => {
    e.preventDefault();
    try {
      const removeMutationResponse = await removeDisc({
        variables: {
          name: e.target.parentElement.previousElementSibling.children[0]
            .textContent,
        },
        if(error) {
          return error;
        },
      });
    } catch (e) {
      console.log("remove mutation error", e);
    }
  };

  const handleDiscAdd = async (e) => {
    e.preventDefault();

    try {
      const addMutationResponse = await addDisc({
        variables: {
          brand: searchResponse[0].brand,
          name: searchResponse[0].name,
          speed: searchResponse[0].speed,
          glide: searchResponse[0].glide,
          turn: searchResponse[0].turn,
          fade: searchResponse[0].fade,
          inBag: false,
          flightPath: searchResponse[0].flightPath,
          flightType: searchResponse[0].flightType,
        },
        if(error) {
          return error;
        },
      });
    } catch (e) {
      console.log("add mutation error", e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          textalign="center"
          component="form"
          onSubmit={handleSearch}
          sx={{
            "& > :not(style)": { m: 2, width: "35ch" },
            display: "flex",
            justifyContent: "center",
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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSearch}
            sx={{ fontFamily: "Fredoka One" }}
          >
            {loadingResponse ? "Loading..." : "Search"}
          </Button>
        </Box>
        <Box
          textalign="center"
          sx={{
            "& > :not(style)": { m: 2, width: "35ch" },
            display: "flex",
            justifyContent: "center",
            width: "100%"
          }}
        >
          {responseError && (
            <Typography variant="contained" color="secondary">
              Sorry! We couldn't find that disc. Please try again.
            </Typography>
          )}
        </Box>

        {searchResponse && (
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid
              container
              spacing={4}
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Grid
                item
                key={searchResponse[0].name}
                xs={12}
                sm={6}
                md={4}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
                  <CardContent
                    className="disc-card-content"
                    sx={{
                      flexGrow: 1,
                      bgcolor: "primary.main",
                      textAlign: "center",
                    }}
                  >
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
                  <CardActions
                    sx={{
                      flexGrow: 1,
                      bgcolor: "background.dark",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {/* this add to bag button will conditonally render based on the inBag property on the user object */}
                    {userDataState.user.discs.some(
                      (e) => e.name === searchResponse[0].name
                    ) ? (
                      <Button
                        sx={{
                          bgcolor: "primary.light",
                          color: "secondary.main",
                          fontFamily: "Fredoka One"
                        }}
                        onClick={handleDiscRemove}
                        size="small"
                      >
                        Remove from Collection
                      </Button>
                    ) : (
                      <Button
                        sx={{
                          bgcolor: "primary.light",
                          color: "secondary.main",
                          fontFamily: "Fredoka One",
                        }}
                        onClick={handleDiscAdd}
                        size="small"
                      >
                        Add to Collection
                      </Button>
                    )}
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
