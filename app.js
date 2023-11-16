const express = require('express') 
const routes = require('./routes')
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db'); 

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'swe443-keys', resave: true, saveUninitialized: true }));

app.set('view engine', 'ejs')
app.set('view cache', false);
app.use(express.static('static'))
app.use('/', routes)

const port = 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})