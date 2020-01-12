const router = require("express").Router();
let Etudiant = require("../models/etudiant.model");

router.route("/").get((req, res) => {
  Etudiant.find()
    .then(etudiant => res.json(etudiant))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const cin = req.body.cin;
  const cne = req.body.cne;
  const date = Date.parse(req.body.date);
  const username = req.body.username;
  const password = req.body.password;
  const filiere = req.body.filiere;

  const newEtudiant = new Etudiant({
    cne,
    nom,
    prenom,
    cin,
    date,
    username,
    password,
    filiere
  });

  newEtudiant
    .save()
    .then(() => res.json("Etudiant added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Etudiant.findById(req.params.id)
    .then(etudiant => res.json(etudiant))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Etudiant.findByIdAndDelete(req.params.id)
    .then(() => res.json("Etudiant deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Etudiant.findById(req.params.id)
    .then(etudiant => {
      etudiant.cne = req.body.cne;
      etudiant.nom = req.body.nom;
      etudiant.prenom = req.body.prenom;
      etudiant.cin = req.body.cin;
      etudiant.date = Date.parse(req.body.date);
      etudiant.username = req.body.username;
      etudiant.password = req.body.password;
      etudiant.filiere = req.body.filiere;

      etudiant
        .save()
        .then(() => res.json("Etudiant updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
