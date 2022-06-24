const { promisify } = require("util");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isLoggedIn = async ( req, res, next ) => {
    //check if the 'jwt' cookie exists
    if( req.cookies.jwt ){
        //verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)
        console.log(decoded);

        const theUser = await User.findById(decoded.id);
        console.log(theUser)

        req.foundUser = theUser;
        req.userId = decoded.id; 
    }
    next();
}

exports.logout = (req,res,next) => {
    res.cookie('jwt', 'logout', {
        expires: new Date( Date.now() + 2*1000),
        httpOnly: true
    })
    next();
}