const mongoose = require('mongoose');

//SCHEMA
const Schema = mongoose.Schema;
const StudentsShema = new Schema({
    fullname: {
        type:String,
        required: "This field is Required"
    },

    email: {
        type: String,
        required: "This field is Required"
    },

    mobile: {
        type: Number,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    rollnumber: {
        type: String,
        required:"This field is Required"
    },

    uploadfile: {
        type:String,
        required:"This field is Required"
    }},

    {
       timestamps: true
    }
);

// CUSTOM VALLIDATION FOR EMAIL
StudentsShema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail');

// DATABASE NAME
const Submission = mongoose.model('submissions', StudentsShema);
module.exports = Submission;