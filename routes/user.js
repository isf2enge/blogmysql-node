//frameworks
const express = require('express')
const app = express()
const registros = require('../model/registros')
const bcrypt = require('bcryptjs')
const passport = require('passport')



//rotas
    app.get('/login',(req,res)=>{

        res.render('home/login/Login')
    })

    app.get('/registro',(req,res)=>{

        res.render('home/login/registro')
    })

    app.post('/registred',(req,res)=>{

        registros.findOne({where:{'Email': req.body.Email}}).then((registross)=>{
            if(registross){

               req.flash('error_msg','Email já registrado,tente outro')
               res.redirect('/user/registro')
            }
            else{

                bcrypt.hash(req.body.Senha,8,(Err,hash)=>{

                    if(Err){
                        req.flash('error_msg','Error')
                        res.redirect('/user/registro')
                    }

                    else{

                        req.body.Senha = hash

                        registros.create({Nome: req.body.Nome,Email: req.body.Email,Senha: req.body.Senha}).then(()=>{

                            req.flash('success_msg','Registro feito com sucesso')
                            res.redirect('/')
                        })
                    }
                })


            }

        })
    })

    

    app.post('/confered',(req,res,next)=>{

        passport.authenticate( 'local',{
            successRedirect: '/',
            failureRedirect: '/user/login',
            failureFlash: true
        })(req,res,next)
    })

    app.get('/logout',(req,res)=>{

       req.logout(()=>{

        req.flash('success_msg','Deslogado com sucesso')
        res.redirect('/')
       })
    })

//Module-exports
module.exports = app