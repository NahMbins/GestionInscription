const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id},process.JWT_SECRET,{
        expiresIn: "1h",
    });
};

module.exports = generateToken;