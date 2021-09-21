const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const submissionRouter = require('./router/submission');
const upload = require('express-fileupload');
const app = express();


// SET ENGINE
app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');



// MIDDLEWARE
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(submissionRouter);
app.use(upload());



//MONODB CONNECTION
const URL = process.env.ATLAS_URL;
mongoose.connect(URL)
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Databse is Connected!');
});


//PORT
const PORT = process.env.PORT || 3000;


//SERVER CALLING
app.listen(PORT , () => console.log(`server is running at port ${PORT}`));