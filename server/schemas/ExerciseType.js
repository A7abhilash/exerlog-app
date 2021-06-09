const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const ExerciseType = new GraphQLObjectType({
  name: "Exercise",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    userId: {
      type: GraphQLString,
    },
    workouts: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

module.exports = ExerciseType;
