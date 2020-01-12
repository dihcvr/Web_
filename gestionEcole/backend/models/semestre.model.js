const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SemestreSchema = new Schema(
  {
    Semestre: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Semestre = mongoose.model("Semestre", SemestreSchema);

module.exports = Semestre;
