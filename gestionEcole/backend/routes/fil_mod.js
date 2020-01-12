const router = require("express").Router();
let Fil_mod = require("../models/fil_mod.model");

router.route("/").get((req, res) => {
  Fil_mod.find()
    .then(Fil_mod => res.json(Fil_mod))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const filiere = req.body.filiere;
  const module = req.body.module;

  const newFil_mod = new Filiere({
    filiere,
    module
  });

  newFil_mod
    .save()
    .then(() => res.json("Fil_Mod added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Fil_mod.findById(req.params.id)
    .then(Fil_mod => res.json(Fil_mod))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Fil_mod.findByIdAndDelete(req.params.id)
    .then(() => res.json("Fil_mod deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Fil_mod.findById(req.params.id)
    .then(Fil_mod => {
      Fil_mod.filiere = req.body.filiere;
      Fil_mod.module = req.body.module;

      Fil_mod.save()
        .then(() => res.json("Fil_Mod updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
