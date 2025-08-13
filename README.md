# 📚 EduNest – Your Digital Nest for Notes Sharing

**EduNest** is a web-based platform where students can **share, search, and access notes** for various subjects in an organized and user-friendly way.  
It’s designed to **simplify knowledge sharing** within educational communities and help students collaborate effectively.



## 📑 Table of Contents
- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Screenshots / Demo](#-screenshots--demo)
- [Folder Structure](#-folder-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Future Improvements](#-future-improvements)
- [Contact](#-contact)

## 📜 About the Project

EduNest is a simple yet powerful **notes sharing platform** built specially for **college students**.  
The idea came from my own experience — at the start of every semester, my friends and I would create Google Drive folders to share notes.  
While it worked, it often became messy and unorganized.  
That’s when I thought, *why not create a dedicated platform where students can easily upload, download, and browse each other’s notes in one place?*

With EduNest, any registered student can:
- 📤 **Upload** their study material in just a few clicks.
- 📥 **Browse and download** notes uploaded by others.
- 📚 **Access shared resources anytime** without digging through multiple links.

I developed this project **completely on my own** as a **major project for my placements**.  
Before starting EduNest, I had **no prior knowledge of backend technologies**.  
This project became my **project-based learning journey** — by the end, I gained solid experience in:
- Building secure APIs
- Handling file uploads
- Managing a database
- Implementing user authentication

EduNest is not just a project for me — it’s a **personal milestone** that turned a real-life problem into a working solution,  
while helping me grow as a **full-stack developer**.

## 🛠 Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- Responsive UI with custom CSS
- Client-side form validation

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB with Mongoose

**Authentication & Security:**
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Middleware for route protection

**File Handling & Uploads:**
- Multer for file uploads
- Local storage for uploaded files (can be extended to cloud storage)

**Email Services:**
- Nodemailer for sending password reset & verification emails

**Other Tools:**
- RESTful API architecture
- Git & GitHub for version control
- Postman for API testing


## ✨ Features

**Security & Authentication**
- **User Authentication** – Secure signup and login using JWT authentication.
- **Route Guarding (Protected Routes)** – Restricts access to certain pages or APIs unless the user is logged in, ensuring secure and authorized usage.
- **Secure Data Handling** – Passwords encrypted using bcrypt and files handled securely via Multer.
- **Forgot & Reset Password** – Recover account securely via email.

**Core Functionality**
- **Upload Notes** – Students can upload study material in various formats (PDF, DOCX, PPT, etc.).
- **Profile Management** – Update personal details and view your uploaded files.
- **Responsive Design** – Works smoothly on both desktop and mobile devices.
- *(Planned)* **Browse Notes** – Will allow users to view all uploaded notes with details like subject and uploader.
- *(Planned)* **Download Notes** – Will allow users to download notes instantly for offline study.
- *(Planned)* **Search Functionality** – Will allow users to find notes by keyword or subject.
