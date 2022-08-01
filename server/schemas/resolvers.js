const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const {  User } = require("../models");


const resolvers = {
  Query: {
    user: async (parent, { email }, context) => {
          return User.findOne({ email: email })
            .select("-__v")
            .populate("discs");
      },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, args, context) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  }
};

module.exports = resolvers;
