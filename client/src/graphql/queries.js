import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
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

