import { useState } from "react";
import { GoogleAuthProvider, getAuth, signInAnonymously, signInWithPopup, updateProfile } from "firebase/auth";

import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./Login.module.css";

const Login = () => {
  const auth = getAuth();

  const anonymousSignIn = async (event) => {
    try {
      if (displayName) {
        await signInAnonymously(auth);
        await updateProfile(auth.currentUser, { displayName });
      }
    } catch (e) {}
  };

  const googleSignIn = async (event) => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    } catch (e) {}
  };

  const [displayName, setDisplayName] = useState("");

  return (
    <div className={styles.root}>
      <h1>Welcome to Moos!</h1>
      <div className={styles.anon}>
        <label>Display Name</label>
        <Input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}></Input>
      </div>
      <Button className={styles.anonButton} onClick={anonymousSignIn} disabled={!displayName}>
        Anonymous Sign In
      </Button>
      <div>
        <span> - - - - - - - - - - - - - - - - - - -</span>
        OR
        <span> - - - - - - - - - - - - - - - - - - -</span>
      </div>
      <div className={styles.other}>
        <Button onClick={googleSignIn}>Continue with Google</Button>
      </div>
    </div>
  );
};

export default Login;
