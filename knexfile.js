module.exports = {

  development: {
    client: 'sqlite3',
    connection: { filename: './database/team-builder.db3' },
    useNullAsDefault: true, // needed for sqlite
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: { directory: './database/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3',
    },
    useNullAsDefault: true, // needed for sqlite
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    }
  }
};