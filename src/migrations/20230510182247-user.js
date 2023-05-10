'use strict';
/** 
 * @type {import('sequelize-cli').Migration}
 * @param {import('Sequelize')} 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns 
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      displayName: {
        type: Sequelize.STRI
      },
      email: {

      },
      password: {

      },
      image:{

      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
};
