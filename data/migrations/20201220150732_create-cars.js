
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        // Primary key
        tbl.increments();
        tbl.text('make', 128).notNullable();
        tbl.text('model', 128).notNullable();
        tbl.text('vin', 128).notNullable();
        tbl.integer('mileage').notNullable();
        tbl.text('transmissionType');
        tbl.text('titleStatus');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
