const router = require('express').Router();
const User = require('../Models/User_model');
const bcrypt = require('bcrypt');
const Token = require("../Models/Token-model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');


//password reset

router.post("/sendemail", async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {

            res.status(400).json("User not found");

        } else {

            let token = await Token.findOne({ userId: user._id });
            if (token) await token.deleteOne();
            let resetToken = crypto.randomBytes(32).toString("hex");
            const hash = await bcrypt.hash(resetToken, 10);

            await new Token({
                userId: user._id,
                token: hash,
                createdAt: Date.now(),
            }).save();

            const link = `${process.env.CLIENT_URL}/newpassword/reset?token=${resetToken}&id=${user._id}`;


            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false,
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL,
                to: req.body.email,
                subject: "Change Password",
                text: "Click on the link to change your password",
                html: `<a href=${link}>Change Password Link</a>`,
            });


            res.status(200).json("check your email")
        }


    } catch (error) {

        res.status(400).json(error);
    }

})


// create new password

router.post("/create-password", async (req, res) => {

    try {

        const { userId } = req.body;
        const userToken = req.body.token;
        const newPassword = req.body.password;

        let passwordResetToken = await Token.findOne({ userId });

        if (!passwordResetToken) {

            res.status(400).json("Invalid or expired password reset token");

        } else {

            const isValid = await bcrypt.compare(userToken, passwordResetToken.token);

            if (!isValid) {

                res.status(400).json("Invalid or expired password reset token");

            } else {

                const hash = await bcrypt.hash(newPassword, 10);
                await User.updateOne(
                    { _id: userId },
                    { $set: { password: hash } },
                    { new: true }
                );

                await passwordResetToken.deleteOne();
                const user = await User.findById({ _id: userId });
                const { password, ...others } = user._doc;
                const token = await jwt.sign({ username: user.username, userid: user._id }, process.env.TOKENSECRATE);
                res.status(200).json({ ...others, token });
            }
        }

    } catch (error) {

        res.status(400).json("server error");
    }

})



module.exports = router
