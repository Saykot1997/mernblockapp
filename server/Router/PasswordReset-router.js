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
        if (!user) throw new Error("User does not exist");
        let token = await Token.findOne({ userId: user._id });
        if (token) await token.deleteOne();
        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, 10);

        await new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        }).save();

        const link = `http://localhost:3000/newpassword/reset?token=${resetToken}&id=${user._id}`;


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

    } catch (error) {

        res.status(400).json(error);
    }

})


// create new password

router.post("/create-password", async (req, res) => {

    try {

        const { userId, token } = req.body;
        const newPassword = req.body.password;

        let passwordResetToken = await Token.findOne({ userId });

        if (!passwordResetToken) {
            throw new Error("Invalid or expired password reset token");
        }

        const isValid = await bcrypt.compare(token, passwordResetToken.token);

        if (!isValid) {
            throw new Error("Invalid or expired password reset token");
        }

        const hash = await bcrypt.hash(newPassword, 10);
        await User.updateOne(
            { _id: userId },
            { $set: { password: hash } },
            { new: true }
        );

        const user = await User.findById({ _id: userId });

        const { password, ...others } = user._doc;

        // json web token 
        const jsonwebtoken = await jwt.sign({ username: user.username, userid: user._id }, process.env.SECRATE_KEY)
        res.status(200).cookie("jwt", jsonwebtoken, { httpOnly: true }).json(others)

        await passwordResetToken.deleteOne();

    } catch (error) {

        res.status(400).json(error.message);
    }

})



module.exports = router
