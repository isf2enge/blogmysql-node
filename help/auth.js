//frameworks

    const strategyLocal = require('passport-local').Strategy
    const user = require('../model/registros')
    const bcrypt = require('bcryptjs')

//module-exports
    module.exports = (passport)=>{

        passport.use(new strategyLocal({usernameField: 'Email',passwordField: 'Senha'},(Email,Senha,done)=>{
            user.findOne({where:{Email:Email}}).then((users)=>{
                if(!users){
                    return done(null,false,{message: 'Usuario não existe'})
                }
                bcrypt.compare(Senha,users.Senha,(Err,batem)=>{
                    if(batem){

                        return done(null,users)
                    }
                    else{

                        return done(null,false,{message: 'Senha incorreta'})
                    }

                })

            })

        }))
        passport.serializeUser((user,done)=>{

            done(null,user.id)
        })
        passport.deserializeUser((id,done)=>{

            user.findByPk(id).then((users)=>{

                done(null,users)
            })
        })
    }