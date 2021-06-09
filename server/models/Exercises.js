const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  workouts: {
    type: Array,
    required: true,
    default: [],
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Exercises", ExerciseSchema);
