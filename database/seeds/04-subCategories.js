exports.seed = function(knex) {
    return knex("subCategories").insert([
        {"main_id": 1,
         "sub_category": "Dishware"},
        {"main_id": 1,
        "sub_category": "Gadgets"},
        {"main_id": 1,
        "sub_category": "Utensils"},
        {"main_id": 2,
        "sub_category": "Soap"},
        {"main_id": 3,
        "sub_category": "Bedding"},
        {"main_id": 4,
        "sub_category": "Monitors"},
        {"main_id": 5,
        "sub_category": "Rock"},
        {"main_id": 6,
        "sub_category": "Photography"}
    ])
}