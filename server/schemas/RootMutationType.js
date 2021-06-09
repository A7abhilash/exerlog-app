const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInputObjectType,
} = require("graphql");
const Exercises = require("../models/Exercises");
const Logs = require("../models/Logs");
const Users = require("../models/Users");
const EachLogType = require("./EachLog");
const ExerciseType = require("./ExerciseType");
const LogType = require("./LogType");
const UserType = require("./UserType");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addNewExercise: {
      type: ExerciseType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        let exercise = new Exercises({
          name: args.name,
          userId: args.userId,
          workouts: [],
        });
        return await exercise.save();
      },
    },
    updateExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        workouts: { type: GraphQLList(GraphQLString) },
      },
      resolve: async (parent, args) => {
        console.log(args);
        let exercise = {
          id: args.id,
          name: args.name,
          workouts: args.workouts,
        };
        await Exercises.findByIdAndUpdate(args.id, exercise);
        return exercise;
      },
    },
    deleteExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        await Exercises.findByIdAndDelete(args.id);
        return { id: args.id };
      },
    },
    addNewLog: {
      type: LogType,
      args: {
        date: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        const { date, userId } = args;
        let log = await Logs({
          date,
          userId,
          logs: [],
        });
        return await log.save();
      },
    },
    updateLog: {
      type: LogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        logs: {
          type: EachLogType,
        },
      },
      resolve: async (parent, args) => {
        const { id, logs } = args;
        let log = await Logs.findById(id);
        log.logs = logs;
        return await log.updateOne();
      },
    },
    deleteLog: {
      type: LogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        await Logs.findByIdAndDelete(args.id);
        return { id: args.id };
      },
    },
  }),
});

module.exports = RootMutationType;
