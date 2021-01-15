const jwt = require('JsonWebToken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    
    // if we have a token, check it
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            // if we get an error, they its not valid and display error
            if(err) {
                res.status(401).json({ error: "They climbing in your window. Snatching your people up. Hide your kids, hide your wife, hide your password."})
            } else { // if no error then proceed
                next()
            }
        })
    } else { //if we dont have a token then display error 
		res.status(401).json({ message: "what is the flight speed of an unladen swallow?"})
    }
}