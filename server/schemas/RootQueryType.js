const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const Users = require("../models/Users");
const ExerciseType = require("./ExerciseType");
const UserType = require("./UserType");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        let { _id, displayName, image } = await Users.findById(args.id);
        // return users.find((user) => user.id === args.id);
        return { id: _id, name: displayName, profileImg: image };
      },
    },
  }),
});

module.exports = RootQueryType;
