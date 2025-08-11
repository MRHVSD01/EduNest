const express = require('express');
const notesDetail = require('../models/notes');

const uploadNotes = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      error: "No files uploaded",
    });
  }

  const processedFiles = req.files.map((file) => {
    return {
      originalName: file.originalname,
      storedName: file.filename,
      fileType: file.mimetype,
      fileSize: file.size,
      filePath: file.path,
    };
  });

  res.json({
    success: true,
    message: "File Uploaded!!!!!",
    filesCount: processedFiles.length,
    uploadTime: new Date().toISOString(),
    file: processedFiles.map((file) => {
      return {
        fileName: file.originalName,
        fileSize: file.fileSize,
      };
    }),
  });
}

// ---------------------------------Logic of upload notes form detail-----------------------------------------------
const uploadFormDetail  = async (req, res) => {
  const {
    noteTitle,
    branch,
    subject,
    semester,
    university,
    course,
    description,
    tags,
    allowDownload,
    allowComments,
    notifyActivity,
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
    return res.json({
      success: false,
      message: "please fill all details",
    });
  }

  const newNotes =  new notesDetail({
    title: noteTitle,
    branch,
    subject,
    semester,
    university,
    course,
    description,
  })

  await newNotes.save();

  console.log('New Notes Added:', newNotes.title);

  res.json({
    success: true,
    message: 'notes is successfully added to the Database',
    notesDetail: {
      id : newNotes._id,
      title: newNotes.title,
      branch: newNotes.branch,
      subject: newNotes.subject,
      semester: newNotes.semester,
      university: newNotes.university,
      course: newNotes.course,
      description: newNotes.description,
      date: newNotes.uploadAt
    }
  });
}
module.exports = { uploadFormDetail, uploadNotes };