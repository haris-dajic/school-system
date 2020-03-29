const Sequelize = require("sequelize");
//const baza = require("./baza.js");

module.exports = function(sequelize,DataTypes){
    const Role = sequelize.define("role",
    {
        tip:{type:Sequelize.STRING}
    })
    return Role;
};
//1- admin
//2 - prof
//3 - stud