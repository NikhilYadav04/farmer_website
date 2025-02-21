const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const queryRouter = require("./routes/query_route");
const storeRouter = require("./routes/store");
const cors = require('cors');

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 2000;

// process.env.PORT: This accesses an environment variable named PORT.
// Environment variables are used to configure settings outside of your codebase,
// making it easier to adjust configuration for different environments

const DB = process.env.DB_URL;

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/',async(req,res)=>{
  res.send("Hello 1000101")
})

app.use(express.json());
app.use("/auth", authRouter);
app.use("/query", queryRouter);
app.use("/store",storeRouter);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected To Mongoose");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, () => {
  console.log(`Connected at ${PORT}`);
});
