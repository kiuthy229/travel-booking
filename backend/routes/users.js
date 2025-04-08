import express from 'express';
import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  searchUsers,
  getBookingsOfUser,
} from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Get all users
router.get('/', verifyAdmin, getAllUsers);

// Get a user by ID
router.get('/:userId', verifyUser, getUserById);

// Delete a user
router.delete('/:userId', verifyUser, deleteUser);

// Update a user
router.patch('/:userId', verifyUser, updateUser);

// Search users by name or email
router.get('/search', verifyAdmin, searchUsers);

//Get bookings of user
router.get('/:userId/bookings', verifyUser, getBookingsOfUser);

export default router;
