import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import MyBag from "../components/MyBag";
import MyCollection from "../components/MyCollection";
import Header from "../components/Header";
import SearchPage from "../components/SearchPage";

export default function Dashboard() {
  let user = Auth.getProfile();
  console.log("user", user);
  const [currentPage, setCurrentPage] = useState("MyCollection");

  if (!user) {
    return <Redirect to={"/login"} />;
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
