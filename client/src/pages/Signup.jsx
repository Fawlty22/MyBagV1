import * as React from "react";
import { useState } from "react";
import { useStoreContext } from "../utils/GlobalContext";
import { UPDATE_USER } from "../utils/actions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import HeaderSmall from "../components/HeaderSmall";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { empty, useMutation } from "@apollo/client";
import { ADDUSER_MUTATION } from "../graphql/mutations";
import Auth from "../utils/auth";

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

export default function SignUp() {
  const [state, dispatch] = useStoreContext();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState(false);
  const [emptyLineError, setEmptyLineError] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [addUser, { data, loading, error }] = useMutation(ADDUSER_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //reset errors
    setSignupError(false);
    setEmptyLineError(false);
    setInvalidEmailError(false);

    //invalid email and empty field error triggers
    if (Object.values(formState).includes("")) {
      setEmptyLineError(true);
      return;
    } 
    if(!formState.email.match(/.+@.+\..+/)) {
      setInvalidEmailError(true);
      return;
    }
    //send signup mutation
    try {
      const signUpMutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      console.log("ADDUSER-signUpMutationresponse", signUpMutationResponse);
      const { token, user } = signUpMutationResponse.data.addUser;

      dispatch({
        type: UPDATE_USER,
        payload: { token: token, _id: user._id },
      });

      Auth.login(token);
    } catch (e) {
      setSignupError(true);
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderSmall />
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontFamily: "Fredoka One" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            {signupError && (
              <Typography
                variant="body2"
                color="secondary"
                sx={{ fontFamily: "Fredoka One", mt: 1 }}
              >
                That username or email is already in use. Please try another
                one!
              </Typography>
            )}
            {emptyLineError && (
              <Typography
                variant="body2"
                color="secondary"
                sx={{ fontFamily: "Fredoka One", mt: 1 }}
              >
                Please fill out every field!
              </Typography>
            )}
            {invalidEmailError && (
              <Typography
                variant="body2"
                color="secondary"
                sx={{ fontFamily: "Fredoka One", mt: 1 }}
              >
                Please enter a valid email address!
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontFamily: "Fredoka One" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ fontFamily: "Fredoka One" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
