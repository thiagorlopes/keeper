'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users','reset_password_token', {
        type: Sequelize.STRING,
    }),
      queryInterface.addColumn('Users','reset_password_expires', {
        type: Sequelize.DATE,
    })
  ]);
},

down: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users','reset_pasword_token',),
      queryInterface.removeColumn('Users','reset_password_expires',)
    ]);
  } 
};
