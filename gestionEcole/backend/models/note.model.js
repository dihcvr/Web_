const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    element: { type: String, required: true },
    note: { type: String, required: true },
    ds: { type: Number, required: true },
    tp: { type: Number, required: true },
    exam: { type: Number, required: true },
    annee: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
