import express from 'express';
import {
  createTour,
  getAllTours,
  getFeaturedTours,
  getTourById,
  getTourReviews,
  updateTour,
  deleteTour,
  createReview,
} from '../controllers/tourController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new tour
router.post('/', verifyAdmin, createTour);

// Get all tours with pagination, sorting, and filtering
router.get('/', getAllTours);

// Get featured tours
router.get('/featured', getFeaturedTours);

// Get a single tour by ID
router.get('/:tourId', getTourById);

// Route to get reviews for a specific tour
router.get('/:tourId/reviews', getTourReviews);

// Update a tour
router.put('/:tourId', verifyUser, updateTour);

// Delete a tour
router.delete('/:tourId', verifyUser, deleteTour);

// Create a review for a tour
router.post('/:tourId/reviews', verifyUser, createReview);

export default router;