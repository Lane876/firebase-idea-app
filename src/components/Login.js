import React, { useEffect } from "react";
import { Paper, Button } from "@material-ui/core";
import firebase from "firebase";
import "firebase/auth";
import { db } from "../firebase";



const Login = ({ setCurrentUser, currentUser }) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  useEffect(() => {
    db.auth().onAuthStateChanged((user) => {
      if (user) setCurrentUser(user.uid);
    });
  }, []);
  const authWithGoogle = async () => {
   await firebase.auth().signInWithPopup(provider);
  };
  const logOut = async () => {
   await firebase.auth().signOut();
    window.location.reload();
  };
  return (
    <div
      style={{
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        margin: "1rem auto",
      }}
    >
      {!currentUser && (
        <Button onClick={authWithGoogle} style={{width:"50%", margin:"0 auto"}} variant='contained' color="primary">
          login with google
        </Button>
      )}
      {currentUser && (
        <Button onClick={logOut} style={{width:"50%", margin:"0 auto"}} variant='contained' color="secondary">
          log out
        </Button>
      )}
    </div>
  );
};

export default Login;
