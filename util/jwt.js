const jwt = require('jsonwebtoken');

exports.jwtSign = async(payload)=>{
    const secret = process.env.JWT_SECRET_KEY||"";
    const options = { expiresIn: '' };
    
    const token = jwt.sign(payload, secret);
    return token;
}

exports.verifyJwt = async (req, res,next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
        try {
        const secret = process.env.JWT_SECRET_KEY||"";
        token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json("No token found")
        } else {
          const decoded = jwt.verify(token, secret);
  
            if (!decoded) {
                return res.status(401).json("Invalid token");
            }

            req.user = decoded;
            next();
         
        }
      } catch (error) {
        return res.status(401).send(error?.message);
      }
    } else {
        return res.status(401).json("You are not loggedIn")
    }
}