import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../graphql/queries";
import Auth from "../utils/auth";
import MyBag from "../components/MyBag";
import MyCollection from "../components/MyCollection";
import Header from "../components/Header";
import SearchPage from "../components/SearchPage";

export default function Dashboard() {
  //fetches the user profile
  let user = Auth.getProfile();
  const id = user.data._id
//sets active page in the state
  const [currentPage, setCurrentPage] = useState("MyCollection");
  //query for the user using the _id, uses this data to render out displays.
  const { data, error, loading } = useQuery(QUERY_USER, {
    variables: { _id: id },
  });

  console.log("data", data)
  
  //if not logged in, redirect to login page
  if (!user) {
    return <Redirect to={"/login"} />;
  }
//if loading...
  if (loading) {
    <h1>Loading Please Wait...</h1>;
  }

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "MyCollection" && <MyCollection />}
      {currentPage === "MyBag" && <MyBag />}
      {currentPage === "SearchPage" && <SearchPage />}
    </>
  );
}
