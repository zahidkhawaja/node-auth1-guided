const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Tokens are usually sent as the auth header
    const token = req.headers.authorization;

    const secret = process.env.JWT_SECRET || "blahblahblah";
    
    if(token) {

    // Verify token
    jwt.verify(token, secret, (error, decodedToken) => {
        // If token is good, the error will be undefined
        if(error) {
            res.status(401).json({ message: "Cannot pass!" })
        } else {
            req.decodedToken = decodedToken;
            next();
        }
});
} else {
    res.status(400).json({ message: "Please provide credentials" })
}
};