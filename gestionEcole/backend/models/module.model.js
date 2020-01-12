const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ModuleSchema = new Schema(
  {
    Module: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Module = mongoose.model("Module", ModuleSchema);

module.exports = Module;
