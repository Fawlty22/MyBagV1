// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    discs: [Disc]
  }

  type Disc {
    _id: ID
    brand: String
    name: String
    speed: String
    glide: String
    turn: String
    fade: String
    inBag: Boolean  
    flightPath: String
    flightType: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(email: String!): User
  }
  
  type Mutation {
    login(username: String!, password: String!): Auth

    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth

    addDisc(
    brand: String
    name: String
    speed: String
    glide: String
    turn: String
    fade: String
    inBag: Boolean  
    flightPath: String
    flightType: String
    ): User

    removeDisc(name: String): User

    toggleInBag(name: String): User
  }
`
//mutations still need to be added here

// export the typeDefs
module.exports = typeDefs;

