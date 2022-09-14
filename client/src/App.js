import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // v5
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StoreProvider } from "./utils/GlobalContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Switch>
            <Route exact path="/" render={()=> <Dashboard />} />
            <Route exact path="/login" render={()=> <Login />} />
            <Route exact path="/signup" render={()=> <Signup />} />
          </Switch>
        </StoreProvider>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
