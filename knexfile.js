// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/car-dealer.db3'
    },
    useNullAsDefault: true, // Needed when using sqlite3
    migrations: {
      directory: './data/migrations'
    }
  }
};
