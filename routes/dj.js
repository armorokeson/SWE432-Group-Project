const mongoose = require('mongoose')
const { Song } = require('../db')

const timeSlotSchema = new mongoose.Schema({
    interval: String,
    records: [],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

const songs = [
    { name: "Basket Case", artist: 'Green Day', album: 'Dookie' },
    { name: "21 Guns", artist: "Green Day", album: "21 Cen BDown" },
    { name: "Tender Surrender", artist: "Steve Vai", album: "Enc Guitar Mel." },
    { name: 'One More Time', artist: 'Blink 182', album: 'OMT' },
    { name: "Angry", artist: "The Rolling Stones", album: "Hackney Diamond" },
    { name: "The Matrix", artist: "Mother Mother", album: "The M" }
]

const timeslots = [
    { interval: "12am-3am", records: [{ name: "Basket Case", artist: 'Green Day', album: 'Dookie' }, { name: "21 Guns", artist: "Green Day", album: "21 Cen BDown" }, { name: 'One More Time', artist: 'Blink 182', album: 'OMT' }] },
    { interval: "3am-6am", records: [{ name: 'One More Time', artist: 'Blink 182', album: 'OMT' }, { name: "21 Guns", artist: "Green Day", album: "21 Cen BDown" }] },
    { interval: "6am-9am", records: [{ name: 'One More Time', artist: 'Blink 182', album: 'OMT' }, { name: "21 Guns", artist: "Green Day", album: "21 Cen BDown" }] },
    { interval: "9am-12pm", records: [{ name: 'One More Time', artist: 'Blink 182', album: 'OMT' }, { name: "21 Guns", artist: "Green Day", album: "21 Cen BDown" }] },
    { interval: "12pm-3pm", records: [{ name: 'One More Time', artist: 'Blink 182', album: 'OMT' }, { name: "21 Guns", artist: "Green Day", album: "21 Cen BDown" }] },
    { interval: "3pm-6pm", records: [{ name: 'One More Time', artist: 'Blink 182', album: 'OMT' }, { name: "21 Guns", artist: "Green Day", album: "21 Cen BDown" }] },
    { interval: "6pm-9am", records: [{ name: 'One More Time', artist: 'Blink 182', album: 'OMT' }, { name: "21 Guns", artist: "Green Day", album: "21 Cen BDown" }] },
    { interval: "9am-12am", records: [{ name: 'One More Time', artist: 'Blink 182', album: 'OMT' }, { name: "21 Guns", artist: "Green Day", album: "21 Cen BDown" }] }
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
        for (let ts of timeslots) {
            if (await TimeSlot.findOne(ts)) {
                continue;
            }

            let timesl = new TimeSlot(ts);
            for (let song of songs) {

            }
            timesl.user = user;
            await timesl.save();
        }

        console.log('DJ data migration completed successfully.');
    } catch (error) {
        console.error('DJ migration failed:', error);
    }
}

module.exports = {
    Song,
    TimeSlot,
    migrateData
}