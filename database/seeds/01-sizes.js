exports.seed = function(knex) {
    return knex('item_sizes').insert([
        {'size': 'Extra Extra Small'},
        {'size': 'Extra Small'},
        {'size': 'Small'},
        {'size': 'Medium'},
        {'size': 'Large'},
        {'size': 'Extra Large'},
        {'size': 'Extra Extra Large'}
    ])
}