"use strict";
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var dummyJSON = [];
    for (var i = 0; i < 20; i++) {
      dummyJSON.push({
        Name: faker.name.lastName(),
        email: faker.internet.email(),
        age: faker.datatype.number({
          min: 18,
          max: 70,
        }),
        dob: faker.date.past(),
        address:
          faker.address.streetName() +
          " " +
          faker.address.streetAddress() +
          " " +
          faker.address.city(),
      });
    }
    return queryInterface.bulkInsert("Employees", dummyJSON, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
