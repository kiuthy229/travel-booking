import { Request, Response } from 'express';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

// Get all tours booked by a user
export const getBookingsOfUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate(
      'tourId'
    );
    return res.status(200).json({ success: true, data: bookings });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: err.message,
    });
  }
};

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to retrieve users' });
  }
};

// Get a user by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to retrieve user' });
  }
};

// Delete a user
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to delete user' });
  }
};

// Update a user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to update user' });
  }
};

// Search users by name or email
export const searchUsers = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { query } = req.query as { query: string };

  try {
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    });

    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to search users' });
  }
};
