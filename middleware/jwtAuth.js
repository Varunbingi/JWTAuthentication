const JWT = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {


    // Extract token from cookies
    const token = (req.cookies && req.cookies.token) || null;
    

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Not authorized",
        });
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);

        // Set user details in request object
        req.user = {
            id: payload.id,
            email: payload.email,
        };
    } catch (e) {
        // Log the error for debugging
        console.error('JWT Verification Error:', e);
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }

    // Proceed to the next middleware
    next();
}

module.exports = jwtAuth;
