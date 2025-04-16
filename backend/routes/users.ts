import express, { Request, Response } from 'express';
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
router.get('/', verifyAdmin, (req: Request, res: Response): void => {
  getAllUsers(req, res);
});

// Get a user by ID
router.get('/:userId', verifyUser, (req: Request, res: Response): void => {
  getUserById(req, res);
});

// Delete a user
router.delete('/:userId', verifyUser, (req: Request, res: Response): void => {
  deleteUser(req, res);
});

// Update a user
router.patch('/:userId', verifyUser, (req: Request, res: Response): void => {
  updateUser(req, res);
});

// Search users by name or email
router.get('/search', verifyAdmin, (req: Request, res: Response): void => {
  searchUsers(req, res);
});

// Get bookings of user
router.get(
  '/:userId/bookings',
  verifyUser,
  (req: Request, res: Response): void => {
    getBookingsOfUser(req, res);
  }
);

export default router;
