const router = require('express').Router();
const User = require('../Models/User_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register

router.post('/register', async (req, res) => {

  try {
    const findUserName = await User.findOne({ username: req.body.username });
    const findUserEmail = await User.findOne({ email: req.body.email });

    if (findUserName) {
      res.status(400).json("Username should be unique")
    }
    if (findUserEmail) {
      res.status(401).json("Useremail should be unique")
    }

    const hashedpassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword
    });

    await newUser.save();
    res.status(200).json("Register success");


  } catch (err) {

    res.status(500).json(err);
  }
})

// login

router.post('/login', async (req, res) => {

  try {

    const user = await User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.username }
      ]
    });

    !user && res.status(400).json('User not found !!');

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json('Bad request !!');

    const { password, ...others } = user._doc;

    // json web token 
    const token = await jwt.sign({ username: user.username, userid: user._id }, process.env.SECRATE_KEY)
    res.status(200).cookie("jwt", token, { httpOnly: true }).json(others)

  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router