const jwt = require('jsonwebtoken')
require('dotenv').config()


// TODO this will let you access to the protected routes if ur token is valid

module.exports = function(req, res, next) {

          //this middleware will continue on if the token is inside the localStorage(at the frontEnd or BackENd)
          // Get token from header
          const token = req.header("token");
          
          if (!token) {      
            return res.status(403).json({ msg: "authorization denied" });
            }

          try {
               
                const payload = jwt.verify(token, process.env.jwtSecret);          
                req.user = payload.user;
                
                next();
        
        } catch (err) {
            res.status(401).json({ msg: "Token is not valid" });
        }
    };