const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const otpStore = {}; 

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Helper: Generate verification token
const generateVerificationToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Helper: Send verification email
const sendVerificationEmail = async (user, isAdmin=false) => {
  const token = generateVerificationToken(user._id);
  const verificationLink = `http://localhost:3000/api/auth/verify/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify your email',
    text: `Click this link to verify your email ${isAdmin ? 'as Admin' : ''}: ${verificationLink}`
  };

  await transporter.sendMail(mailOptions);
};

// Signup
// Signup
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body; // role: 'user' or 'admin'

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB (isVerified will remain false by default)
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Removed email sending completely
    // Notify user that verification is required by school
    res.status(201).json({ 
      message: 'User registered successfully. Your account needs to be verified by the school before login.' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Email verification
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ message: 'Invalid verification link' });

    user.isVerified = true;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now login or access admin features.' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No account found with this email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    if (!user.isVerified)
      return res.status(401).json({ message: 'Please verify your email before logging in.' });

    // Changed: Remove expiration to keep users logged in until manual logout
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '365d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout
exports.logout = (req, res) => {
  // With JWT, server cannot "delete" token
  res.json({ message: 'Logged out successfully. Please remove token on client side.' });
};

// Forgot Password - Generate OTP and send to email
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP temporarily (expires in 10 min)
    otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 };

    // Styled HTML version of your OTP Card
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:40px 0; text-align:center;">
        <div style="background:#ffffff; width:320px; margin:0 auto; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.1); padding:24px;">

          <h2 style="color:#222; font-size:18px; margin-bottom:20px;">Vidya Niketan Academy</h2>

          <div style="background:#f1f3f6; border-radius:10px; padding:12px 0; margin-bottom:12px;">
            <p style="font-size:28px; font-family:monospace; letter-spacing:3px; font-weight:bold; color:#333;">${otp}</p>
          </div>

          <p style="font-size:14px; color:#666; margin-bottom:6px;">Password Reset OTP</p>
          <p style="font-size:13px; color:#777;">It will expire in <b>10 minutes</b>.</p>
        </div>

        <p style="font-size:12px; color:#999; margin-top:20px;">
          If you didn’t request this, please ignore this email.
        </p>
      </div>
    `;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for password reset',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP card sent to your email' });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Add this new function to verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = otpStore[email];
    if (!record) {
      return res.status(400).json({ message: 'OTP not found. Please request again.' });
    }

    if (record.expires < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP expired. Please request again.' });
    }

    if (parseInt(otp) !== record.otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Mark OTP as verified (you can add a flag or just proceed)
    record.verified = true;

    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password using OTP
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body; // Make sure otp is included

  try {
    const record = otpStore[email];
    if (!record) return res.status(400).json({ message: 'OTP not found. Please request again.' });

    if (record.expires < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP expired. Please request again.' });
    }

    if (parseInt(otp) !== record.otp) return res.status(400).json({ message: 'Invalid OTP' });

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Delete OTP after successful reset
    delete otpStore[email];

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
