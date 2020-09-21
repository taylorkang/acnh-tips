import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './SignIn.css';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';

const SignInForm = (props) => {
  const isEmpty = (str) => {
    return !str || 0 === str.length;
  };

  let history = useHistory();

  const signUp = () => {
    let path = '/';
    history.push(path);
  };

  const loader = () => {
    if (props.loading) {
      return (
        <Spinner className='spinner' animation='border' variant='primary' />
      );
    }
  };

  return (
    <Form onSubmit={props.handleSubmit} className='box text-center signin'>
      <h1>Sign In</h1>
      <button onClick={signUp}>Sign Up</button>
      <Form.Group controlId='formBasicEmail'>
        <Form.Control
          name='email'
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
          type='password'
          placeholder='Password'
          onChange={props.handleChange}
          required
        />
      </Form.Group>

      <Button disabled={props.loading} variant='primary' type='submit'>
        Sign In
      </Button>
      {loader()}

      {props.user && !isEmpty(props.user.error) ? (
        <p style={{ color: 'red' }}>{props.user.error}</p>
      ) : null}
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        setTimeout(function () {
          history.push('/tips');
        }, 1000);
        setLoading(false);
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
        setLoading(false);
      });
  };

  const firebase = useFirebaseApp();

  return (
    <div className='flex'>
      <SignInForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        firebase={firebase}
        loading={loading}
      />
    </div>
  );
};

export default SignIn;
