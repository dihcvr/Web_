const router = require("express").Router();
let Mod_sem = require("../models/mod_sem.model");

router.route("/").get((req, res) => {
  Mod_sem.find()
    .then(Mod_sem => res.json(Mod_sem))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const semestre = req.body.semestre;
  const module = req.body.module;

  const newMod_sem = new Filiere({
    module,
    semestre
  });

  newMod_sem
    .save()
    .then(() => res.json("Mod_sem added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Mod_sem.findById(req.params.id)
    .then(Mod_sem => res.json(Mod_sem))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Mod_sem.findByIdAndDelete(req.params.id)
    .then(() => res.json("Mod_sem deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Mod_sem.findById(req.params.id)
    .then(Mod_sem => {
      Mod_sem.module = req.body.module;
      Mod_sem.semestre = req.body.semestre;

      Mod_sem.save()
        .then(() => res.json("Mod_sem updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
