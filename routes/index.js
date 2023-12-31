const express = require('express')
const router = express.Router();

function read_user(req) {
    // read user from session, error handling if user is not logged in
    // return user if logged in, otherwise return null
    try {
        return req.session.user
    } catch (error) {
        return null
    }
}

function is_login(req) {
    return !!read_user(req);
}

router.get('/', (req, res) => {
    if (!is_login(req)) {
        return res.redirect('/login')
    }

    res.render('pages/index', { isLogin: is_login(req), user: read_user(req) })
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('pages/login')
})

router.post('/login', async(req, res) => {
    try {
        const User = require('./user');
        const username = req.body.username;
        let user = await User.findOne({ username });

        if (!user) {
            // If the user does not exist, create a new one
            user = new User({ username });
            await user.save();
        }

        // Set up session or any other login mechanism
        req.session.user = user;

        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error processing your login');
    }
});

router.get('/listener', async(req, res) => {
    if (!is_login(req)) {
        return res.redirect('/login')
    }

    const user = read_user(req);
    const { Song, migrateData } = require('./listener');

    if ('songs' in req.query) {
        console.log('Getting songs')
        const songs = await Song.find({ user: user })
        return res.json(songs)
    }

    try {
        await migrateData();
    } catch (error) {
        console.error('Listener migration failed:', error);
    }

    try {
        const songs = await Song.find({ user: user });
        res.render('pages/listener', { songs });
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).send('Server error occurred');
    }
})

router.post('/listener', async(req, res) => {
    if (!is_login(req)) {
        res.status(401).json({ error: 'You need to login first.' });
        return;
    }

    const user = read_user(req);
    const { Song } = require('./listener');
    const { title, artist } = req.body;

    const newSong = new Song({
        title: title,
        artist: artist,
        user: user,
    })

    try {
        await newSong.save()
        res.status(201).json({ message: 'Song added successfully' });
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/listener', async(req, res) => {
    const user = read_user(req)
    const { Song } = require('./listener')
    const { title, artist } = req.body;

    console.log('Deleting song');

    const song = new Song({
        title: title,
        artist: artist,
        user: user,
    })

    try {
        await Song.deleteMany({ title: title, user: user });
        res.status(201).json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.log('Error deleted song:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



router.get('/dj', async(req, res) => {
    // Post error if user is not logged in
    if (!is_login(req)) {
        res.status(401).send('You need to login first. Test data under "dj" user. <a href="/login">Login</a>');
        return;
    }
    const user = read_user(req);
    const { Song, TimeSlot, migrateData } = require('./dj');
    try {
        await migrateData();
    } catch (error) {
        console.error('DJ migration failed:', error);
    }
    try {
        // Get all the songs, timeslots, and trending based on the user
        const songs = await Song.find({ user: user });
        const timeslots = await TimeSlot.find({ user: user });
        if (!timeslots) {
            console.error("Timeslots not found");
            res.status(500).send('Server error occurred');
            return;
        }
        console.log("Timeslots:", timeslots);
        res.render('pages/dj', { songs, timeslots });
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).send('Server error occurred');
    }
})

router.get('/producer', async(req, res) => {
    // Post error if user is not logged in
    if (!is_login(req)) {
        res.status(401).send('You need to login first. Test data under "producer" user. <a href="/login">Login</a>');
        return;
    }
    const user = read_user(req);
    const { Song, Comment, Trending, migrateData } = require('./producer');
    try {
        await migrateData();
    } catch (error) {
        console.error('Producer migration failed:', error);
    }
    try {
        // Get all the songs, comments, and trending based on the user
        const songs = await Song.find({ user: user });
        const comments = await Comment.find({ user: user });
        const trending = await Trending.find({ user: user });

        res.render('pages/producer', { songs, comments, trending });
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).send('Server error occurred');
    }
})

router.post('/producer', async (req, res) => {
    if (!is_login(req)) {
        res.status(401).json({ error: 'You need to login first.' });
        return;
    }

    const user = read_user(req);

    const { Song } = require('./producer');
    const { title, artist } = req.body;

    const newSong = new Song({
        title: title,
        artist: artist,
        played: 0,
        user: user,
    })

    try {
        await newSong.save()
        res.status(201).json({ message: 'Song added successfully' });
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router