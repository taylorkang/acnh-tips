import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFirebaseApp } from 'reactfire';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import './Tips.css';

const TipsChat = () => {
  const isEmpty = (str) => {
    return !str || 0 === str.length;
  };

  return (
    <div className='text-center'>
      <h1>Chat</h1>
    </div>
  );
};

const Tips = () => {
  const firebase = useFirebaseApp();
  let history = useHistory();

  const logOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    history.push('/signin');
  };

  return (
    <div>
      <button onClick={logOut}>Sign Out</button>
      <TipsChat />
    </div>
  );
};

export default Tips;
