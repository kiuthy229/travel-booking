import { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ success: true, message: 'Successfully created' });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to create. Try again' });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const { password, role, ...rest } = (user as any)._doc;

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return res
      .cookie('accessToken', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000), // 1 hour
      })
      .status(200)
      .json({
        token,
        role,
        success: true,
        message: 'Successfully logged in',
        data: { ...rest },
      });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: 'Something went wrong' });
  }
};
