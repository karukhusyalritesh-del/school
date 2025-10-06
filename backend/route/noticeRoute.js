// routes/noticeRoutes.js
const express = require('express');
const router = express.Router();
const noticeController = require('../controller/noticeController');
// const { protect, admin } = require('../middleware/authMiddleware'); // Remove temporarily

// Admin-only routes - TEMPORARILY REMOVE AUTH
router.post('/create', noticeController.createNotice); // Removed: protect, admin
router.delete('/:id', noticeController.deleteNotice); // Removed: protect, admin

// Public routes
router.get('/all', noticeController.getNotices);
router.get('/category/:category', noticeController.getNoticesByCategory);

module.exports = router;