import { Request, Response } from 'express';
import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-03-31.basil',
});

export const processPayment = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { userId, bookingId, amount, currency, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    const newPayment = new Payment({
      userId,
      bookingId,
      amount,
      currency,
      paymentStatus: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
    });

    await newPayment.save();

    return res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      paymentIntent,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Payment processing failed',
      error: err.message,
    });
  }
};
