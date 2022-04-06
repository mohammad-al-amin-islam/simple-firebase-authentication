import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const auth = getAuth(app);

function App() {

  const [user, setUser] = useState({})

  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  }
  const handleGitSignIn = () => {
    signInWithPopup(auth, gitProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
  }
  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleSignOut}>Google Sign Out</button> : <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGitSignIn}>Git Sign In</button>

        </>
      }


      <h1>Name: {user.displayName}</h1>
      <p>looged mail : {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
