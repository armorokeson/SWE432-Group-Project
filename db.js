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

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    played: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Song = mongoose.model('Song', songSchema)

module.exports = { db, Song };
