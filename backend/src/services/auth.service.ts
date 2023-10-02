import * as jwt from "jsonwebtoken";

export const getToken = (user: any) => {
  const payLoad = { userId: user.userId, roles: user.userRoles };
  const options = {
    expiresIn: "1h",
    issuer: "appointment",
  };

  return jwt.sign(payLoad, process.env.JWT_TOKEN || "", options);
};

export const verifyToken = (receivedToken: any) => {
  if (!receivedToken) {
    console.log(`token not found`);
    return console.error("Invalid Request.");
  } else {
    try {
      let token = ``;
      if (receivedToken.startsWith("Bearer")) {
        token = receivedToken.split(" ")[1];
      } else {
        token = receivedToken;
      }
      const verifed = jwt.verify(token, process.env.JWT_TOKEN || "");
      return verifed;
    } catch (e) {
      console.error(`Auth : Unauthorized access token`, e);
      return console.error("Unauthorized access token.");
    }
  }
};
