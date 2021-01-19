
exports.up = function(knex) {
    return knex.schema
    .createTable('item_sizes', tbl => {
        tbl.increments()
        tbl.string('size', 128).notNullable().unique()
    })
    .createTable('item_colors', tbl => {
        tbl.increments()
        tbl.string('color', 128).notNullable().unique()
    })
    .createTable('mainCategories', tbl => {
        tbl.increments()
        tbl.string('cat_name', 128).notNullable().unique()
    })
    .createTable('subCategories', tbl => {
        tbl.increments()
        tbl.integer('main_id').notNullable().unsigned()
            .references('id').inTable('mainCategories')
        tbl.string('sub_category', 128).notNullable().unique()
    })
    .createTable('users', tbl => {
        tbl.string('UUID').notNullable().unique().primary()
        tbl.string('username', 36).notNullable().unique()
        tbl.string('password', 36).notNullable()
    })
    .createTable('items', tbl => {
        tbl.increments()
        tbl.decimal('price', 2).unsigned().notNullable()
        tbl.string('name', 128).unique().notNullable()
        tbl.string('description', 240).notNullable()
        tbl.string('size').references('id').inTable('item_sizes')
        tbl.string('color').references('id').inTable('item_colors')
        tbl.integer('cat_id').notNullable().unsigned()
            .references('id').inTable('subCategories')

    })
    .createTable('receipts', tbl => {
        tbl.increments()
        tbl.integer('user_id').unsigned().notNullable()
            .references('UUID').inTable('users')
            .onDelete('CASCADE').onUpdate('CASCADE')
        // tbl.integer('puchased_items').unsigned().notNullable()
        //     .references('id').inTable('items')
        tbl.timestamps(true, true)
    })
    .createTable('purchased_items', tbl => {
        tbl.integer('receipt_id').unsigned().notNullable()
        tbl.integer('item_id').notNullable().unsigned()
            .references('id').inTable('items')
        tbl.integer('quantity').notNullable().unsigned()
        tbl.primary(['receipt_id', 'item_id']);
    })
}

//  add one to many tabble to items on a receipt and link them with receipt id.

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('purchased_items')
    .dropTableIfExists('receipts')
    .dropTableIfExists('items')
    .dropTableIfExists('users')
    .dropTableIfExists('subCategories')
    .dropTableIfExists('mainCategories')
    .dropTableIfExists('item_colors')
    .dropTableIfExists('item_sizes')
}
