const router = require('express').Router();
const Submission = require('../model/submission.model')


router.route('/').get( (req, res) => {
    res.render('Submission/addoredit', {
        viewTitle : "INSERT DETAILS "
    })
    
});


router.route('/').post( (req, res) => {
   const fullname = req.body.fullname;
   const email = req.body.email;
   const rollnumber = req.body.rollnumber;
   const mobile = req.body.mobile;
   const city = req.body.city;

   const uploadfile = req.body.uploadfile;
   const NewSubmission = new Submission({fullname, email, rollnumber, mobile, city, uploadfile});
   
   NewSubmission.save((err) => {
    if (!err)
        res.redirect('/submission');
    else {
        if (err.name == 'ValidationError') {
            handleValidationError(err, req.body);
            res.render('Submission/addoredit', {
                viewTitle: "INSERT DETAILS",
                NewSubmission: req.body
            });
        }
        else
            console.log('Error during record insertion : ' + err);
    }
     });
});


// FUNCTION
handleValidationError = (err, body) => {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullname':
                body['fullnameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'rollnumber':
                body['rollnumberError'] = err.errors[field].message;
                break;
            case 'uploadfile':
                body['uploadfileError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}






module.exports = router;