import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
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

    res.status(200).json({ success: true, message: 'Successfully created' });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to create. Try again' });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const { password, role, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res
      .cookie('accessToken', token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        role,
        success: true,
        message: 'successfully login',
        data: { ...rest },
      });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        photo: user.photo,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
