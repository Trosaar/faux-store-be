const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

//routes
const itemsRouter = require('../router-items/items.js')
const authRouter = require('../router-auth/auth.js')
const purchasesRouter = require('../router-purchases/purchases.js')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/items', itemsRouter)
server.use('/api/purchases', purchasesRouter)

server.get('/', (req, res) => {
    res.status(200).send('<h1>I Think its working</h1>')
})

module.exports = server