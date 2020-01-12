const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    username: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    cin: { type: String, required: true },
    password: { type: String, required: true },
    post: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
