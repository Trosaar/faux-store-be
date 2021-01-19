const db = require('../database/dbConfig.js')

module.exports = {
    getAll,
    getByUser,
    getbyID,
    getByItem,
    postNew,
    update,
    remove
}

function getAll() {
    return db('receipts as r')
    .join('users', 'users.UUID', 'r.user_id')
    .join('purchased_items as p', 'p.receipt_id', 'r.id')
    .join('items as i', 'i.id', 'r.item_id')
}

function getByUser(id) {
    return db('receipts as r')
    .join('users', 'users.UUID', 'r.user_id')
    .join('purchased_items as p', 'p.receipt_id', 'r.id')
    .join('items as i', 'i.id', 'r.item_id')
    .where({ 'r.user_id': id })
}

function getByItem(id) {
    return db('receipts as r')
    .join('users', 'users.UUID', 'r.user_id')
    .join('purchased_items as p', 'p.receipt_id', 'r.id')
    .join('items as i', 'i.id', 'r.item_id')
    .where({ 'p.item_id': id })
}

function getbyID(id) {
    return db('receipts as r')
    .join('users', 'users.UUID', 'r.user_id')
    .join('purchased_items as p', 'p.receipt_id', 'r.id')
    .join('items as i', 'i.id', 'r.item_id')
    .where({ id })
}

function postNew(purchase) {
    return db('receipts as r')
    .join('users', 'users.UUID', 'r.user_id')
    .join('purchased_items as p', 'p.receipt_id', 'r.id')
    .join('items as i', 'i.id', 'r.item_id')
    .insert(purchase)
    .then(ids => {
        return getByItem(ids[0])
    })
}

function update(updates) {
    return db('receipts as r')
    .join('users', 'users.UUID', 'r.user_id')
    .join('purchased_items as p', 'p.receipt_id', 'r.id')
    .where('id', req.params.id)
    .insert(updates)
}

function remove(id) {
    return db('receipts as r')
    .where({ id })
    .del()
    .then(() => {
        return 1
    })
}