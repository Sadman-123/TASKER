import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import Table from './Table';

function Input() {
  const [task, setTask] = useState("");
  const [file, setFile] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyCGzJJ061uFEIym90w78pSe-xGq7q9ZIIE",
    authDomain: "helloworld-c5a69.firebaseapp.com",
    databaseURL: "https://helloworld-c5a69-default-rtdb.firebaseio.com",
    projectId: "helloworld-c5a69",
    storageBucket: "helloworld-c5a69.appspot.com",
    messagingSenderId: "495733919404",
    appId: "1:495733919404:web:cd6da4ec18701ba6f6d909"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.database();
  const storage = firebase.storage();

  const handleInsert = () => {
    if (task && file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`tasks/${file.name}`);
      
      fileRef.put(file).then(() => {
        fileRef.getDownloadURL().then((url) => {
          db.ref("tasks").push({
            task: task,
            time: new Date().toLocaleTimeString(),
            fileUrl: url
          }).then(() => {
            // Clear inputs after successful insert
            setTask("");
            setFile(null);
            // Clear the file input field
            document.getElementById('fileInput').value = null;
          });
        });
      }).catch(error => {
        console.error("Error uploading file: ", error);
      });
    }
  };

  return (
    <>
      <div className='cont'>
        <div className='input'>
          <h1>Task App</h1>
          <input
            type='text'
            placeholder='Enter Task'
            autoComplete='off'
            required={true}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <br/>
          <input
            id="fileInput"
            type='file'
            accept='image/png, image/jpeg'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={handleInsert}>SAVE</button>
        </div>
      </div>
      <Table />
    </>
  );
}

export default Input;
