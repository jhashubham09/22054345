/**
 * Helper utilities for the application
 */
const winston = require("winston");

// Configure logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

/**
 * Calculates the average of an array of numbers
 * @param {number[]} numbers - Array of numbers to average
 * @returns {number} - The calculated average, or 0 for empty arrays
 */
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

module.exports = {
  logger,
  calculateAverage,
};
