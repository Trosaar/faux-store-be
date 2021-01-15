const db = require('../database/dbConfig.js')

//CRUD Create Read Update Delete

module.exports = {
    add,
    findAll,
    getById,
    getBy,
    update,
    remove
}

function add(user) {
    return db('users').insert(user).then(ids => {
        return getById(user.UUID)
    })
}

function findAll() {
    return db('users')
}

function getById(UUID) {
    return db('users').where({ UUID }).first()
}

function getBy(filter) {
    return db('users').where( filter ).first()
}

function update(info, UUID) {
    return db('users').where({ UUID }).update(info)
}

function remove(UUID) {
    return db('users').where({ UUID }).del()
}