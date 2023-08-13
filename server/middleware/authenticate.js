const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const authenticate = async (req,res,next) => {
    try {
        if(req.headers['cookie'] && req.headers['cookie'].includes('jwt_token')) {
            const token = req.headers['cookie'].split('=')[1];
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
            const rootUser = await User.findById(verifyToken._id);
            if(!rootUser){
                res.status(401).send('Unauthorized: No token provided');
            }
            req.token = token;
            req.rootUser = rootUser;
            req.userID = rootUser._id;
            res.status(200).json("User authenticated");
            next();
        }
        else {
            res.status(401).send('Unauthorized: No token provided');
        }
    } catch (error) {
        res.status(401).send('Unauthorized: No token provided');
        console.log(error);
        next(error);
    }
}

module.exports = authenticate;