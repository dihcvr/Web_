const router = require("express").Router();
let Enseigne = require("../models/enseigne.model");

router.route("/").get((req, res) => {
  Enseigne.find()
    .then(Enseigne => res.json(Enseigne))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const element = req.body.element;
  const date = Date.parse(req.body.date);

  const newEnseigne = new Enseigne({
    username,
    element,
    date
  });

  newEnseigne
    .save()
    .then(() => res.json("Enseigne added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Enseigne.findById(req.params.id)
    .then(Enseigne => res.json(Enseigne))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Enseigne.findByIdAndDelete(req.params.id)
    .then(() => res.json("Enseigne deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Enseigne.findById(req.params.id)
    .then(Enseigne => {
      Enseigne.username = req.body.username;
      Enseigne.element = req.body.element;
      exercise.date = Date.parse(req.body.date);

      Enseigne.save()
        .then(() => res.json("Enseigne updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
