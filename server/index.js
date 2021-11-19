// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const cors = require ('cors');
const axios = require("axios");

const app = express();

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
// });

app.get("/api", async (req, res) => {
    try {
        const response = await axios.get("https://api.tiingo.com/tiingo/daily/aapl/prices?startDate=2021-08-08", {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 667639e0f7e132994be7d07ec5aa4ba1e80b90b6'
            }})
        let part = response;
        res.json(part.data);
    }
    catch (err) {
        console.log(err)
    }
})
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

