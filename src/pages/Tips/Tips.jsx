import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useFirebaseApp, useFirestore } from 'reactfire';
import { useHistory } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import 'firebase/database';
import 'firebase/auth';
import './Tips.css';

//const db = useDatabase();

function Tips() {
  const firebase = useFirebaseApp();
  const db = useFirestore();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    getMessages(db);
  }, []);

  const TipsChat = () => {
    const isEmpty = (str) => {
      return !str || 0 === str.length;
    };

    return (
      <div className='text-center'>
        <h1>Chat</h1>
        <Container className='chat-box'>
          <div clasName='scrollable'>
            {messageList.map((message) => {
              return <div className='chat'>{message.data.message}</div>;
            })}
          </div>
          <div className='pinned'>
            <InputGroup>
              <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby='basic-addon2'
              />
              <InputGroup.Append>
                <Button variant='outline-secondary'>Button</Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Container>
      </div>
    );
  };

  const getMessages = async () => {
    const messagesSnapshot = await db.collection('messages').get();
    let messages = [];
    messagesSnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        data: doc.data(),
      });
      setMessageList(messages);
    });
    console.log(messages);
    console.log('getting messages...');
  };

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
}

export default Tips;
