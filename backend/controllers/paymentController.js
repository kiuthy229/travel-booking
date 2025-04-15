import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  const { userId, bookingId, amount, currency, paymentMethodId } = req.body;

  try {
    // Create a payment intent with automatic payment methods enabled
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit
      currency,
      payment_method: paymentMethodId,
      confirm: true, // Automatically confirm the payment
      automatic_payment_methods: {
        enabled: true, // Enable automatic payment methods
        allow_redirects: 'never', // Disable redirect-based payment methods
      },
    });

    // Save payment details in the database
    const newPayment = new Payment({
      userId,
      bookingId,
      amount,
      currency,
      paymentStatus: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
    });

    await newPayment.save();

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      paymentIntent,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Payment processing failed',
      error: err.message,
    });
  }
};
