const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enseignantSchema = new Schema(
  {
    username: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    cin: { type: String, required: true },
    password: { type: String, required: true },
    departement: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Enseignant = mongoose.model("Enseignant", enseignantSchema);

module.exports = Enseignant;
