import React from 'react'
import { useMutation } from "@apollo/client";
import { Link, Redirect } from "react-router-dom";
import { LOGIN_MUTATION } from "../graphql/mutations";
import Auth from "../utils/auth";
import { useStoreContext } from "../utils/GlobalContext";


export default function Login() {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          username: formState.username,
          password: formState.password,
        },
      });
      const { token, employee } = mutationResponse.data.login;
      console.log(token, "line 20 login");
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: { token: token, _id: employee._id },
      });
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };


    return (
      < > 
      </>
    )
  }
  