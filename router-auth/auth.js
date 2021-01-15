const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const AuthDB = require('./auth-model.js')
const restrictedMid = require('./restricted.js')
const { v4: uuidv4 } = require('uuid');

// get post put delete
// Read Create Update Delete

function generateToken(user) {
    const paylaod  = {
        id: user.UUID,
        username: user.username
    }

    const options = {
        expiresIn: "8h"
    }

    return jwt.sign(paylaod, process.env.JWT_SECRET, options)
}

router.get('/', restrictedMid, async (req, res) => {
    try {
        const listOfAllUsers = await AuthDB.findAll();

        listOfAllUsers.forEach(user => {
            user.password = 'Didnt say the magic word'
        })

        res.status(200).json({listOfAllUsers})
    } catch(err) {
        res.status(500).json({ error: "Looks like something went wrong. Please check the request."})
    }
})

router.post('/register', async (req, res) => {
    const userInfo = req.body

    try {
         userInfo.password = await bcrypt.hashSync(userInfo.password, 15)
         userInfo.UUID = await uuidv4()
        
        const newUser = await AuthDB.add(userInfo)
        const token = await generateToken(newUser)

        res.status(201).json({
            newUser,
            token
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            error: "Failed to register", err
        })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await AuthDB.getBy({ username })

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = await generateToken(user)
            const ID = user.UUID
            res.status(200).json({
                message: `Welcome ${user.username}`,
                ID,
                token
            })
        } else {
            res.status(401).json({ message: 'Invalid credentials'})
        }
    } catch(err) {
        res.status(500).json({
            error: "Server failed to login",
            err
        })
    }
})

module.exports = router