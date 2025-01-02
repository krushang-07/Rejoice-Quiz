import jwt from "jsonwebtoken";

// Middleware to authenticate the JWT token
export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract the token from the header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "aaaaaaa");
    req.user = decoded;
    //console.log(decoded);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Access denied. You don't have the required role." });
    }
    next();
  };
};

export const authenticateAdminToken = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden. Admin access required." });
    }
    next();
  });
};

// Middleware to check if the user is a regular user
export const authenticateUserToken = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.role !== "user") {
      return res
        .status(403)
        .json({ message: "Forbidden. User access required." });
    }
    next();
  });
};
