const express = require('express');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const noticeRoutes = require('./route/noticeRoute');
const authRoutes = require('./route/authRoute'); // Make sure the path is correct

const cors = require('cors'); // ✅ Import cors

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// ✅ CORS middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',                     // local frontend dev
      'http://localhost:5174',                     // another local dev port
      'https://school-zeta-ashen.vercel.app',     // deployed student frontend
      'https://school-admin-omega.vercel.app'     // deployed admin frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // allow cookies if needed
  })
);



// Test route
app.get('/', (req, res) => {
  res.send('Backend running');
});

// Use auth and notice routes
app.use('/api/auth', authRoutes);
app.use('/api/notice', noticeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
