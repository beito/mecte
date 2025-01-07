const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log(req.headers['authorization'])
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].replace("Bearer ", "");
        if (!token) {
            return res.status(403).send({ auth: false, title: "Unauthorized", message: "Unauthorized Resource", code: 1 });
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send({ auth: false, title: "Unauthorized", message: "Unauthorized Resource", code: 2 });
            }
            if (decoded.id && decoded.role === 1) {
                req.userId = decoded.id;
                req.userRole = decoded.role;
                next();
            } else {
                return res.status(403).send({ auth: false, title: "Unauthorized", message: "Unauthorized Resource", code: 3 });
            }
        });
    } else {
        return res.status(403).send({ auth: false, title: "Unauthorized", message: "Unauthorized Resource", code: 4 });
    }
}

module.exports = verifyToken;