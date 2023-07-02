const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Task",
  new Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
  }),
  "task"
);
