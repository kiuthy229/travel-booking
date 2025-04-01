import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';
import { Link } from 'react-router-dom';
import '../styles/register.css';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <section className='register'>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='register__container d-flex justify-content-between'>
              <div className='register__img'>
                <img src={registerImg} alt='' />
              </div>

              <div className='register__form'>
                <div className='user'>
                  <img src={userIcon} alt='' />
                </div>

                <h2 className='register__title'>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input
                      type='text'
                      id='username'
                      placeholder='Username'
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input
                      type='email'
                      id='email'
                      placeholder='Email'
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input
                      type='password'
                      id='password'
                      placeholder='Password'
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='password'>Confirm Password</Label>
                    <Input
                      type='password'
                      id='confirmPassword'
                      placeholder='Confirm Password'
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button
                    color='primary'
                    className='btn secondary__btn auth__btn'
                    type='submit'
                  >
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to='/login'>Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
