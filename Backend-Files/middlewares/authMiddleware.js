const jwt = require('jsonwebtoken');

const authenticateToken  = (req, res, next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: " Access Denied. No token provied."
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
};

module.exports = authenticateToken;