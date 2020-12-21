
exports.up = function(knex) {
    return knex.schema.createTable('sales', tbl => {
        // Primary key
        tbl.increments('id');
        tbl.integer('car_id').references('id').inTable('cars').notNullable().onDelete('cascade');
        tbl.boolean('sold').notNullable();
        tbl.integer('price');
        tbl.text('buyer', 128);
        tbl.text('date');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('sales');
};
