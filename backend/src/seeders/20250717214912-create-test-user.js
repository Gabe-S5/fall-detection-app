"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        id: Sequelize.literal("uuid_generate_v4()"),
        firebaseUid: "rmNaOGsBYwgIlxuaWUcXTwlmcah1",
        email: "test@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", {
      firebaseUid: "rmNaOGsBYwgIlxuaWUcXTwlmcah1",
    });
  },
};
