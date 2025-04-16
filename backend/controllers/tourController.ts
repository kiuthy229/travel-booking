import { Request, Response } from 'express';
import Tour from '../models/Tour.js';
import Review from '../models/Review.js';

// Create a new tour
export const createTour = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: 'Successfully created',
      data: savedTour,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to create. Try again' });
  }
};

// Get all tours with pagination, sorting, and filtering
export const getAllTours = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    page = 1,
    limit = 10,
    sort,
    city,
    distance,
    maxGroupSize,
    ...filters
  } = req.query as Record<string, any>;

  try {
    if (city) {
      filters.city = { $regex: String(city), $options: 'i' };
    }

    if (distance) {
      filters.distance = { $gte: parseInt(distance) };
    }

    if (maxGroupSize) {
      filters.maxGroupSize = { $gte: parseInt(maxGroupSize) };
    }

    const query = Tour.find(filters);

    if (sort) {
      query.sort(sort);
    }

    const skip = (Number(page) - 1) * Number(limit);
    query.skip(skip).limit(Number(limit)).populate('reviews');

    const tours = await query;
    const total = await Tour.countDocuments(filters);

    res.status(200).json({
      success: true,
      message: 'Tours retrieved successfully',
      data: tours,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get featured tours
export const getFeaturedTours = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tours = await Tour.find({ featured: true })
      .limit(8)
      .populate('reviews');

    res.status(200).json({
      success: true,
      message: 'Tours retrieved successfully',
      data: tours,
    });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// Get a single tour by ID
export const getTourById = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { tourId } = req.params;

  try {
    const tour = await Tour.findById(tourId).populate('reviews');
    if (!tour) {
      res.status(404).json({ success: false, message: 'Tour not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Tour retrieved successfully',
      data: tour,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to retrieve tour' });
  }
};

// Get reviews for a specific tour
export const getTourReviews = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { tourId } = req.params;

  try {
    const tour = await Tour.findById(tourId).populate('reviews');
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: 'Tour not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Reviews retrieved successfully',
      data: tour.reviews,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve reviews',
      error: err.message,
    });
  }
};

// Update a tour
export const updateTour = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { tourId } = req.params;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(tourId, req.body, {
      new: true,
    });
    if (!updatedTour) {
      return res
        .status(404)
        .json({ success: false, message: 'Tour not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Tour updated successfully',
      data: updatedTour,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to update tour' });
  }
};

// Delete a tour
export const deleteTour = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { tourId } = req.params;

  try {
    const deletedTour = await Tour.findByIdAndDelete(tourId);
    if (!deletedTour) {
      return res
        .status(404)
        .json({ success: false, message: 'Tour not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Tour deleted successfully',
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to delete tour' });
  }
};

// Create a review for a tour
export const createReview = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { tourId } = req.params;
  const newReview = new Review({ productId: tourId, ...req.body });

  try {
    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(tourId, {
      $push: { review: savedReview._id },
    });

    const tour = await Tour.findById(tourId).populate('reviews');
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: 'Tour not found' });
    }

    tour.reviews.push(newReview._id);

    await newReview.save();
    await tour.save();

    return res.status(200).json({
      success: true,
      message: 'Review added successfully',
      data: savedReview,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add review',
      error: err.message,
    });
  }
};
