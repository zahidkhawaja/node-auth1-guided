const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  console.log("session", req.session);
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
