import React, { useState } from 'react';
import { authMethods } from '../firebase/authmethods';

const AuthProvider = (props) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    displayName: '',
  });
  const [errors, setErrors] = useState([]);

  const handleSignup = () => {
    // middle man between firebase and signup
    authMethods.signup(inputs.email, inputs.password, setErrors);
    console.log(errors);
  };

  const handleSignin = () => {
    // middle man between firebase and signup
    authMethods.signin(inputs.email, inputs.password, setErrors);
    console.log(errors);
  };

  const handleSignout = () => {
    authMethods.signout();
  };

  return (
    <firebaseAuth.Provider
      value={{
        //replaced test with handleSignup
        //replaced test with handleSignup
        handleSignup,
        handleSignin,
        handleSignout,
        inputs,
        setInputs,
        errors,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;

export const firebaseAuth = React.createContext();
