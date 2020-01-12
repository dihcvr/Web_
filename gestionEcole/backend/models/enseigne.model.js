const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enseigneSchema = new Schema(
  {
    username: { type: String, required: true },
    element: { type: String, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Enseigne = mongoose.model("Enseigne", enseigneSchema);

module.exports = Enseigne;
