exports.seed = function(knex) {
	return knex('users').insert([
		{'UUID': "1", 'username': "Sunda", 'password': 'pass1' },
		{'UUID': "2", 'username': "Plat", 'password': 'pass2' }, 
		{'UUID': "3", 'username': "Cham", 'password': 'pass3' }, 
  ]);
};