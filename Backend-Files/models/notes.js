const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {type: String, required: true},
    branch: {type: String, required: true},
    subject: {type: String, required: true},
    semester: {type: String, required: true},
    university: {type: String, required: true},
    course: {type: String, required: true},
    description: {type: String, required: true},
    uploadAt: {type: Date, default: Date.now} 
});

module.exports = mongoose.model("notesDetail", notesSchema);