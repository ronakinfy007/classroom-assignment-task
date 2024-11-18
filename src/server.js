import express from 'express';
import connectDB from './database.js'; 
import authRoutes from './routes/Auth.js';
import assignmentRoutes from './routes/assignment.js';

const app = express();
app.use(express.json());

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
