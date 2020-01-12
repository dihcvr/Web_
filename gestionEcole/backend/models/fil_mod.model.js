const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fil_modSchema = new Schema(
  {
    filiere: { type: String, required: true },
    module: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Fil_mod = mongoose.model("Fil_mod", fil_modSchema);

module.exports = Fil_mod;
