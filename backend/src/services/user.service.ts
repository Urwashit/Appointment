import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
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
      res.status(200).json({ accessToken: token, user: userFound });
    } else {
      res.status(400).json({ error: "Wrong credentials." });
    }
  } else {
    res.status(400).json({ error: "User doesn't exist" });
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
      res.redirect("/");
    } else {
      res.status(200).json(user);
    }
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, emailId, password } = req.body;

  const userFound = await findOne({
    $or: [{ email: emailId.toLowerCase() }],
  });

  if (userFound) {
    console.error(`User with given email and phone number alredy exists`);
    return res
      .status(400)
      .json({ error: `User with given email and phone number alredy exists` });
  }

  const user = await create({
    name,
    email: emailId.toLowerCase(),
    password,
  });

  return res.status(200).json(user);
};
