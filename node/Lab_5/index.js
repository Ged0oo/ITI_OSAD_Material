const process = require('node:process');
const express = require('express')
const mongoose = require('mongoose')
const routers = require('./routers')

mongoose.connect("mongodb://127.0.0.1:27017/inentory")
  .then(() => console.log("Connected to DB."))
  .catch((err) => console.log("Cannot Connect to DB." + err));

const app = express();
app.use(express.json());
app.use(routers);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
})

app.use((error, req, res, next) => {
  console.error('Error:', error);
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  res.status(status).json({
    error: message
  });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Up and running: http://127.0.0.1:${PORT}`);
});
