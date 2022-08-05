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

//dummy data, this will come from api in future
const cards = [
  {
    dataId: "62",
    speed: "13",
    glide: "6",
    turn: "-2",
    fade: "2",
    name: "Shryke",
    flightType: "Distance Drivers",
    brand: "Innova",
    flightPath: "https://mst12.inboundsdiscgolf.com/8018368.png",
  },
  {
    dataId: "67",
    speed: "13",
    glide: "5",
    turn: "-3",
    fade: "2",
    name: "Katana",
    flightType: "Distance Drivers",
    brand: "Innova",
    flightPath: "https://mst12.inboundsdiscgolf.com/8338610.png",
  },
  {
    dataId: "68",
    speed: "13",
    glide: "6",
    turn: "-3",
    fade: "2",
    name: "Daedalus",
    flightType: "Distance Drivers",
    brand: "Innova",
    flightPath: "https://mst12.inboundsdiscgolf.com/1331828.png",
  },
];

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

export default function MyBag() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
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
                  <CardContent sx={{ flexGrow: 1 }}>
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
                    <Button size="small">Add To Bag</Button>
                    <Button size="small">Remove From Collection</Button>
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
