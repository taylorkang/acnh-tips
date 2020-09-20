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
  signin: (email, password, setErrors) => {
    console.log('handleSignin!');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
  signout: (setErrors) => {
    firebase
      .auth()
      .signOut()
      .then((res) => {})
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
};
