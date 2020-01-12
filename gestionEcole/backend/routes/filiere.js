const router = require("express").Router();
let Filiere = require("../models/filiere.model");

router.route("/").get((req, res) => {
  Filiere.find()
    .then(Filiere => res.json(Filiere))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const filiere = req.body.filiere;

  const newFiliere = new Filiere({
    filiere
  });

  newFiliere
    .save()
    .then(() => res.json("Filiere added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Filiere.findById(req.params.id)
    .then(Filiere => res.json(Filiere))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Filiere.findByIdAndDelete(req.params.id)
    .then(() => res.json("Filiere deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Filiere.findById(req.params.id)
    .then(Filiere => {
      Filiere.filiere = req.body.filiere;

      Filiere.save()
        .then(() => res.json("Filiere updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
