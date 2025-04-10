import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/checkout.css';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const navigate = useNavigate();

  const handlePayment = () => {
    if (paymentMethod === 'paypal') {
      alert('Redirecting to PayPal...');
      // Implement PayPal integration here
    } else if (paymentMethod === 'creditCard') {
      alert('Processing credit card payment...');
      // Implement credit card payment processing here
    } else if (paymentMethod === 'deposit') {
      alert('Deposit payment confirmed.');
      // Implement deposit payment logic here
    }
    navigate('/thank-you');
  };

  return (
    <section className='checkout'>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <h2 className='checkout__title'>Checkout</h2>
            <Form>
              <FormGroup>
                <h5>Select Payment Method</h5>
                <div className='payment__options'>
                  <label>
                    <Input
                      type='radio'
                      name='paymentMethod'
                      value='paypal'
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    PayPal
                  </label>
                  <label>
                    <Input
                      type='radio'
                      name='paymentMethod'
                      value='creditCard'
                      checked={paymentMethod === 'creditCard'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Credit Card
                  </label>
                  <label>
                    <Input
                      type='radio'
                      name='paymentMethod'
                      value='deposit'
                      checked={paymentMethod === 'deposit'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Deposit
                  </label>
                </div>
              </FormGroup>
              <Button
                color='primary'
                className='btn primary__btn w-100 mt-4'
                onClick={handlePayment}
              >
                Confirm Payment
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
