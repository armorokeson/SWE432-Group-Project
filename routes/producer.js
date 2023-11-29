const mongoose = require('mongoose');
const { Song } = require('../db')

// // Song
// const songSchema = new mongoose.Schema({
//     title: String,
//     played: Number,
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }
// });
// const Song = mongoose.model('Song', songSchema);

// Comment
const commentSchema = new mongoose.Schema({
    text: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Comment = mongoose.model('Comment', commentSchema);

// Trending
const trendingSchema = new mongoose.Schema({
    title: String,
    played: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Trending = mongoose.model('Trending', trendingSchema);

// Data for Migration
const songsData = [
    { title: "Star", played: 100 },
    { title: "Sunset", played: 200 },
    { title: "Moonlight", played: 150 }
];

const commentsData = [
    { text: "Comment 1" },
    { text: "Comment 2" },
    { text: "Comment 3" },
    { text: "Comment 4" }
];

const trendingsData = [
    { title: "Song A", played: 0 },
    { title: "Song B", played: 0 },
    { title: "Song C", played: 0 }
];

// Migration Function
async function migrateData() {
    const User = require('./user');
    let user = null;
    try {
        user = await User.findOne({ username: 'producer' });
    } catch (error) {
        user = new User({ username: 'producer' });
        await user.save();
    }
    try {
        // Create a user named "producer" if not exsits, and link it with all the songs, comments, and trending
        for (let songData of songsData) {
            if (await Song.findOne(songData)) {
                continue;
            }
            let song = new Song(songData);
            song.user = user;
            await song.save();
        }
        for (let commentData of commentsData) {
            if (await Comment.findOne(commentData)) {
                continue;
            }
            let comment = new Comment(commentData);
            comment.user = user;
            await comment.save();
        }
        for (let trendingData of trendingsData) {
            if (await Trending.findOne(trendingData)) {
                continue;
            }
            let trending = new Trending(trendingData);
            trending.user = user;
            await trending.save();
        }

        console.log('Producer data migration completed successfully.');
    } catch (error) {
        console.error('Producer migration failed:', error);
    } 
}

module.exports = {
    Song,
    Comment,
    Trending,
    migrateData
}