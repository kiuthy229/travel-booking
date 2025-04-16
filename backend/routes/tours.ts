import express, { Request, Response } from 'express';
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
router.post('/', verifyAdmin, (req: Request, res: Response) => {
  createTour(req, res);
});

// Get all tours with pagination, sorting, and filtering
router.get('/', (req: Request, res: Response) => {
  getAllTours(req, res);
});

// Get featured tours
router.get('/featured', (req: Request, res: Response) => {
  getFeaturedTours(req, res);
});

// Get a single tour by ID
router.get('/:tourId', (req: Request, res: Response) => {
  getTourById(req, res);
});

// Route to get reviews for a specific tour
router.get('/:tourId/reviews', (req: Request, res: Response) => {
  getTourReviews(req, res);
});

// Update a tour
router.put('/:tourId', verifyUser, (req: Request, res: Response) => {
  updateTour(req, res);
});

// Delete a tour
router.delete('/:tourId', verifyUser, (req: Request, res: Response) => {
  deleteTour(req, res);
});

// Create a review for a tour
router.post('/:tourId/reviews', verifyUser, (req: Request, res: Response) => {
  createReview(req, res);
});

export default router;
