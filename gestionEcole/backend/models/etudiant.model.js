const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const etudiantSchema = new Schema(
  {
    cne: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    cin: { type: String, required: true },
    date: { type: Date, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    filiere: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Etudiant = mongoose.model("Etudiant", etudiantSchema);

module.exports = Etudiant;
