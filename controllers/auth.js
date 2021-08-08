const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

exports.register = async(req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password
        });
    
        sendToken(user, 201, res);

    } catch (error) {
        next(new ErrorResponse(error.message, 500))
    }
};

exports.login = async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        next(new ErrorResponse("Please provide both email and password", 400));
    }

    try {
        const user = await User.findOne({email}).select("+password");

        if(!user){
            next(new ErrorResponse("User not found", 404));
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            next(new ErrorResponse("Invalid Credentials", 404));
        }

        sendToken(user, 200, res);
            
    } catch (error) {
        next(new ErrorResponse(error.message, 500))
    }
};

exports.forgotpassword = async(req, res, next) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email: email});

        if(!user){
            return next(new ErrorResponse("Email could not be sent", 404 ))
        }

        const resetToken = await user.getResetPasswordToken();
        console.log(resetToken)

        await user.save();

        const resetUrl = `http://ec2-3-239-164-171.compute-1.amazonaws.com/passwordreset/${resetToken}`;

        const message = `
        <h1>You have requested for a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await sendEmail({
                to: user.email,
                subject: "Password reset",
                text: message
            });

            res.status(200).json({
                success: true,
                data: "Email sent"
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500))
        }
    } catch (error) {
        next(error);
    }
};

exports.resetpassword = async(req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken, 
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!user){
            return next(new ErrorResponse("Invalid Reset Token", 404))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            data: "Reset Password Success"
        })
    } catch (error) {
        next(error)
    }
};

const sendToken = async (user, statusCode, res) => {
    const token = await user.getSignedToken();
    console.log(token)
    res.status(statusCode).json({
        success: true,
        token: token,
        id: user._id
    });
}