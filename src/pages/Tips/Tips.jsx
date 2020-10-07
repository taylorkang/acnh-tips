import React, { useContext, useState, useEffect, useRef } from 'react';
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
  const [avatar, setAvatar] = useState('');
  const [newMessage, setNewMessage] = useState(false);
  const user = useUser();

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    console.log('scroll');
  };

  useEffect(() => {
    getMessages(db);
    setMessage({
      ...message,
      uid: user.uid,
      displayName: user.displayName,
    });

    const getAvatar = async () => {
      let res = await API.get(`avatar/${user.uid}`);
      setAvatar(res.data);
    };
    getAvatar();
    db.collection('messages')
      .where('type', '==', 'msg')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            let items = messageList;
            items.push({ id: change.doc.id, data: change.doc.data() });
            let msgs = sortByTimeAscending(items);
            setMessageList(msgs);
            message === true ? setNewMessage(false) : setNewMessage(true);
            console.log('New msg: ', change.doc.data());
          }
        });
        setTimeout(scrollToBottom, 500);
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
    let msgs = sortByTimeAscending(messages);
    setMessageList(msgs);
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

  const sortByTimeAscending = (msgs) => {
    let m = msgs;
    m.sort(function (a, b) {
      let dateA = new Date(a.data.timestamp),
        dateB = new Date(b.data.timestamp);
      return dateA - dateB;
    });
    return m;
    // let sorted = msgs.sort(function (x, y) {
    //   return parseInt(x.timestamp) - parseInt(y.timestamp);
    // });
    // return sorted;
  };

  const sendMessage = async () => {
    if (!isEmpty(message.message)) {
      const msg = {
        displayName: message.displayName,
        message: message.message,
        uid: message.uid,
        avatar: avatar,
      };

      let res = await API.post('messages', msg);
      setMessage({
        ...message,
        message: '',
      });
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

  const onKeyUp = (e) => {
    if (e.charCode === 13) {
      sendMessage();
    }
  };

  const onSubmit = () => {
    sendMessage();
  };

  return (
    <div>
      <button onClick={logOut}>Sign Out</button>
      <div className='text-center'>
        <h1>Chat</h1>
        <button className='mb-2' onClick={scrollToBottom}>
          Scroll to bottom
        </button>
        <div className='wrapper container'>
          <Container className='chat-box'>
            <div className='scrollable'>
              {messageList.map((msg) => {
                return (
                  <div className='chat'>
                    <Row>
                      <Col xs='2'>
                        <img
                          className='avatar'
                          alt={msg.data.displayName}
                          src={msg.data.avatar}
                        />{' '}
                        <div className='thick'>{msg.data.displayName}</div>
                      </Col>
                      <Col xs='10'>{msg.data.message}</Col>
                    </Row>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </Container>
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
                onKeyPress={onKeyUp}
              />
              <InputGroup.Append>
                <Button onClick={onSubmit} variant='outline-secondary'>
                  Send
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tips;
