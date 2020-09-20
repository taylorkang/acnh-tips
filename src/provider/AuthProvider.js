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
  const [token, setToken] = useState(null);

  const handleSignup = () => {
    // middle man between firebase and signup
    authMethods.signup(inputs.email, inputs.password, setErrors);
  };

  return (
    <firebaseAuth.Provider
      value={{
        //replaced test with handleSignup
        //replaced test with handleSignup
        handleSignup,
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
