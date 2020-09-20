import firebaseconfig from './firebaseIndex';
import firebase from 'firebase';

export const authMethods = {
  // firebase helper methods go here...
  signup: (email, password, setErrors) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        //saving error messages here
        setErrors((prev) => [...prev, err.message]);
      });
  },
  signin: (email, password) => {},
  signout: (email, password) => {},
};
