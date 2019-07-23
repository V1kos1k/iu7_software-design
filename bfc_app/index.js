const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// API
const users = require('./routes/api/users');
const tests = require('./routes/api/tests');

// Pages
const mainPage = require('./routes/MainPage/mainPage-server');
const signIn = require('./routes/SignIn/signIn-server');
const signUp = require('./routes/SignUp/signUp-server');
const testsPage = require('./routes/TestsPage/testsPage-server');
const addTest = require('./routes/AddTest/addTest-server');
const test = require('./routes/Test/test-server');
const personalArea = require('./routes/PersonalArea/personalArea-server');


// Use API
app.use('/api/users', users);
app.use('/api/tests', tests);

// Use static
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

// Use Pages
app.use('/', mainPage);
app.use('/signin', signIn);
app.use('/signup', signUp);
app.use('/testsPage', testsPage);
app.use('/addtest', addTest);
app.use('/test', test);
app.use('/personalarea', personalArea);

const port = process.env.PORT || 5001;

console.log(__dirname + '/js');

app.listen(port, () => console.log(`Server started on port ${port}`));