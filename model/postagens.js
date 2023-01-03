//Config

    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('Irineu','root','89781258b',{

        host: 'localhost',
        dialect: 'mysql',
        query: {raw: true}
    })
    const posts = sequelize.define('Posts',{
        Titulo: {type:Sequelize.STRING},
        Conteudo: {type: Sequelize.STRING}

    })

    




//Exports

    module.exports = posts
   

   