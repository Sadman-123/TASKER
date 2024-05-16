import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Tr from './Sub_components/Tr';

// Initialize Firebase only once
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

function Table() {
  const [dat, setDat] = useState([]);

  useEffect(() => {
    const getData = () => {
      const taskRef = db.ref('tasks');
      taskRef.on('value', (snapshot) => {
        const data = [];
        snapshot.forEach((snap) => {
          data.push(snap.val());
          console.log(data)
        });
        setDat(data);
      });
    };

    getData();

    // Cleanup subscription on unmount
    return () => {
      db.ref('tasks').off();
    };
  }, []);

  return (
    <div className='contx'>
          {dat.map((item, index) => (
            <Tr key={index} task={item.task} time={item.time} url={item.fileUrl}/>
          ))}
    </div>
  );
}

export default Table;
