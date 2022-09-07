import React from "react";
import { useState, useMemo } from "react";
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
  const [userDataState, setUserDataState] = useState({});
  //query for the user using the _id, uses this data to render out displays.
  const { data, error, loading } = useQuery(QUERY_USER, {
    variables: { _id: id },
  });

  useMemo(()=>{
    setUserDataState(data)
  }, [data])

  
  //if not logged in, redirect to login page
  if (!user) {
    return <Redirect to={"/login"} />;
  }

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "MyCollection" && <MyCollection userDataState={userDataState} setUserDataState={setUserDataState} />}
      {currentPage === "MyBag" && <MyBag userDataState={userDataState} setUserDataState={setUserDataState} />}
      {currentPage === "SearchPage" && <SearchPage userDataState={userDataState} setUserDataState={setUserDataState}/>}
    </>
  );
}
