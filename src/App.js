import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';
import { firebaseConfig } from './firebase.config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
  
function App() {
const [user, setUser] = useState({
  isSignedIn : false,
  name : "",
  email: "",
  photo: ""
})

 const handleSignIn = () =>{
  const provider = new firebase.auth.GoogleAuthProvider();
  // console.log("sign in ");
   firebase.auth()
   .signInWithPopup(provider)
   .then((result) => {
 
     // The signed-in user info.
     const  {photoURL, displayName,  email} = result.user;
     const signedInUser ={
       isSignedIn:true,
       name:displayName,
       email:email,
       photo:photoURL
     }
     setUser(signedInUser)
     console.log(displayName , photoURL, email);
     // ...
   })
   .catch (error =>{
     window.alert(error)
     window.alert(error.message)
   })
 }

 const handleSignOut = ()=>{
  firebase.auth().signOut()
  .then((res) => {
    // Sign-out successful.
    const signedOutUser = {
    isSignedIn: false,
    name: "",
    photo: "",
      email : "",
      password: ""
    }
    setUser(signedOutUser)
  }).catch((error) => {
    // An error happened.
  });
 }

 const handelSubmit = () =>{

 }

 const handelBlur = (e) =>{
   let isFormValid = true;
  if(e.target.name === "email"){
    isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
  } if(e.target.name === "password"){
    const isPasswordValid = e.target.value.length > 6;
    const passwordHasNumber =  /\d{1}/.test(e.target.value)
    isFormValid = isPasswordValid && passwordHasNumber
  }
  if(isFormValid){
    const newUserInfo = {...user}
    newUserInfo[e.target.name] = e.target.value
    setUser(newUserInfo)
  }
 }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : 
        <button onClick={handleSignIn}>Sign in</button>
      }
     
     {
       user.isSignedIn && <>
       <h4>WellCome {user.name}</h4>
       <h6>{user.email}</h6>
       <img src={user.photo} alt=""/>
       </>
     }

     <h1>Our own Authentication</h1>
     <p>email : {user.email}</p>
     <p>password: {user.password}</p>
     <form action="" onSubmit={handelSubmit}>
       <input type="email" onBlur={handelBlur} name="email" placeholder="Your Email Address" required/>
       <br/>
       <input type="password" onBlur={handelBlur} name="password" placeholder="Your Password" required/>
       <br/>
       <input type="submit" value="Submit"/>
     </form>
    </div>
  );
}

export default App;
