import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import './Home.css';

import API from '../../api.js';

const SignUpForm = (props) => {
  const [formError, setFormError] = useState('');
  const isEmpty = (str) => {
    return !str || 0 === str.length;
  };
  let history = useHistory();

  const handleChange = (e) => {
    console.log(e.target.value);
    props.setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    });
  };

  const loader = () => {
    if (props.loading) {
      return (
        <Spinner className='spinner' animation='border' variant='primary' />
      );
    }
  };

  const signIn = () => {
    let path = '/signIn';
    history.push(path);
  };

  let user = props.user;

  return (
    <Form onSubmit={props.handleSubmit} className='box text-center'>
      <h1>Sign Up</h1>
      <button onClick={signIn}>Sign In</button>
      <Form.Group controlId='formBasicAvatarDropdown'>
        <p>Avatar</p>
        <Dropdown onSelect={props.onSelect} id='d'>
          {/* <Dropdown onSelect={this.onSelect} id='d'> */}
          <Dropdown.Toggle>
            <img className='avatar' alt='avatar' src={props.avatar} />
          </Dropdown.Toggle>
          <Dropdown.Menu className='menu'>
            {props.avatars &&
              props.avatars.map((av) => {
                return (
                  <Dropdown.Item eventKey={av.url} key={av.id}>
                    <img className='avatar' alt='avatar' src={av.url} />
                  </Dropdown.Item>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

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

      <Button disabled={props.loading} variant='primary' type='submit'>
        Sign Up
      </Button>
      {loader()}
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
  const [avatars, setAvatars] = useState([]);
  const [avatar, setAvatar] = useState(
    'https://firebasestorage.googleapis.com/v0/b/acnh-tips-api.appspot.com/o/avatars%2F010-boy.svg?alt=media&token=d8b57dfc-863f-4d18-80aa-13b1fd4857bd'
  );
  const [selectedId, setSelectedId] = useState('1SJh93FFSVllCWUr3H55');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await API.get('avatars');
        setAvatars(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const createUser = async (uid) => {
    let obj = {
      uid: uid,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: avatar,
    };

    let res = await API.post('users', obj);
    console.log(res);
  };

  const onSelect = (eventKey) => {
    console.log(eventKey);
    setSelectedId({ selectedId: eventKey });
    setAvatar(eventKey);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: user.displayName,
          });

          createUser(res.user.uid);

          setUser({
            ...user,
            displayName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            avatar: '',
          });

          setTimeout(function () {
            history.push('/tips');
          }, 1000);
          setLoading(false);
        })
        .catch((e) => {
          setUser({
            ...user,
            error: e.message,
            isError: true,
          });
          setLoading(false);
        });
    } catch (e) {
      setUser({
        ...user,
        error: 'Please agree to the terms and conditions and privacy policy',
        isError: true,
      });
    }
  };

  const signIn = () => {
    let path = '/signIn';
    history.push(path);
  };

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    password: '',
    error: '',
    avatar: '',
  });
  return (
    <div>
      <div className='flex'>
        <SignUpForm
          user={user}
          avatars={avatars}
          setUser={setUser}
          handleSubmit={handleSubmit}
          onSelect={onSelect}
          avatar={avatar}
        />
      </div>
    </div>
  );
};

export default Home;
