const express = require('express')
const router - express.Router()
const ItemDB = require('./item-model.js')
const jwt = require('jsonwebtoken')
const restricted = require('../router-auth/restricted')


// GET to '/apt/items/'
router.get('/', async (req, res) => {
    try{
        const categories = ItemDB.getCat()
        const items = ItemDB.getAll()

        res.status(200).json({ categories, items })
    } catch(err) {
        res.status(500).json({
            error: "failed to get from base"
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id 

    try {
        const item = ItemDB.getById(id)

        res.status(200).json({ item })
    } catch(err) {
        res.status(500).json({ error: "failed to get item"})
    }
})

// POST new item to '/api/items/'
router.post('/', restricted, async (req, res) => {
    const newItem = req.body

    try {
        const addedItem = await ItemDB.add(newItem)
        res.status(200).json(addedItem)
    } catch(err) {
        res.status(500).json({ message: "Failed to add the item to the database.", err })
    }
})

router.put('/:id', restricted, async (req, res) => {
    const id = req.params.id
    const updates = req.body

    try {
        const updatedItem = await ItemDB.update(id, updates)
        res.status(200).json(updatedItem)
    } catch(err) {
        res.status(500).json({ message: "Failed to update the item", err })
    }
})
