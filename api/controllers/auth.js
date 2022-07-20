const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const generatorJWT = require("../helpers/generatorJWT");

const authUserPost = async (req, res) => {
  const { email, password } = req.body;
console.log(email,password)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ msg: "User/Password Invalid" });
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ msg: "User/Password Invalid" });
    }
    const token = await generatorJWT(user.uid)
    res.json({
        user: user.uid,
        token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};
 
module.exports = {
  authUserPost,
};
