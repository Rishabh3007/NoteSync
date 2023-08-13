const jwt = require('jsonwebtoken');


const fetchuser = async (req, res, next) => {
    try {
        if(req.headers['cookie'] && req.headers['cookie'].includes('jwt_token')) {
            const token = req.headers['cookie'].split('=')[1];
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
            if(!verifyToken){
                res.status(401).send('Unauthorized: No token provided');
            }
            req.userID = verifyToken._id;
            next();
        }
        else {
            res.status(401).send('Unauthorized: No token provided');
        }
    } catch (error) {
        res.status(401).send('Unauthorized: No token provided');
    }
}

module.exports = fetchuser;