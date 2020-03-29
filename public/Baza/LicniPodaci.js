const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const podaci = sequelize.define("licniPodaci",{
        imePrezime:{ type:Sequelize.STRING },
        korisnickoIme:{type:Sequelize.STRING},
        index:{type:Sequelize.STRING},
        grupa:{type:Sequelize.INTEGER},
        akGodina:{type:Sequelize.STRING}, //provjeri
        nazivRepozitorija:{type:Sequelize.STRING},
        //password:{type:Sequelize.STRING},
        bitBucket:{type:Sequelize.STRING},
        ssh:{type:Sequelize.STRING},
        mail:{type:Sequelize.STRING},
        regex:{type:Sequelize.STRING},
        semestar:{type:Sequelize.INTEGER},
    })

    return podaci;
};