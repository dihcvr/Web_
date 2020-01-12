const router = require("express").Router();
let Admin = require("../models/admin.model");

router.post("/loginAdmin", (req, res) => {
  Admin.findOne({
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
            post: user.post
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
  Admin.find()
    .then(Admin => res.json(Admin))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const cin = req.body.cin;
  const password = req.body.password;
  const post = req.body.post;

  const newAdmin = new Admin({
    username,
    nom,
    prenom,
    cin,
    password,
    post
  });

  newAdmin
    .save()
    .then(() => res.json("Admin added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Admin.findById(req.params.id)
    .then(Admin => res.json(Admin))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Admin.findByIdAndDelete(req.params.id)
    .then(() => res.json("Admin deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Admin.findById(req.params.id)
    .then(Admin => {
      Admin.username = req.body.username;
      Admin.nom = req.body.nom;
      Admin.prenom = req.body.prenom;
      Admin.cin = req.body.cin;
      Admin.password = req.body.password;
      Admin.post = req.body.post;

      Admin.save()
        .then(() => res.json("Admin updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
