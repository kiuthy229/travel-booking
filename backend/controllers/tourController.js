import Tour from '../models/Tour.js';
import Review from '../models/Review.js';

// Create a new tour
export const createTour = async (req, res) => {
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
export const getAllTours = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sort,
    city,
    distance,
    maxGroupSize,
    ...filters
  } = req.query;

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

    // Build query with filters
    const query = Tour.find(filters);

    // Apply sorting if specified
    if (sort) {
      query.sort(sort);
    }

    // Apply pagination
    const skip = (page - 1) * limit;
    query.skip(skip).limit(parseInt(limit)).populate('reviews');

    // Execute query
    const tours = await query;

    // Get total count for pagination metadata
    const total = await Tour.countDocuments(filters);

    res.status(200).json({
      success: true,
      message: 'Tours retrieved successfully',
      data: tours,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .limit(8)
      .populate('reviews');

    res.status(200).json({
      success: true,
      message: 'Tours retrieved successfully',
      data: tours,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// Get a single tour by ID
export const getTourById = async (req, res) => {
  const { tourId } = req.params;

  try {
    const tour = await Tour.findById(tourId).populate('reviews');
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: 'Tour not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Tour retrieved successfully',
      data: tour,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to retrieve tour' });
  }
};

// Get reviews for a specific tour
export const getTourReviews = async (req, res) => {
  const { tourId } = req.params;

  try {
    const tour = await Tour.findById(tourId).populate('reviews');
    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: 'Tour not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Reviews retrieved successfully',
      data: tour.reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve reviews',
      error: err.message,
    });
  }
};

// Update a tour
export const updateTour = async (req, res) => {
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
    res.status(200).json({
      success: true,
      message: 'Tour updated successfully',
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update tour' });
  }
};

// Delete a tour
export const deleteTour = async (req, res) => {
  const { tourId } = req.params;

  try {
    const deletedTour = await Tour.findByIdAndDelete(tourId);
    if (!deletedTour) {
      return res
        .status(404)
        .json({ success: false, message: 'Tour not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete tour' });
  }
};

// Create a review for a tour
export const createReview = async (req, res) => {
  const { tourId } = req.params;
  const newReview = new Review({ productId: tourId, ...req.body });
  const { username, reviewText, rating } = req.body;

  try {
    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(tourId, {
      $push: { review: savedReview._id },
    });

    // Update the tour's average rating
    const tour = await Tour.findById(tourId);
    const totalReviews = tour.reviews.length + 1;
    const totalRating =
      tour.reviews.reduce((sum, review) => sum + review.rating, 0) + rating;
    tour.averageRating = totalRating / totalReviews;
    tour.reviews.push(newReview._id);

    await newReview.save();
    await tour.save();

    res.status(200).json({
      success: true,
      message: 'Review added successfully',
      data: savedReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to add review',
      error: err.message,
    });
  }
};
