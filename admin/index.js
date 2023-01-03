//exports
    module.exports = {

        eAdmin: (req,res,next)=>{

            if(req.isAuthenticated() && req.user.eAdmin ===1){
                return next()
            }
            else{

                req.flash('error_msg','Acesso negado,você não é admin')
                res.redirect('/')
            }
        }
    }

   