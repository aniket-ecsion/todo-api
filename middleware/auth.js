import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token,{ userID: findUser._id }, process.env.JWT_SCREAT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};
