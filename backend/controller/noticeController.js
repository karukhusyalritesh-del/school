// controllers/noticeController.js
const Notice = require('../model/noticeModel');

// Create a notice (admin only) - TEMPORARILY REMOVE AUTH
exports.createNotice = async (req, res) => {
  try {
    const { title, description, category, uploader } = req.body;
    
    // If no title but has uploader, use uploader as title (for compatibility)
    const noticeTitle = title || uploader || 'New Notice';
    
    const notice = new Notice({ 
      title: noticeTitle, 
      description, 
      category, 
      uploader: uploader || 'Admin' // Handle both cases
    });
    
    await notice.save();

    res.status(201).json({ 
      message: 'Notice uploaded successfully', 
      notice 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all notices
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get notices by category
exports.getNoticesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const notices = await Notice.find({ category }).sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a notice (admin only)
exports.deleteNotice = async (req, res) => {
  const { id } = req.params;

  try {
    await Notice.findByIdAndDelete(id);
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};