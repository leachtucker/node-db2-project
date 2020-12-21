
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {make: 'Dodge', model: "Challenger", vin: "FF60432LP21E", mileage: 15000},
        {make: 'Ford', model: "Mustang", vin: "FF60432LP21E", mileage: 10000, transmissionType: "Manual", titleStatus: "Clean"},
        {make: 'Chevrolet', model: "Corvette", vin: "FF60432LP21E", mileage: 50000, transmissionType: "Auto"},
        {make: 'Chevrolet', model: "Camaro", vin: "FF60432LP21E", mileage: 1200, titleStatus: "Clean"},
      ]);
    });
};
