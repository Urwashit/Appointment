import { Request, Response, NextFunction } from "express";
import { getToken, verifyToken } from "./auth.service";
import { findOne, create } from "../dao/user.dao";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const userFound = await findOne({
    email: email.toLowerCase(),
  });
  if (userFound) {
    if (password === userFound.password) {
      const token = getToken(userFound);
      return res.status(200).json({ accessToken: token, user: userFound });
    } else {
      return res.status(400).json({ error: "Wrong credentials." });
    }
  } else {
    return res.status(404).json({ error: "User doesn't exist" });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receivedToken = req.headers?.authorization || null;
  const verify = verifyToken(receivedToken);
  if (verify == undefined || verify == null || verify == "") {
    console.error(`GetUser User : Unauthorized access token`);
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    const user = await findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    } else {
      return res.status(200).json(user);
    }
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, phoneNo, address } = req.body;
  const userFound = await findOne({
    $or: [{ email: email.toLowerCase() }, { phoneNo: phoneNo }],
  });

  if (userFound) {
    console.error(`User with given email and phone number alredy exists`);
    return res
      .status(400)
      .json({ error: `User with given email and phone number alredy exists` });
  }
  const user = await create({
    name,
    email: email.toLowerCase(),
    password,
    address,
    phoneNo,
  });

  const token = getToken(user);

  return res.status(200).json({ accessToken: token, user });
};
