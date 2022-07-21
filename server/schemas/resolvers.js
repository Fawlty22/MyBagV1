const {  User, Disc } = require("../models");


const resolvers = {
  Query: {
    user: async (parent, { email }, context) => {
          return User.findOne({ email: email })
            .select("-__v")
            .populate("discs");
      },
  }
};

module.exports = resolvers;
