import express from 'express';
import {
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  getAllTours,
  getFeaturedTours,
  createReview,
} from '../controllers/tourController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new tour
router.post('/', verifyAdmin, createTour);

// Get all tours
router.get('/', verifyUser, getAllTours);

// Get a single tour by ID
router.get('/:tourId', verifyUser, getTourById);

// Update a tour
router.patch('/:tourId', verifyAdmin, updateTour);

// Delete a tour
router.delete('/:tourId', verifyAdmin, deleteTour);

// Get featured tours only
router.get('/s/featured', verifyUser, getFeaturedTours);

// Create a review for a tour
router.post('/:tourId/reviews', verifyUser, createReview);

export default router;
