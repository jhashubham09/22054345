require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// API Base URL
const BASE_URL = "http://20.244.56.144/evaluation-service";
const API_KEY = process.env.API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjAwNjQwLCJpYXQiOjE3NDM2MDAzNDAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjhjMmVjZmIzLWFmMTAtNDMyMS05YTFjLTE5NTYwMDU3MmU4NyIsInN1YiI6ImpoYXNodWJoYW0yMDc2QGdtYWlsLmNvbSJ9LCJlbWFpbCI6ImpoYXNodWJoYW0yMDc2QGdtYWlsLmNvbSIsIm5hbWUiOiJzaHViaGFtIGt1bWFyIGpoYSIsInJvbGxObyI6IjIyMDU0MzQ1IiwiYWNjZXNzQ29kZSI6Im53cHdyWiIsImNsaWVudElEIjoiOGMyZWNmYjMtYWYxMC00MzIxLTlhMWMtMTk1NjAwNTcyZTg3IiwiY2xpZW50U2VjcmV0IjoiWU5Ga0ttZVdQUUVKa0JzTSJ9.gQiOHNdRhuZsQMmb8h6t63-XTVE14WOK7eRFdTC7xps"; 

// Axios default headers
const HEADERS = {
    headers: {
        Authorization: API_KEY
    }
};

// Route to fetch all users
app.get("/users", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/users`, HEADERS);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Route to fetch posts of a specific user
app.get("/users/:userId/posts", async (req, res) => {
    const { userId } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, HEADERS);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching posts for user ${userId}:`, error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch user posts" });
    }
});

// Route to fetch comments on a specific post
app.get("/posts/:postId/comments", async (req, res) => {
    const { postId } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, HEADERS);
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
