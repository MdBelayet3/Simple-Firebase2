import './App.css'
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.init'
import { useState } from 'react'

function App() {

  const [user, setUser] = useState(null);

  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const handleGoogleSignInBtn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch(error => {
        console.log('error', error.message);
      })
  }
  const handleSignOutBtn = () =>{
    signOut(auth)
    .then(result =>{
      setUser(null);
      console.log(result);
    })
    .catch(error =>{
      console.log(error);
    })
  }
  const handleGitHubSignInBtn = () =>{
    signInWithPopup(auth,gitHubProvider)
    .then(result =>{
      const user = result.user;
      console.log(user)
      setUser(user);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  return (
    <>
      <h1>Firebase + React</h1>
      {user ?
      <button onClick={handleSignOutBtn}>Sign Out</button> :
      <div>
        <button onClick={handleGoogleSignInBtn}>Google SignIn</button>
        <button onClick={handleGitHubSignInBtn}>GitHub SignIn</button>
      </div>
      }
      {
        user && <div>
          <h3>User : {user.displayName}</h3>
          <p>Email : {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </>
  )
}

export default App
