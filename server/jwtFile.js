const jwt = require('jsonwebtoken')

require('dotenv').config()


const jwtFunction = (loger_id) => {
          
      return jwt.sign({user: loger_id}, process.env.jwtSecret, { expiresIn: "1h" });
      
    }

module.exports = jwtFunction