const mongoose = require('mongoose')
const { Song } = require('../db')

// const songSchema = new mongoose.Schema({
//     title: String,
//     artist: String,
//     album: String,
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }
// })

// const Song = mongoose.model('Song', songSchema)

const songs = [
    {name: 'Basket Case', artist: 'Green Day', album: 'Dookie'},
    {name: "21 Guns", artist: "Green Day", album: "21 Cen BDown"},
    {name: "Tender Surrender", artist: "Steve Vai", album: "Enc Guitar Mel."},
]



async function migrateData() {
    const User = require('./user');
    let user = null;

    try {
        user = await User.findOne({ username: 'dj' });
    } catch (error) {
        user = new User({ username: 'dj' });
        await user.save();
    }
    try {
        for (let s of songs) {
            if (await Song.findOne(s)) {
                continue;
            }
            let song = new Song(s);
            song.user = user;
            await song.save();
        }
        console.log('DJ data migration completed successfully.');
    } catch (error) {
        console.error('DJ migration failed:', error);
    } 
}

module.exports = { Song, migrateData }