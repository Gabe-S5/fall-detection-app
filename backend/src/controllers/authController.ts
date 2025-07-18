import { Request, Response } from "express";
import { User } from "../models/user";

export const login = async (req: Request, res: Response) => {
  const { uid } = (req as any).user;
  const { email } = req.body;

  try {
    let user = await User.findOne({ where: { firebaseUid: uid } });

    if (!user) {
      user = await User.create({ firebaseUid: uid, email });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};
