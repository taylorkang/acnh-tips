import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SignIn.css';
import { firebaseAuth } from '../../provider/AuthProvider';

const SignInForm = () => {
  const { handleSignin, inputs, setInputs, errors } = useContext(firebaseAuth);
  const [formError, setFormError] = useState('');
  const isEmpty = (str) => {
    return !str || 0 === str.length;
  };

  const handleSubmit = (e) => {
    setFormError('');
    e.preventDefault();
    console.log('handleSubmit');
    handleSignin();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(inputs);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit} className='box text-center'>
      <h1>Sign In</h1>
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

const SignIn = () => {
  return (
    <div className='flex'>
      <SignInForm />
    </div>
  );
};

export default SignIn;
