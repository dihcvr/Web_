const router = require("express").Router();
let Filiere = require("../models/semestre.model");

router.route("/").get((req, res) => {
  Semestre.find()
    .then(Semestre => res.json(Semestre))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const semestre = req.body.semestre;

  const newSemestre = new Semestre({
    semestre
  });

  newSemestre
    .save()
    .then(() => res.json("Semestre added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Semestre.findById(req.params.id)
    .then(Semestre => res.json(Semestre))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Semestre.findByIdAndDelete(req.params.id)
    .then(() => res.json("Semestre deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Semestre.findById(req.params.id)
    .then(Semestre => {
      Semestre.semestre = req.body.semestre;

      Semestre.save()
        .then(() => res.json("Semestre updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
