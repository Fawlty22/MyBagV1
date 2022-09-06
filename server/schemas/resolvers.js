const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const {  User, Disc } = require("../models");


const resolvers = {
  Query: {
    user: async (parent, { _id }, context) => {
          return User.findOne({ _id: _id })
            .select("-__v")
            .populate("discs");
      },
  },
  Mutation: {
    login: async (parent, { username, password }, context) => {
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
    addDisc: async (parent, args, context) => {
      const disc = await Disc.create(args)
      const userUpdate = await User.findByIdAndUpdate(
        { _id: context.user._id },
        {
          $push: {
            discs: disc
          },
        },
        { new: true }
      );
      return userUpdate;
    }, 
    removeDisc: async (parent, { name }, context) => {
      const userUpdate = await User.findByIdAndUpdate(
        { _id: context.user._id },
        {
          $pull: {
            discs: { name: name }
          },
        },
        { new: true }
      );
      return userUpdate;
    },
    toggleInBag: async (parent, { name }, context) => {
      const user = await User.findById(context.user._id)
      let discs = user.discs
      discs.forEach(disc => {
        if(disc.name == name){
          let value =disc.inBag
          disc.inBag = !value;
        }
      })
      const updatedUser = await User.findByIdAndUpdate(
        {_id: context.user._id},
        {$set: {discs: discs}},
        { new: true})
        return updatedUser;
    }
  }
};

module.exports = resolvers;
