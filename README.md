# Writing the provided README content into a README.md file
readme_content = """
# Classroom Assignments Backend

This is a backend microservice for managing student assignments. The service provides APIs for authentication and CRUD operations on assignments using **Node.js**, **Express**, **MongoDB Atlas**, and **JWT authentication**. The project is Dockerized for easy deployment.

---

## Features

1. **Authentication**
   - Mock login endpoint to generate JWT tokens.
   - Secure routes using JWT.

2. **Assignment Management**
   - Create, Read, Update, and Delete (CRUD) assignments.
   - Role-based authorization: Only teachers can create, update, or delete assignments.

3. **Additional Features**
   - Notifications via email when an assignment is created.
   - Dockerized for easy deployment.
   - MongoDB Atlas integration for cloud-based data storage.

---

## Technologies Used

- **Node.js** (v22)
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **JWT** - Authentication and authorization
- **Nodemailer** - Email notifications
- **Docker** - Containerization

---

## Prerequisites

1. Install **Docker** and **Docker Compose**.
2. Set up a **MongoDB Atlas** cluster.
3. Create a `.env` file in the project root with the following:

   ```plaintext
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
