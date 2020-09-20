import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css';
import { firebaseAuth } from '../../provider/AuthProvider';

const SignUpForm = () => {
  const { handleSignup, inputs, setInputs, errors } = useContext(firebaseAuth);
  const [formError, setFormError] = useState('');
  const isEmpty = (str) => {
    return !str || 0 === str.length;
  };

  const handleSubmit = (e) => {
    setFormError('');
    e.preventDefault();
    console.log('handleSubmit');
    if (
      !isEmpty(inputs.firstName) &&
      !isEmpty(inputs.lastName) &&
      !isEmpty(inputs.displayName) &&
      !isEmpty(inputs.email) &&
      !isEmpty(inputs.password)
    ) {
      handleSignup();
    } else {
      setFormError('Please fill out the entire form.');
      console.log('Please fill out the entire form.');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(inputs);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit} className='box'>
      <Form.Group controlId='formBasicName'>
        <Row>
          <Col>
            <Form.Control
              value={inputs.firstName}
              name='firstName'
              placeholder='First name'
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Control
              value={inputs.lastName}
              name='lastName'
              placeholder='Last name'
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group controlId='formBasicDisplayName'>
        <Form.Control
          value={inputs.displayName}
          name='displayName'
          placeholder='Display Name'
          onChange={handleChange}
          required
        />
        {/* <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group controlId='formBasicEmail'>
        <Form.Control
          name='email'
          value={inputs.email}
          type='email'
          placeholder='Enter email'
          onChange={handleChange}
          required
        />
        {/* <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Control
          name='password'
          value={inputs.password}
          type='password'
          placeholder='Password'
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
      {errors.length > 0
        ? errors.map((error) => <p style={{ color: 'red' }}>{error}</p>)
        : null}
      {!isEmpty(formError) ? <p style={{ color: 'red' }}>{formError}</p> : null}
    </Form>
  );
};

const Home = () => {
  return (
    <div className='flex'>
      <SignUpForm />
    </div>
  );
};

export default Home;
