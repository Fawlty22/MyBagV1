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
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        Fuck you
      </header>
    </div>
  );
}

export default App;
