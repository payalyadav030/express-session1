// cookies, express-session, packaages:
// see bookmarks


const fs = require('fs')
const chalk = require('chalk');
const express = require('express');
const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');

const PORT = 8789;
app.use(express.json());
app.use('/static', express.static('public'));

// format for a session 
app.use(session({
    name: 'pay-session',
    secret : 'abcdefgh1234$$$###',
    resave : true,
    saveUninitialized : true,
    //rolling: false,
    cookie : {
        httpOnly : true,
        maxAge : 15000,
        path : '/',
        sameSite : true,
        secure : false,

    }
}));

const hbs = exphbs.create({
    extname : '.hbs'
});

var bookRoute = require('./routes/book.js')
var authRoute = require('./routes/authentication.js');

// apply auth middleware on application level
app.use(authRoute.checkedIfLoggedIn);

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// authentiation 
app.post('/create', bookRoute.create);
app.post('/login', authRoute.login);

app.post('/logout', authRoute.logout);





app.listen(PORT, function(){
    console.log("application has been started on port:", PORT);
})