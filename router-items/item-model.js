const db = require('../database/dbConfig.js')

module.exports = {
    getCat,
    getAll,
    getById,
    add,
    update,
    remove
}

async function getCat() {
    return db('subCategories as s')
    .join('mainCategories as m', 'm.id', 's.main_id')
}

async function getAll() {
    return db('items as i')
    .join('subCategories as sub', 'sub.id', 'i.cat_id')
    .select('i.id', 'i.price', 'i.size', 'i.color', 'i.cat_id')
}

async function getById(itemID) {
    return db('items as i')
    // .join('item_sizes as s', 's.size', 'i.size')
    // .join('item_colors as c', 'c.color', 'i.color')
    .where({ id: itemID })
}

async function add(item) {
    return db('items').insert(item).then(ids => {
        return getAll()
    })
}

async function update(id, updates) {
    return db('items')
    .where( {id} )
    .update(updates)
    .then( () => {
        return getById(id)
    })
}

async function remove(id) {
    return db('items')
    .where({id})
    .del()
    .then(() => {
        return getAll()
    })
}
