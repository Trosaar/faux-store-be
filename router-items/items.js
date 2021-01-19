const express = require('express')
const router = express.Router()
const ItemDB = require('./item-model.js')
const restricted = require('../router-auth/restricted')


// GET to '/apt/items/'
router.get('/', async (req, res) => {
    try{
        const categories = await ItemDB.getCat()
        const items = await ItemDB.getAll()

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
        const item = await ItemDB.getById(id)

        res.status(200).json(item)
    } catch(err) {
        res.status(500).json({ error: "failed to get item"})
    }
})

// POST new item to '/api/items/'
router.post('/', restricted, async (req, res) => {
    const newItem = req.body

    try {
        const addedItem = await ItemDB.add(newItem)
        res.status(201).json(addedItem)
    } catch(err) {
        res.status(500).json({ message: "Failed to add the item to the database.", err })
    }
})


//PUT update item to '/api/items/id'
router.put('/:id', restricted, async (req, res) => {
    const id = req.params.id
    const updates = req.body

    try {
        const updatedItem = await ItemDB.update(id, updates)

        res.status(201).json(updatedItem)
    } catch(err) {

        console.log(err)

        res.status(500).json({ message: "Failed to update the item", err })
    }
})

router.delete('/:id', restricted, async (req, res) => {
    const id = req.params.id

    try {
        const delItemCount = await ItemDB.remove(id)
        
        if(!delItemCount) {
            res.status(404).json({
                message: `Could not find the id ${id}`
            })
        } else {
            res.status(200).json(delItemCount)
        }
    } catch(err) {
        res.status(500).json({ message: "Failed to delete item", err })
    }
})

module.exports = router