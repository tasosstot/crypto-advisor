const express = require("express");
const cors = require("cors"); // Optional: If you'll allow cross-origin requests
const dotenv = require("dotenv"); // Optional: For environment variables

dotenv.config(); // Load .env file if it exists

const app = express();

// Middleware
app.use(cors()); // Enable CORS if your frontend is on a different origin
app.use(express.json()); // Parse JSON payloads

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

app.get("/api/data", (req, res) => {
  res.json({ message: "This is data from the API" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
