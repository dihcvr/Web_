const router = require("express").Router();
let Enseignant = require("../models/enseignant.model");

router.post("/loginEnseignant", (req, res) => {
  Enseignant.findOne({
    username: req.body.username
  })
    .then(user => {
      if (user) {
        if (req.body.password == user.password) {
          // Passwords match

          const record = {
            username: user.username,
            nom: user.nom,
            cin: user.cin,
            password: user.password,
            departement: user.departement
          };
          res.json({ error: true, record: record });

          console.log(" valide");
          // res.send(token);
        } else {
          // Passwords don't match
          console.log("non valide");
          res.json({ msg: "Le mot de passe incorrect", error: false });
        }
      } else {
        res.json({ msg: "Username incorrect", error: false });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.route("/").get((req, res) => {
  Enseignant.find()
    .then(Enseignant => res.json(Enseignant))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const cin = req.body.cin;
  const password = req.body.password;
  const departement = req.body.departement;

  const newEnseignant = new Enseignant({
    username,
    nom,
    prenom,
    cin,
    password,
    departement
  });

  newEnseignant
    .save()
    .then(() => res.json("Enseignant added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Enseignant.findById(req.params.id)
    .then(Enseignant => res.json(Enseignant))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Enseignant.findByIdAndDelete(req.params.id)
    .then(() => res.json("Enseignant deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Enseignant.findById(req.params.id)
    .then(Enseignant => {
      Enseignant.username = req.body.username;
      Enseignant.nom = req.body.nom;
      Enseignant.prenom = req.body.prenom;
      Enseignant.cin = req.body.cin;
      Enseignant.password = req.body.password;
      Enseignant.departement = req.body.departement;

      Enseignant.save()
        .then(() => res.json("Enseignant updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
