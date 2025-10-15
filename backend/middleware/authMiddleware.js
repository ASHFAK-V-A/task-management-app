import jwt from "jsonwebtoken";

// middlware to protect routes
export const requireAuth = (req, res, next) => {
  try {
    // get authorization header
    const authHeader = req.headers.authorization;

    //if header missing or format wrong then reject request
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization missing" });
    }
    
    //extract token
    const token = authHeader.split(" ")[1];

    //verify token using secret key
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //attach user info to requested user
    req.user = { id: payload.id, email: payload.email };

    //allow request to continue
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
