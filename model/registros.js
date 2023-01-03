//Config

    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('Irineu','root','89781258b',{

        host: 'localhost',
        dialect: 'mysql',
        query: {raw: true}
    })
    const registros = sequelize.define('Registros',{
        Nome: {type:Sequelize.STRING},
        Email: {type: Sequelize.STRING},
        Senha: {type: Sequelize.STRING},
        eAdmin: {type: Sequelize.INTEGER,default: 0}

    })


//MODULE EXPORTS
    module.exports = registros


