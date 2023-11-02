const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email address already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })
    if (user) {
        res.status(201).json({ _id: user.id, email: email })
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    console.log("User created successfully");
    res.json({ message: "Register user" })
})

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            }, "kajal123", { expiresIn: "30m" }

        )
        res.status(200).json({ accessToken })
    } else {
        res.status(401);
        throw new Error("Invalid Credentials")
    }
})

const currentUser = asyncHandler(async(req, res) => {
    res.json({ message: "Current user" })
})
module.exports = { registerUser, loginUser, currentUser }