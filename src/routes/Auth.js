import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config(); 
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send('Username already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: { username: savedUser.username, role: savedUser.role } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server error');
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log('object', token);
  res.json({ token });
});

export default router;
