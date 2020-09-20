import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SignIn.css';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';

const SignInForm = (props) => {
  const { handleSignin, inputs, setInputs, errors } = useContext(firebaseAuth);
  const [formError, setFormError] = useState('');
  const isEmpty = (str) => {
    return !str || 0 === str.length;
  };
  const user = props.user;

  return (
    <Form onSubmit={props.handleSubmit} className='box text-center'>
      <h1>Sign In</h1>
      <Form.Group controlId='formBasicEmail'>
        <Form.Control
          name='email'
          value={user.email}
          type='email'
          placeholder='Enter email'
          onChange={props.handleChange}
          required
        />
        {/* <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Control
          name='password'
          value={user.password}
          type='password'
          placeholder='Password'
          onChange={props.handleChange}
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
  document.title = 'Sign In | ACNH Tips';
  let history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
    error: '',
    code: '',
    isError: false,
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log in code here.

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        setTimeout(function () {
          history.push('/tips');
        }, 1000);

        //}
      })
      .catch((error) => {
        // Update the error

        setUser({
          ...user,
          error: error.message,
          code: error.code,
          isError: true,
        });
      });
  };

  const firebase = useFirebaseApp();

  return (
    <div className='flex'>
      <SignInForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        firebase={firebase}
      />
    </div>
  );
};

export default SignIn;
