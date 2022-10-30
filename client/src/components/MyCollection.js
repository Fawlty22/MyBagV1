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
import { useMutation } from "@apollo/client";
import { TOGGLEINBAG_MUTATION, REMOVEDISC_MUTATION } from "../graphql/mutations";
import { ThemeProvider } from "@mui/material/styles";
import {theme} from '../utils/theme'


export default function MyCollection({ userDataState, setUserDataState }) {

  const [toggleInBag, { toggleError, toggleData }] = useMutation(TOGGLEINBAG_MUTATION);
  const [removeDisc, { removeError, removeData }] = useMutation(REMOVEDISC_MUTATION);

  const handleBagToggle = async (e) => {
    e.preventDefault();
    try {
      const toggleMutationResponse = await toggleInBag({
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

  const handleDiscRemove = async (e) => {
    e.preventDefault();
    try {
      const removeMutationResponse = await removeDisc({
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
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {userDataState && userDataState.user.discs.map((card) => (
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
                  <CardContent className="disc-card-content" sx={{ flexGrow: 1, bgcolor: "primary.main", textAlign: "center" }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography variant="h6" component="h3">
                      {card.brand}
                    </Typography>
                    <Typography>Speed: {card.speed}</Typography>
                    <Typography>Glide: {card.glide}</Typography>
                    <Typography>Turn: {card.turn}</Typography>
                    <Typography>Fade: {card.fade}</Typography>
                  </CardContent>
                  <CardActions sx={{ flexGrow: 1, bgcolor: "background.dark" }}>
                    {/* this add to bag button will conditonally render based on the inBag property on the user object */}
                    {card.inBag ? <Button sx={{ bgcolor: "primary.light", color: "secondary.main" }} onClick={handleBagToggle} size="small">In Bag, Remove?</Button> : <Button sx={{ bgcolor: "primary.light", color: "secondary.main" }} onClick={handleBagToggle} size="small">Add To Bag</Button>}
                    <Button sx={{ bgcolor: "primary.light", color: "secondary.main" }} onClick={handleDiscRemove} size="small">Remove From Collection</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
