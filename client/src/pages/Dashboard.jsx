import React from "react";
import { useState } from "react";
import Auth from "../utils/auth"
import MyBag from "../components/MyBag";
import MyCollection from "../components/MyCollection"
import Header from "../components/Header";
import SearchPage from "../components/SearchPage"

export default function Dashboard() {
  
  const [currentPage, setCurrentPage] = useState("MyCollection");
  
  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      {currentPage === "MyCollection" && <MyCollection />}
      {currentPage === "MyBag" && <MyBag />}
      {currentPage === "SearchPage" && <SearchPage />}
    </>
  );
}
