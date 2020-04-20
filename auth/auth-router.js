const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let user = req.body; // username, password
  // rounds are 2 to the N times
  const rounds = process.env.HASH_ROUNDS || 8;

  // hash the user.password
  const hash = bcrypt.hashSync(user.password, rounds);

  // update the creds to use the hash
  user.password = hash;


  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = router;