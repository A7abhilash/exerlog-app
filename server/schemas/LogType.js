const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const EachLogType = require("./EachLog");

const LogType = new GraphQLObjectType({
  name: "Log",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    date: {
      type: GraphQLString,
    },
    userId: {
      type: GraphQLString,
    },
    logs: {
      type: new GraphQLList(EachLogType),
    },
  }),
});

module.exports = LogType;
