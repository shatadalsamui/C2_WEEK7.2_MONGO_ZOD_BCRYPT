const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library to handle JWT operations
const JWT_SECRET = "s3cret"; // Define a secret key for signing and verifying JWTs

function auth(req, res, next) {
    const token = req.headers.authorization; // Extract the token from the Authorization header of the request

    const response = jwt.verify(token, JWT_SECRET); // Verify the token using the secret key

    if (response) {
        req.userId = response.id; // If the token is valid, attach the user ID from the token to the request object
        next(); // Proceed to the next middleware or route handler
    } else {
        res.status(403).json({
            message: "Incorrect credentials" // If the token is invalid, return a 403 Forbidden status with an error message
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET // Export the auth function and JWT_SECRET for use in other files
}