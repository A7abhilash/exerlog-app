const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const ExerciseType = require("./ExerciseType");
const Exercises = require("../models/Exercises");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    profileImg: {
      type: GraphQLString,
    },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve: async (parent, args) => {
        let exercises = await Exercises.find({ userId: parent.id });
        return exercises;
      },
    },
  }),
});

module.exports = UserType;
