const router = require("express").Router();
let Module = require("../models/module.model");

router.route("/").get((req, res) => {
  Module.find()
    .then(Module => res.json(Module))
    .catch(err => res.status(400).json("Error: " + err));
});
router.route("/add").post((req, res) => {
  const module = req.body.module;

  const newModule = new Module({
    module
  });

  newModule
    .save()
    .then(() => res.json("Module added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Module.findById(req.params.id)
    .then(Module => res.json(Module))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Module.findByIdAndDelete(req.params.id)
    .then(() => res.json("Module deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Module.findById(req.params.id)
    .then(Module => {
      Module.module = req.body.module;

      Module.save()
        .then(() => res.json("Module updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
