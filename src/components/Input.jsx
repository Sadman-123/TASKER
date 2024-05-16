import React, { useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Table from './Table';
function Input() {
  const [task,settask]=useState("");
  const firebaseConfig = {
    apiKey: "AIzaSyCGzJJ061uFEIym90w78pSe-xGq7q9ZIIE",
    authDomain: "helloworld-c5a69.firebaseapp.com",
    databaseURL: "https://helloworld-c5a69-default-rtdb.firebaseio.com",
    projectId: "helloworld-c5a69",
    storageBucket: "helloworld-c5a69.appspot.com",
    messagingSenderId: "495733919404",
    appId: "1:495733919404:web:cd6da4ec18701ba6f6d909"
  };
  const db=firebase.initializeApp(firebaseConfig).database();
  const Handle_Insert=()=>{
    db.ref("tasks").push({
      task:task,
      time:new Date().toLocaleTimeString()
    })
  }
  return (
    <>
    <div className='cont'>
        <div className='input'>
      <h1>Task App</h1>
      <input type='text' placeholder='Enter Task' autoComplete='off' required={true} onChange={(e)=>settask(e.target.value)}/>
      <br/>
      <button onClick={Handle_Insert}>SAVE</button>
        </div>
    </div>
      <Table/>
    </>
  )
}

export default Input
