const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "1h" });
};

// User Register
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // Validation: Check for missing Fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    // Check if Email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This user already Exists" });
    }

    // Create the User
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: "Error registering user",
      error: err.message,
    });
  }
};

// User Login
exports.loginUser = async = (req, res) => {};

// Get User Info
exports.getUserInfo = async (req, res) => {};
