import React, { useState, useEffect } from 'react'
import './Stats.css';
import axios from "axios";
import StatsRow from './StatsRow';
import { db, auth } from './firebase';

const TOKEN = "c69i0k2ad3i87ccnutp0";
const BASE_URL = "https://finnhub.io/api/v1/quote";

function Stats() {


  const [stockData, setStockData] = useState([]);
  const [myStock, setMyStocks] = useState([]);

  const getMyStocks = async () => {
    const res = await auth.currentUser; 
    const user = res.uid;
    db
      .collection('users')
      .doc(user)
      .collection("myStocks")
      .onSnapshot(snapshot => {
        let promises = [];
        let tempData = []
        // console.log(snapshot);
        snapshot.docs.map((doc) => {
          promises.push(getStocksData(doc.data().ticker)
            .then(res => {
              tempData.push({
                id: doc.id,
                data: doc.data(),
                info: res.data
              })
            })
          )
        })
        Promise.all(promises).then(() => {
          setMyStocks(tempData);
        })
      })
  }

  const getStocksData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  }

  useEffect(() => {
    let stockData = [];
    const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];

    getMyStocks();
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStocksData(stock)
          .then((res) => {
            stockData.push({
              name: stock,
              ...res.data
            });
          })
      )
    });

    Promise.all(promises).then(() => {
      setStockData(stockData);
      // console.log(stockData);
    })
  }, []);

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {myStock.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                volume={stock.data.shares}
                price={stock.info.c}
                previousClose={stock.info.pc}
              />
            ))}
          </div>
        </div>
        <div className="stats__header stats__lists">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stockData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
                previousClose={stock.pc}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats