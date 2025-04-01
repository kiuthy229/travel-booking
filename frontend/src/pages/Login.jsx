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
import { Link } from 'react-router-dom';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <section className='login'>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login__container d-flex justify-content-between'>
              <div className='login__img'>
                <img src={loginImg} alt='' />
              </div>

              <div className='login__form'>
                <div className='user'>
                  <img src={userIcon} alt='' />
                </div>

                <h2 className='login__title'>Login</h2>

                <Form onSubmit={handleClick}>
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
                  <Button
                    color='primary'
                    className='btn secondary__btn auth__btn'
                    type='submit'
                  >
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to='/register'>Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
