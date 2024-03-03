const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports = {
    registerUser : async (req,res) => {
        //validate req.body > Done
        // create mongoDB userModel
        // do password encryption 
        // save data to mongo 
        // return response client 
        // res.send("Register success in controller")    
        const userModel = new UserModel(req.body)
        userModel.password = await bcrypt.hash(req.body.password, 10)
        try {
            const response = await userModel.save()
            response.password = undefined
            return res.status(200).json({ message: "Success", data: response })
        } catch(err) {
            return res.status(500).json({ message: "Internal Server Error", err })   
        }
    },
    loginUser : async (req,res) => {
        // res.send("Login success controller")    
        try {
            const user = await UserModel.findOne({ email: req.body.email })
            if(!user) {
                return res.status(401).json({ message: "Auth failed, Invalid Username/Password" })
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword) {
                return res.status(401).json({ message: "Invalid password" })
            }
            const tokenObject = {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            }

            const jwtToken = jwt.sign(tokenObject, process.env.JWT_SECRET, { expiresIn: "4h" })
            return res.status(200).json({ message: "Success", jwtToken, tokenObject })
            
        } catch(err) {
                return res.status(500).json({ message: "Error", err })
        }
    },

    getUsersData : async (req,res) => {
        try {
            const users = await UserModel.find({}, { password: 0 })
            return res.status(200).json({ message: "Success", data: users })
        } catch(err) {
            return res.status(500).json({ message: "Internal Server Error", err })
        }
    }
}