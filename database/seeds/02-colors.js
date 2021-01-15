exports.seed = function(knex) {
    return knex('item_colors').insert([
        {'color': 'Red'},
        {'color': 'Orange'},
        {'color': 'Yellow'},
        {'color': 'Green'},
        {'color': 'Blue'},
        {'color': 'Indigo'},
        {'color': 'Violet'}
    ])
}