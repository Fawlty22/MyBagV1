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
  let user = Auth.getProfile();
  console.log("user", user);
  const [currentPage, setCurrentPage] = useState("MyCollection");
  const { data, error, loading } = useQuery(QUERY_USER);
  
  if (!user) {
    return <Redirect to={"/login"} />;
  }

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
