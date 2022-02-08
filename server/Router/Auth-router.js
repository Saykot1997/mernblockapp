const router = require('express').Router();
const User = require('../Models/User_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register

router.post('/register', async (req, res) => {

  if (!req.body.username || !req.body.password || !req.body.email) {

    res.status(400).json({ msg: "please fill all the fields" })


  } else {

    try {

      const findUserName = await User.findOne({ username: req.body.username });
      const findUserEmail = await User.findOne({ email: req.body.email });

      if (findUserName && !findUserEmail) {

        res.status(403).json("Username already exist");

      } else if (findUserEmail && !findUserName) {

        res.status(403).json("Email already exist");

      } else if (findUserName && findUserEmail) {

        res.status(403).json("Username and Email already exist");

      } else {

        const hashedpassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedpassword
        });

        await newUser.save();
        res.status(200).json("Register success");
      }

    } catch (err) {

      res.status(500).json(err);
    }
  }
})


// login

router.post('/login', async (req, res) => {

  if (!req.body.username || !req.body.password) {

    res.status(400).json("Please enter username and password");

  } else {

    try {

      const user = await User.findOne({
        $or: [
          { username: req.body.username },
          { email: req.body.username }
        ]
      });

      if (!user) {

        res.status(400).json('User not found !!');

      } else {

        const validate = await bcrypt.compare(req.body.password, user.password);

        if (!validate) {

          res.status(400).json('Password is incorrect!!');

        } else {

          const { password, ...others } = user._doc;
          const token = await jwt.sign({ username: user.username, userid: user._id }, process.env.TOKENSECRATE);
          res.status(200).json({ ...others, token });

        }
      }

    } catch (err) {

      res.status(500).json(err);
    }
  }
})


module.exports = router