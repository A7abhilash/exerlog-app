const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    logs: {
      type: Array,
      required: true,
      default: [],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Logs", LogSchema);
