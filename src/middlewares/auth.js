const authMiddleware = (req, res, next) =>{
    if(req.session?.nombre){
        next()
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    authMiddleware
}