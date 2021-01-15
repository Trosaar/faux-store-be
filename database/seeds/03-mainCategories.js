exports.seed = function(knex) {
    return knex('mainCategories').insert([
        {'cat_name': 'Kitchen'},
        {'cat_name': 'Bath'},
        {'cat_name': 'Bedroom'},
        {'cat_name': 'Computers'},
        {'cat_name': 'Music'},
        {'cat_name': 'Art'},
    ])
}