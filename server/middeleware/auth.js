const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("Authorization Header:", req.header("Authorization"));
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded Token:", decode);
        req.user=decode;
        next();
    }catch(err){
        console.error("Token verification failed:", err);
        res.status(401).json({ message: "Token is not valid" });
    }
}

module.exports = auth;