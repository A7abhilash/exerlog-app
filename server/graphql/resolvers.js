const Exercises = require("../models/Exercises");
const Logs = require("../models/Logs");
const Users = require("../models/Users");

const resolvers = {
  user: async (parent, args) => {
    // let { id, name, profileImg } = usersList.find(
    //   (item) => item.id === parent.id
    // );
    // let exercises = exercisesList.filter((item) => item.userId === parent.id);
    // return { id, name, profileImg, exercises };
    let { _id, displayName, image } = await Users.findById(parent.id);
    let exercises = await Exercises.find({ userId: parent.id });
    let logs = await Logs.find({ userId: parent.id });
    return { id: _id, name: displayName, profileImg: image, exercises, logs };
  },
  addNewExercise: async (parent, args) => {
    // let exercise = {
    //   userId: "2",
    //   name: parent.input.name,
    //   workouts: [],
    // };
    // exercisesList.push(exercise);
    // return exercise;
    let exercise = new Exercises({
      name: parent.input.name,
      userId: parent.input.userId,
      workouts: [],
    });
    return await exercise.save();
  },
  updateExercise: async (parent, args) => {
    // let exercise = exercisesList.find((item) => item.id === parent.input.id);
    // exercise.name = parent.input.name;
    // exercise.workouts = parent.input.workouts;
    // return exercise;
    let exercise = {
      id: parent.input.id,
      name: parent.input.name,
      workouts: parent.input.workouts,
    };
    await Exercises.findByIdAndUpdate(parent.input.id, exercise);
    return exercise;
  },
  deleteExercise: async (parent, args) => {
    await Exercises.findByIdAndDelete(parent.input.id);
    return { id: parent.input.id };
  },
  addNewLog: async (parent, args) => {
    // console.log(parent.input);
    let log = new Logs({
      date: parent.input.date,
      userId: parent.input.userId,
      logs: [],
    });
    return await log.save();
  },
  updateLog: async (parent, args) => {
    await Logs.findByIdAndUpdate(parent.input.id, { logs: parent.input.logs });
    // return { id: parent.input.id };
    return parent.input;
  },
  deleteLog: async (parent, args) => {
    await Logs.findByIdAndDelete(parent.input.id);
    return { id: parent.input.id };
  },
};

module.exports = resolvers;

const exercisesList = [
  {
    id: "1",
    userId: "60163b2150e651376cd5d6a6",
    name: "Legs",
    workouts: ["Squats", "Lounges"],
  },
  {
    id: "2",
    userId: "2",
    name: "Chest",
    workouts: ["Bench Press"],
  },
  {
    id: "3",
    userId: "60163b2150e651376cd5d6a6",
    name: "Biceps",
    workouts: ["Curls", "Concentration curls"],
  },
];
const usersList = [
  {
    id: "60163b2150e651376cd5d6a6",
    name: "A7",
    profileImg: "",
  },
  {
    id: "2",
    name: "M17",
    profileImg: "",
  },
];
