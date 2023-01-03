//frameworks
    const express = require('express')
    const app = express()
    const admin = require('./routes/admin')
    const users = require('./routes/user')
    const handlebars = require('express-handlebars')
    const bodyparser = require('body-parser')
    const session = require('express-session')
    const flash =  require('connect-flash')
    const passport = require('passport')
    require('./help/auth')(passport)
    

    





//Config
    //Template Engine
        app.engine('handlebars',handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine','handlebars')
    //body parser
        app.use(bodyparser.urlencoded({extended: true}))
        app.use(bodyparser.json())
    //session config
        app.use(session({

            secret: 'Vencedor',
            resave: true,
            saveUninitialized: true
        }))

    
    //passport
        app.use(passport.initialize())
        app.use(passport.session())
    //flash
        app.use(flash())

    //middleware
        app.use((req,res,next)=>{

            res.locals.error_msg = req.flash('error_msg')
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error = req.flash('error')
            res.locals.user = req.user || null
            next()
        })
   




//Routes
    app.get('/',(req,res)=>{
        res.render('home/home')
    })



//Other routes
    app.use('/admin',admin)
    app.use('/user',users)

//Express-conection
    app.listen(8081,()=>{

        console.log('Servidor criado!')
    })