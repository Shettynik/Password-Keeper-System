const Password = require("../models/Password");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const crypto = require("crypto");
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);
const sendEmail = require("../utils/sendEmail");

exports.getPrivateData = async (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: "You have got access to private route"
    })
}

const checkIfExists = async (id, app) => {
    const addedPasswords = await User.findById(id).populate("apppasswords");
    const appPasswords = addedPasswords.apppasswords;
    const appName = appPasswords.filter(appPassword => appPassword.app === app);
    return appName
}

exports.addPassword = async (req, res, next) => {
    const { app, username, password } = req.body;
    const id = req.params.id;
    try {
        const addedPasswords = await User.findById(id).populate("apppasswords");
        const appPasswords = addedPasswords.apppasswords;
        const appName = await appPasswords.filter(appPassword => appPassword.app === app);
        if (appName.length > 0) {
            return next(new ErrorResponse("App name already exists", 400))
        }

        const cipher = await crypto.createCipheriv(algorithm, secretKey, iv);

        const encrypted = await Buffer.concat([cipher.update(password), cipher.final()]);
        const addPassword = await Password.create({
            app,
            username,
            iv: iv.toString('hex'),
            content: encrypted.toString('hex'),
            user: id,
        });

        await addPassword.save();

        const findUser = await User.findById(id);
        await findUser.apppasswords.push(addPassword);
        await findUser.save();

        res.status(200).json({
            success: true,
            data: "App Password Saved Successfully !!"
        });

    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}

exports.getAppNames = async (req, res, next) => {
    const id = req.params.id;
    try {
        const addedPasswords = await User.findById(id).populate("apppasswords");
        res.status(200).json({
            success: true,
            data: addedPasswords.apppasswords
        })
    } catch (error) {
        next(new ErrorResponse(error.message, 500))
    }
}

exports.getPassword = async (req, res, next) => {
    const id = req.params.id;
    const app = req.query.app;
    try {
        const user = await User.findById(id);
        if (!user) {
            next(new ErrorResponse("No such user!!", 400))
        }

        const addedPasswords = await User.findById(id).populate("apppasswords");
        const appPasswords = addedPasswords.apppasswords;
        const Password = appPasswords.filter(appPassword => appPassword.app === app);
        console.log(Password[0].iv, Password[0].content);


        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(Password[0].iv, 'hex'));

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(Password[0].content, 'hex')), decipher.final()]);

        const message = `The requested password for your ${app} account is ${decrpyted.toString()}`;

        try {
            await sendEmail({
                to: user.email,
                subject: `${app} Password`,
                text: message
            });

            res.status(200).json({
                success: true,
                data: `Email sent!! Kindly check your registered email to get the password of your ${app} account`
            });

        } catch (error) {
            next(new ErrorResponse("Email could not be sent"))
        }
    } catch (error) {
        next(new ErrorResponse(error.message, 500))
    }
}