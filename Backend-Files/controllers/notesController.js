// const express = require("express");

// const notesDetail = require("../models/notes");

// const uploadNotes = (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({
//       error: "No files uploaded",
//     });
//   }

//   const processedFiles = req.files.map((file) => {
//     return {
//       originalName: file.originalname,
//       storedName: file.filename,
//       fileType: file.mimetype,
//       fileSize: file.size,
//       filePath: file.path,
//     };
//   });

//   res.json({
//     success: true,
//     message: "File Uploaded!!!!!",
//     filesCount: processedFiles.length,
//     uploadTime: new Date().toISOString(),
//     file: processedFiles.map((file) => {
//       return {
//         fileName: file.originalName,
//         fileSize: file.fileSize,
//       };
//     }),
//   });
// };

// // ---------------------------------Logic of upload notes form detail-----------------------------------------------
// const uploadFormDetail = async (req, res) => {
//   const {
//     noteTitle,
//     branch,
//     subject,
//     semester,
//     university,
//     course,
//     description,
//     tags,
//     allowDownload,
//     allowComments,
//     notifyActivity,
//   } = req.body;

//   if (
//     !noteTitle ||
//     !branch ||
//     !subject ||
//     !semester ||
//     !university ||
//     !course ||
//     !description
//   ) {
//     return res.json({
//       success: false,
//       message: "please fill all details",
//     });
//   }

//   const newNotes = new notesDetail({
//     title: noteTitle,
//     branch,
//     subject,
//     semester,
//     university,
//     course,
//     description,
//   });

//   await newNotes.save();

//   console.log("New Notes Added:", newNotes.title);

//   res.json({
//     success: true,
//     message: "notes is successfully added to the Database",
//     notesDetail: {
//       id: newNotes._id,
//       title: newNotes.title,
//       branch: newNotes.branch,
//       subject: newNotes.subject,
//       semester: newNotes.semester,
//       university: newNotes.university,
//       course: newNotes.course,
//       description: newNotes.description,
//       date: newNotes.uploadAt,
//     },
//   });
// };

// //----------------------------------for showing notes------------------
// const getUserNotes = async (req, res) => {
//   try {
//     console.log("Decoded user:", req.user);

//     const notes = await notesDetail
//       .find({ userId: req.user.userId })
//       .sort({ createdAt: -1 });

//     res.json({ success: true, notes });
//   } catch (error) {
//     console.error("Error fetching user notes:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// module.exports = { uploadFormDetail, uploadNotes, getUserNotes };

const Notes = require("../models/notes");

// Upload notes file info
const uploadNotes = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const processedFiles = req.files.map((file) => ({
    originalName: file.originalname,
    storedName: file.filename,
    fileType: file.mimetype,
    fileSize: file.size,
    filePath: file.path,
  }));

  res.json({
    success: true,
    message: "File Uploaded!",
    filesCount: processedFiles.length,
    file: processedFiles.map((file) => ({
      fileName: file.originalName,
      fileSize: file.fileSize,
    })),
  });
};

// Upload form details
const uploadFormDetail = async (req, res) => {
  const {
    noteTitle,
    branch,
    subject,
    semester,
    university,
    course,
    description,
  } = req.body;

  if (
    !noteTitle ||
    !branch ||
    !subject ||
    !semester ||
    !university ||
    !course ||
    !description
  ) {
    return res.json({ success: false, message: "Please fill all details" });
  }

  const newNotes = new Notes({
    // userId: req.user ? req.user.id : null, // use JWT userId if logged in
    userId: req.user.id,
    title: noteTitle,
    branch,
    subject,
    semester,
    university,
    course,
    description,
  });

  await newNotes.save();

  res.json({
    success: true,
    message: "Note added to DB",
    notesDetail: newNotes,
  });
};

// Get notes for logged-in user
const getUserNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.user?.id }).sort({
      uploadAt: -1,
    });

    // If no notes, send demo notes
    if (!notes || notes.length === 0) {
      return res.json({
        success: true,
        notes: [
          {
            _id: "demo1",
            title: "Sample DSA Notes",
            branch: "CSE",
            subject: "DSA",
            semester: "5",
            university: "Demo University",
            course: "B.Tech",
            description: "These are demo notes for testing.",
            downloads: 120,
            likes: 45,
            uploadAt: new Date(),
          },
          {
            _id: "demo2",
            title: "Database Notes",
            branch: "CSE",
            subject: "Database",
            semester: "5",
            university: "Demo University",
            course: "B.Tech",
            description: "Sample notes about SQL and MongoDB.",
            downloads: 95,
            likes: 30,
            uploadAt: new Date(),
          },
        ],
      });
    }

    res.json({ success: true, notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { uploadFormDetail, uploadNotes, getUserNotes };
