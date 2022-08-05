import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      username
      email
      discs {
        brand
        name
        speed
        glide
        turn
        fade
        inBag
        flightPath
        flightType
      }
    }
  }
`;

