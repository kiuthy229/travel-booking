import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { BASE_URL } from '../utils/config';
import '../styles/checkout.css';

const stripePromise = loadStripe(
  process.env.STRIPE_SECRET_KEY ||
    'pk_test_51RDzqvRu7ZqiiK5zd2lHzxZ1RnER21kCrNzdYho3oaLHjXnz0xGtaSzpr9Fa0RFciN4men8KgNPuod3lK6idco9h001yVaPQAK'
);

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    []
  );

  return options;
};

const SplitForm = ({ onPaymentMethodCreated }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [cardErrors, setCardErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const handleCardChange = (field, event) => {
    if (event.error) {
      setCardErrors((prev) => ({ ...prev, [field]: event.error.message }));
    } else {
      setCardErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      alert('Stripe.js has not loaded yet.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      console.error('[PaymentMethod Error]', error);
      console.log(error.message);
    } else if (paymentMethod) {
      console.log('[PaymentMethod]', paymentMethod);
      onPaymentMethodCreated(paymentMethod.id);
      console.log('Payment method created successfully!');
    } else {
      console.log('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form className='split-form' onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement
          options={options}
          onChange={(event) => handleCardChange('cardNumber', event)}
        />
        {cardErrors.cardNumber && (
          <p className='error-message'>{cardErrors.cardNumber}</p>
        )}
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={options}
          onChange={(event) => handleCardChange('expiryDate', event)}
        />
        {cardErrors.expiryDate && (
          <p className='error-message'>{cardErrors.expiryDate}</p>
        )}
      </label>
      <label>
        CVC
        <CardCvcElement
          options={options}
          onChange={(event) => handleCardChange('cvc', event)}
        />
        {cardErrors.cvc && <p className='error-message'>{cardErrors.cvc}</p>}
      </label>
      <button disabled={!stripe} type='submit'>
        Verify
      </button>
    </form>
  );
};

const Checkout = () => {
  const location = useLocation();
  const { tourId, title, price, guestSize, date } = location.state || {};
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!paymentMethodId) {
      alert('Please create a payment method first.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const userString = localStorage.getItem('user'); // Retrieve user object from localStorage
      const userId = userString ? JSON.parse(userString)._id : null; // Parse and extract user ID

      if (!userId) {
        alert('User not logged in.');
        return;
      }

      const response = await fetch(`${BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          bookingId: tourId,
          amount: price * guestSize + 10,
          currency: 'usd',
          paymentMethodId: paymentMethodId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Payment successful!');
        navigate('/thank-you');
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <section className='checkout'>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <h2 className='checkout__title'>Checkout</h2>
            <div className='booking__summary'>
              <h5>Booking Summary</h5>
              <p>
                <strong>Tour:</strong> {title}
              </p>
              <p>
                <strong>Travelers:</strong> {guestSize}
              </p>
              <p>
                <strong>Booking Date:</strong> {date}
              </p>
              <p>
                <strong>Total Price:</strong> ${price * guestSize + 10}
              </p>
            </div>
            <Elements stripe={stripePromise}>
              <SplitForm onPaymentMethodCreated={setPaymentMethodId} />
            </Elements>
            <Button
              color='primary'
              className='btn primary__btn w-100 mt-4'
              onClick={handlePayment}
              disabled={!paymentMethodId}
            >
              Confirm Payment
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
