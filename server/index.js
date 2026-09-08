import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();
const port =  process.env.PORT || 5000;

// Routes
app.get('/', (req, res) => {
  res.send({'message': 'Hello World!'});
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});