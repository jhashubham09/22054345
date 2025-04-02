const express = require("express");
const axios = require("axios");
const { logger } = require("./utils/logger");

const app = express();
const WINDOW_SIZE = 10; // Configurable window size

let numberWindow = []; // Stores unique numbers

// Map for third-party API endpoints
const apiEndpoints = {
  p: "http://20.244.56.144/evaluation-service/primes",
  f: "http://20.244.56.144/evaluation-service/fibo",
  e: "http://20.244.56.144/evaluation-service/even",
  r: "http://20.244.56.144/evaluation-service/rand",
};

// Helper function to calculate average
const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return parseFloat((sum / numbers.length).toFixed(2));
};

// Route handler for /numbers/:numberId
app.get("/numbers/:numberId", async (req, res) => {
  const { numberId } = req.params;
  const apiUrl = apiEndpoints[numberId];

  if (!apiUrl) {
    return res.status(400).json({ error: "Invalid numberId" });
  }

  const prevState = [...numberWindow]; // Copy previous state

  try {
    const response = await axios.get(apiUrl, {
      timeout: 500,
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    const fetchedNumbers = response.data.numbers || [];

    // Add unique numbers to the window
    fetchedNumbers.forEach((num) => {
      if (!numberWindow.includes(num)) {
        if (numberWindow.length >= WINDOW_SIZE) {
          numberWindow.shift(); // Remove the oldest number
        }
        numberWindow.push(num);
      }
    });

    const avg = calculateAverage(numberWindow);

    res.json({
      windowPrevState: prevState,
      windowCurrState: numberWindow,
      numbers: fetchedNumbers,
      avg,
    });
  } catch (error) {
    logger.error(`Error fetching numbers: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch numbers" });
  }
});

module.exports = app;
