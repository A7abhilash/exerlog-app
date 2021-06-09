const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const EachLogType = new GraphQLObjectType({
  name: "EachLog",
  fields: () => ({
    exerciseName: {
      type: GraphQLString,
    },
    workoutName: {
      type: GraphQLString,
    },
  }),
});

module.exports = EachLogType;
