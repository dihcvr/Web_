const router = require("express").Router();
let Note = require("../models/note.model");

router.route("/").get((req, res) => {
  Note.find()
    .then(Note => res.json(Note))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const element = req.body.element;
  const note = req.body.note;
  const ds = Number(req.body.ds);
  const tp = Number(req.body.tp);
  const exam = Number(req.body.exam);
  const annee = Date.parse(req.body.annee);

  const newNote = new Note({
    element,
    note,
    ds,
    tp,
    exam,
    annee
  });

  newNote
    .save()
    .then(() => res.json("Note added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Note.findById(req.params.id)
    .then(Note => res.json(Note))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json("Note deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Note.findById(req.params.id)
    .then(Note => {
      Note.element = req.body.element;
      Note.note = req.body.note;
      Note.ds = Number(req.body.ds);
      Note.tp = Number(req.body.tp);
      Note.exam = Number(req.body.exam);
      Note.annee = Date.parse(req.body.annee);

      Note.save()
        .then(() => res.json("Note updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
