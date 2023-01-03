//frameworks
    const express = require('express')
    const app = express()
    const admin = require('../model/postagens')
    const {eAdmin} = require('../admin/index')


//rotas
    app.get('/postagens',eAdmin,(req,res)=>{

        res.render('home/posts/postagens')
    })
    
    app.post('/posted',(req,res)=>{
        admin.create({Titulo: req.body.Titulo,Conteudo: req.body.Conteudo}).then(()=>{
            req.flash('success_msg','Post criado com sucesso')
            res.redirect('/admin/listamento')
        })

    })

    app.get('/listamento',(req,res)=>{

        admin.findAll().then((admins)=>{

            res.render('home/posts/listamento',{admins:admins})
        })
    })

    app.get('/delete/:id',(req,res)=>{

        admin.destroy({where : {'id': req.params.id}}).then(()=>{
            req.flash('success_msg','Post deletado com sucesso')
            res.redirect('/admin/listamento')
        })
    })

    app.get('/edit/:id',(req,res)=>{
        admin.findAll({where: {'id': req.params.id}}).then((admins)=>{
            res.render('home/posts/edition',{admins:admins})

        })
       
    })

    app.post('/edited',(req,res)=>{

        admin.update({Titulo: req.body.Titulo,Conteudo: req.body.Conteudo},{where:{'id':req.body.id}}).then(()=>{

            req.flash('success_msg','Atualização deu certo')
            res.redirect('/admin/listamento')
        })
    })


    

//Module-exports
    module.exports = app