
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        {car_id: 1, sold: true, price: 35000},
        {car_id: 2, sold: true, price: 37000, date: new Date().toDateString()},
        {car_id: 3, sold: true, date: new Date().toDateString()},
        {car_id: 4, sold: false},
      ]);
    });
};
