import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Newsfeed from './Newsfeed';
import  Stats  from './Stats';
import { db } from './firebase';

var isEmpty = false;

function App() {

  const [showEmpty, setShow] = useState(true);

    const getMyStocks = () => {
      let snapshotEmpty = false;
        db
        .collection('myStocks')
        .onSnapshot(snapshot => {
          snapshotEmpty = snapshot.empty;
          console.log(snapshot);
          return snapshotEmpty;
        })
    }
    useEffect(() => { 

      let isEmpty = getMyStocks();
      // const verifySnapshot = async () => { 
      //   let isEmpty;
      //   isEmpty = await getMyStocks();
      //   setShow(isEmpty);
      //   if(isEmpty == true) {
      //     document.getElementById('box1_empty').style.display = 'flex';
      //     console.log(2)
      //   }
      //   else {
      //     document.getElementById('box2_full').style.display = 'flex';
      //     console.log(1)
      //   }
      // };
      // verifySnapshot();
      console.log(isEmpty, "2");

    },[]);

  return (
    <div className="App">
      <div className="app__header" >
      </div>
      <div className="app__body__empty" id="box1_empty">
        <div className="app__container">
          <Newsfeed />
          <Stats />
        </div>
      </div>
      {/* <div className="app__body__full" id="box2_full">
        <div className="app__container">
          <Newsfeed />
          <Stats />
        </div>
      </div> */}
    </div>
  );
}

export default App;
