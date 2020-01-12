const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mod_semSchema = new Schema(
  {
    module: { type: String, required: true },
    semestre: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Mod_sem = mongoose.model("Mod_sem", mod_semSchema);

module.exports = Mod_sem;
