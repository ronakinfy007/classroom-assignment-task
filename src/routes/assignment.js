import express from "express";
import jwt from "jsonwebtoken";
import Assignment from "../models/assignment.js"; // Correct path to include '.js' extension
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).send("Token required");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
};

// Create Assignment
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, description, dueDate, totalScore } = req.body;

    const assignment = new Assignment({
      title,
      description,
      dueDate,
      totalScore,
      createdBy: req.user.id, 
    });

    const savedAssignment = await assignment.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "donnie.schmidt5@ethereal.email",
        pass: "E6yXTPVq8NUJhUryqx",
      },
    });

    let info = await transporter.sendMail({
      from: "donnie.schmidt5@ethereal.email",
      to: "student_email@example.com", 
      subject: `New Assignment: ${title}`,
      text: `A new assignment has been created: ${description}`,
    });

    res.status(201).json({
      assignment: savedAssignment,
      email: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the assignment" });
  }
});

// Get All Assignments
router.get("/", authenticateToken, async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

// Get Single Assignment
router.get("/:id", authenticateToken, async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) return res.status(404).send("Assignment not found");
  res.json(assignment);
});

// Update Assignment
router.put("/:id", authenticateToken, async (req, res) => {
  console.log("Authenticated user ID:", req.user.id);

  const { title, description, dueDate, totalScore } = req.body;
  const assignment = await Assignment.findById(req.params.id);
  console.log("Found assignment:", assignment);

  if (!assignment) return res.status(404).send("Assignment not found");
  if (assignment.createdBy.toString() !== req.user.id)
    return res.status(403).send("Not authorized");

  assignment.title = title || assignment.title;
  assignment.description = description || assignment.description;
  assignment.dueDate = dueDate || assignment.dueDate;
  assignment.totalScore = totalScore || assignment.totalScore;

  await assignment.save();
  res.json(assignment);
});

// Delete Assignment
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id); 

    if (!assignment) return res.status(404).send("Assignment not found");

    if (assignment.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).send("Not authorized");
    }

    await Assignment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: `Assignment with ID ${req.params.id} has been deleted successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
