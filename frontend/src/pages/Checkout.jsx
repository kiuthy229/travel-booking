import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import '../styles/checkout.css';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    alert(`You selected ${paymentMethod} as your payment method.`);
  };

  return (
    <section className='checkout'>
      <Container>
        <Row>
          <Col lg='8'>
            <h2 className='checkout__title'>Billing Information</h2>
            <Form className='checkout__form'>
              <FormGroup>
                <Label for='fullName'>Full Name</Label>
                <Input
                  type='text'
                  id='fullName'
                  placeholder='Enter your full name'
                />
              </FormGroup>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input type='email' id='email' placeholder='Enter your email' />
              </FormGroup>
              <FormGroup>
                <Label for='phone'>Phone</Label>
                <Input
                  type='text'
                  id='phone'
                  placeholder='Enter your phone number'
                />
              </FormGroup>
              <FormGroup>
                <Label for='address'>Address</Label>
                <Input
                  type='text'
                  id='address'
                  placeholder='Enter your address'
                />
              </FormGroup>
            </Form>
          </Col>
          <Col lg='4'>
            <div className='checkout__summary'>
              <h2 className='checkout__title'>Order Summary</h2>
              <div className='checkout__details'>
                <p>
                  Subtotal: <span>$200</span>
                </p>
                <p>
                  Taxes: <span>$20</span>
                </p>
                <h4>
                  Total: <span>$220</span>
                </h4>
              </div>
              {/* <Button color='primary' className='checkout__btn'>
                Proceed to Payment
              </Button> */}
              <div className='checkout__options'>
                <h4>Select Payment Method</h4>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='radio'
                      name='paymentMethod'
                      value='Credit Card'
                      onChange={handlePaymentChange}
                    />
                    Credit Card
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='radio'
                      name='paymentMethod'
                      value='Paypal'
                      onChange={handlePaymentChange}
                    />
                    Paypal
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='radio'
                      name='paymentMethod'
                      value='Cash on delivery'
                      onChange={handlePaymentChange}
                    />
                    Cash on delivery
                  </Label>
                </FormGroup>
              </div>
              <Button
                color='primary'
                className='checkout__btn'
                onClick={handleCheckout}
              >
                Proceed to Payment
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
