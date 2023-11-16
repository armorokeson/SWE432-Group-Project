const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017';

mongoose.connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    dbName: 'swe443-project'
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Successfully connected to MongoDB');
});

module.exports = db;
