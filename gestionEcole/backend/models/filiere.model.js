const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const filiereSchema = new Schema(
  {
    filiere: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Filiere = mongoose.model("Filiere", filiereSchema);

module.exports = Filiere;
