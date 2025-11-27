const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// generate JWT token (fixed name + secret check)
function generateToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set in environment variables');
  return jwt.sign({ id: userId }, secret, { expiresIn: '30d' });
}

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  // basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'username, email and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    // Generate JWT token using savedUser._id
    const token = generateToken(savedUser._id.toString());

    // Return saved user info (avoid returning password)
    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      token
    });
  } catch (error) {
    console.error('registerUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function loginUser(req, res) {
  // Implementation for loginUser 
  const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required' });
    }
    try{
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }   
        const token = generateToken(user._id.toString());
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    }
    catch(error){   
        console.error('loginUser error:', error);
        res.status(500).json({ message: 'Server error' });

    }  

}

async function getUserProfile(req, res) {
    // Implementation for getUserProfile
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }   
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email
    });


}

function logoutUser(req, res) {
    
    res.status(200).json({ message: 'User logged out successfully' });
}

module.exports = { registerUser  , loginUser , getUserProfile , logoutUser };
