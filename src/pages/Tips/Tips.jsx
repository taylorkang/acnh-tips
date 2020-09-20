import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
  return (
    <div>
      <button>sign out</button>
      <TipsChat />
    </div>
  );
};

export default Tips;
