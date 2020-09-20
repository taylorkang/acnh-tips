import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import './Home.css';

const SignUpForm = (props) => {
  const [formError, setFormError] = useState('');
  const isEmpty = (str) => {
    return !str || 0 === str.length;
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    props.setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    });
  };

  let user = props.user;

  return (
    <Form onSubmit={props.handleSubmit} className='box text-center'>
      <h1>Sign Up</h1>
      <Form.Group controlId='formBasicName'>
        <Row>
          <Col>
            <Form.Control
              name='firstName'
              placeholder='First name'
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Control
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
          type='password'
          placeholder='Password'
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
      {/* {errors.length > 0
        ? errors.map((error) => <p style={{ color: 'red' }}>{error}</p>)
        : null} */}
      {props.user && !isEmpty(props.user.error) ? (
        <p style={{ color: 'red' }}>{props.user.error}</p>
      ) : null}
    </Form>
  );
};

const Home = () => {
  const firebase = useFirebaseApp();
  let history = useHistory();
  document.title = 'Sign Up | ACNH Tips';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: user.displayName,
          });

          setTimeout(function () {
            history.push('/tips');
          }, 1000);
        })
        .catch((e) => {
          setUser({
            ...user,
            error: e.message,
            isError: true,
          });
        });
    } catch (e) {
      setUser({
        ...user,
        error: 'Please agree to the terms and conditions and privacy policy',
        isError: true,
      });
    }
  };

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    password: '',
    error: '',
  });
  return (
    <div className='flex'>
      <SignUpForm user={user} setUser={setUser} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
