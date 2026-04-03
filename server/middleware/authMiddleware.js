const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Check if Authorization header exists and starts with "Bearer"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  // Extract the token (remove "Bearer " prefix)
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user's id to the request so routes can use it
    req.userId = decoded.id;

    next(); // move on to the actual route handler
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

module.exports = protect;