const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Song = mongoose.model('Song', songSchema)

const songs = [
    { title: "Star", artist: "Oliver Tree" },
    { title: "Rain", artist: "Sleep Token" },
    { title: "Back to You", artist: "Illenium" }
]

async function migrateData() {
    const User = require('./user');
    let user = null;

    try {
        user = await User.findOne({ username: 'listener' });
    } catch (error) {
        user = new User({ username: 'listener' });
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
        console.log('Listener data migration completed successfully.');
    } catch (error) {
        console.error('Listener migration failed:', error);
    } 
}

module.exports = { Song, migrateData }