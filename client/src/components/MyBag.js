import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import { TOGGLEINBAG_MUTATION } from "../graphql/mutations";

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

export default function MyBag({ userDataState, setUserDataState }) {
  
  const [toggleInBag, { error, data }] = useMutation(TOGGLEINBAG_MUTATION);

  const handleBagToggle = async (e) => {
    e.preventDefault();
    try {
      const mutationResponse = await toggleInBag({
        variables: {
          name: e.target.parentElement.previousElementSibling.children[0].textContent,
        },
        if(error) {
          return error;
        },
      });
    } catch (e) {
      console.log("toggle mutation error", e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {userDataState &&
              userDataState.user.discs.map(
                (card) =>
                  card.inBag && (
                    <Grid item key={card.name} xs={12} sm={6} md={4}>
                      <Card
                        variant="outlined"
                        className="disc-card"
                        sx={{
                          height: "100%",
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
                          image={card.flightPath}
                          alt="random"
                        />
                        <CardContent sx={{ flexGrow: 1, }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {card.name}
                          </Typography>
                          <Typography variant="h6" component="h3">
                            {card.brand}
                          </Typography>
                          <Typography>Speed:{card.speed}</Typography>
                          <Typography>Glide:{card.glide}</Typography>
                          <Typography>Turn:{card.turn}</Typography>
                          <Typography>Fade:{card.fade}</Typography>
                        </CardContent>
                        <CardActions>
                          {/* this add to bag button will conditonally render based on the inBag property on the user object */}
                          <Button onClick={handleBagToggle} size="small">Remove From Bag</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )
              )}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
