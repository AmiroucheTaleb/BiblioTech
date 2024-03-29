import jwt from "jsonwebtoken";

export const auth = (roles) => {
  return (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken)
      return res.status(400).json({ error: "user not authenticated" });
    try {
      const validToken = jwt.verify(accessToken, "messagesecret");
      if (validToken && roles.includes(validToken.role)) {
        res.locals.user_id = validToken.id;
        return next();
      } else if (validToken && !roles.includes(validToken.role)) {
        res.status(401).json("action not Authorized");
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  };
};
