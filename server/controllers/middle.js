// authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getJwt } = require("../controllers/jwt/jwtAuth");

const requireAuth = (req, res, next) => {
    const token = getJwt(req);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error("Failed to verify JWT token: ", err.message);
                return res.status(401).json({ error: "Unauthorized" });
            } else {
                res.locals.token = decodedToken;
                next();
            }
        });
    } else {
        console.error("No JWT provided in request.");
        return res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = { requireAuth };
