const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Korisnik = sequelize.define("korisnik",{
        ime:{ type:Sequelize.STRING },
        sifra:{type: Sequelize.STRING},
        verified:{type:Sequelize.INTEGER}
    })
    return Korisnik;
};