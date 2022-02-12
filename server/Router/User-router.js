const router = require('express').Router();
const User = require('../Models/User_model');
const Post = require('../Models/Post_model');
const bcrypt = require('bcrypt');
const fs = require("fs")
const authgurd = require("../authgard/authgurd");
const upload = require("../Multer/Multer");
const path = require('path');
const jwt = require('jsonwebtoken');

// update account
router.post('/:id', authgurd, upload.single('files'), async (req, res) => {

    const { username, email, password } = req.body;

    if (req.userId === req.params.id) {

        const user = await User.findById(req.userId)

        if (req.file) {

            const oldPhoto = user.profilepic;
            const uploadDir = "upload/";
            const oldPhotoWithPath = uploadDir + oldPhoto;

            if (oldPhoto) {

                if (fs.existsSync(oldPhotoWithPath)) {
                    fs.unlink(oldPhotoWithPath, (err) => {
                        console.log("old photo has been deleted");
                    });
                }

            } else {

                console.log("oldPhoto is not exist");
            }

            user.profilepic = req.file.filename;

            if (password) {

                hassedPassword = await bcrypt.hash(req.body.password, 10);
                user.password = hassedPassword;

                try {

                    username && (user.username = username);
                    email && (user.email = email);
                    await user.save();
                    const updateduser = await User.findById(req.params.id);

                    const { password, ...others } = updateduser._doc;
                    const token = await jwt.sign({ username: user.username, userid: user._id }, process.env.TOKENSECRATE);
                    res.status(200).json({ ...others, token });

                } catch (err) {

                    res.status(400).json(err);
                }

            } else {

                try {

                    username && (user.username = username);
                    email && (user.email = email);
                    await user.save();
                    const updateduser = await User.findById(req.params.id)
                    const { password, ...others } = updateduser._doc;
                    const token = await jwt.sign({ username: user.username, userid: user._id }, process.env.TOKENSECRATE);
                    res.status(200).json({ ...others, token });

                } catch (err) {

                    res.status(500).json(err);
                }
            }

        } else {

            if (req.body.password) {

                hassedPassword = await bcrypt.hash(req.body.password, 10);
                user.password = hassedPassword;

                try {

                    username && (user.username = username);
                    email && (user.email = email);
                    await user.save();
                    const updateduser = await User.findById(req.params.id)
                    const { password, ...others } = updateduser._doc;
                    const token = await jwt.sign({ username: user.username, userid: user._id }, process.env.TOKENSECRATE);
                    res.status(200).json({ ...others, token });

                } catch (err) {

                    res.status(400).json(err);
                }

            } else {

                try {

                    username && (user.username = username);
                    email && (user.email = email);
                    await user.save();

                    const updateduser = await User.findById(req.params.id)
                    const { password, ...others } = updateduser._doc;
                    const token = await jwt.sign({ username: user.username, userid: user._id }, process.env.TOKENSECRATE);
                    res.status(200).json({ ...others, token });

                } catch (err) {

                    res.status(500).json(err);
                }
            }

        }

    } else {

        res.status(400).json("you can update only your account!!");
    }
})

// delate account

router.delete('/:id', authgurd, async (req, res) => {

    if (req.userId === req.params.id) {

        try {

            const user = await User.findById(req.params.id);

            try {

                if (user.profilepic) {

                    const oldPhoto = user.profilepic;
                    const uploadDir = "upload/";
                    const oldPhotoWithPath = uploadDir + oldPhoto;

                    if (oldPhoto) {

                        if (fs.existsSync(oldPhotoWithPath)) {
                            fs.unlink(oldPhotoWithPath, (err) => {
                                console.log("old photo has been deleted");
                            });
                        }

                    } else {

                        console.log("oldPhoto is not exist");
                    }
                }

                const allpost = await Post.find({ username: user.username })
                allpost.map((post) => {

                    const oldPhoto = post.photo;
                    const uploadDir = "upload/";
                    const oldPhotoWithPath = uploadDir + oldPhoto;

                    if (oldPhoto) {

                        if (fs.existsSync(oldPhotoWithPath)) {
                            fs.unlink(oldPhotoWithPath, (err) => {
                                console.log("old photo has been deleted");
                            });
                        }

                    } else {

                        console.log("oldPhoto is not exist");
                    }

                })

                await Post.deleteMany({ username: user.username })
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json('user has been deleted !!')
            }
            catch (err) {

                res.status(500).json(err);
            }

        }
        catch (error) {

            res.status(404).json('user not found !!')
        }

    }
    else {

        res.status(400).json("you can delete only your account!!");
    }
});


// Get user 

router.get('/:id', authgurd, async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(400).json("User not found");
        }

        const { password, ...others } = user._doc;

        res.status(200).json(others);

    } catch (error) {

        res.status(500).json(error)
    }

});



module.exports = router