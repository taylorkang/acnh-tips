import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useFirebaseApp, useFirestore, useUser } from 'reactfire';
import { useHistory } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import 'firebase/database';
import 'firebase/auth';
import './Tips.css';

import API from '../../api.js';

//const db = useDatabase();

function Tips() {
  const firebase = useFirebaseApp();
  const db = useFirestore();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState({});
  const user = useUser();

  useEffect(() => {
    getMessages(db);
    setMessage({
      ...message,
      uid: user.uid,
      displayName: user.displayName,
    });

    db.collection('messages')
      .where('type', '==', 'msg')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            console.log('adding');
            let items = messageList;
            items.push({ id: change.doc.id, data: change.doc.data() });
            setMessageList(items);
            console.log('New msg: ', change.doc.data());
          }
        });
      });
  }, []);

  const getMessages = async () => {
    const messagesSnapshot = await db.collection('messages').get();
    let messages = [];
    messagesSnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setMessageList(messages);
    console.log(messages);
    console.log('getting messages...');
  };

  let history = useHistory();

  const logOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    history.push('/signin');
  };

  const isEmpty = (str) => {
    return !str || 0 === str.length;
  };

  const sendMessage = async () => {
    console.log('made it here');
    console.log(message);
    if (!isEmpty(message.message)) {
      const msg = {
        displayName: message.displayName,
        message: message.message,
        uid: message.uid,
      };

      let res = await API.post('messages', msg);
      console.log(res);
    } else {
      // display some kind of popup
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
      error: '',
    });
  };

  const onSubmit = () => {
    sendMessage();
  };

  return (
    <div>
      <button onClick={logOut}>Sign Out</button>
      <div className='text-center'>
        <h1>Chat</h1>
        <Container className='chat-box'>
          <div className='scrollable'>
            {messageList.reverse().map((msg) => {
              return <div className='chat'>{msg.data.message}</div>;
            })}
          </div>
          <div className='pinned'>
            <InputGroup>
              <FormControl
                placeholder='Type your message here...'
                aria-label='type_message'
                aria-describedby='basic-addon2'
                onChange={handleChange}
                name='message'
                value={message.message}
                key='message_key'
              />
              <InputGroup.Append>
                <Button onClick={onSubmit} variant='outline-secondary'>
                  Send
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Tips;
