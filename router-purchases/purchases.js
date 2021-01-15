const express = require('express')
const router = express.Router()
const PurchasesDB = require('./purchases-model.js')
const restricted = require('../router-auth/restricted')
const { v5: uuidv5} = require('uuid');

// GET to '/api/purchases/test'
// 
router.get('/test', restricted, async(req, res) => {
    try {
        const purchases = await PurchasesDB.getAll()

        res.status(200).json(purchases)
    } catch(err) {
        res.status(500).json({ message: "Failed to get purchases"})
    }
})

router.get('/:id', restricted, async(req, res) => {
    const id = req.params.id

    try {
        const purchase = await PurchasesDB.getbyID(id)

        res.status(200).json(purchase)
    } catch(err) {
        res.status(500).json({ message: "Failed to get purchase", err})
    }
})

router.get('/item/:id', restricted, async(req, res) => {
    const itemID = req.params

    try {
        const purchases = await PurchasesDB.getByItem(itemID)

        res.status(200).json(purchases)
    } catch(err) {
        res.status(500).json({ message: `Failed to get purchase ${itemID}` })
    }

})

router.get('/user/:id', restricted, async(req, res) => {
    const userID = req.params

    try {
        const purchases = await PurchasesDB.getByItem(userID)

        res.status(200).json(purchases)
    } catch(err) {
        res.status(500).json({ message: `Failed to get purchase` })
    }
})

router.post('/', restricted, async(req, res) => {
    const newPurchase = req.body
    newPurchase.UUID = uuidv5("user", newPurchase.user_id)

    console.log(newPurchase)
    
    try {
        const addedPurchase = await PurchasesDB.postNew(newPurchase)

        res.status(200).json(addedPurchase)
    } catch(err) {
        res.status(500).json({ message: "Failed to finalize purchase", err })
    }
})

router.put('/:id', restricted, async(req, res) => {
    const update = req.body
    const id = req.params.id

    try {
        await PurchasesDB.update(update)
        const updatedPurchase = await PurchasesDB.getByID(id)
        
        res.status(201).json(updatedPurchase)
    } catch(err) {
        res.status(500).json({ message: "Failed to update purchase", err })
    }
})

module.exports = router