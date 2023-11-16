const express = require('express')
const router = express.Router();

function read_user (req) {
    // read user from session, error handling if user is not logged in
    // return user if logged in, otherwise return null
    try {
        return req.session.user
    } catch (error) {
        return null
    }
}

function is_login (req) {
    return !!read_user(req);
}

router.get('/', (req, res) => {
    res.render('pages/index', { isLogin: is_login(req), user: read_user(req) })
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('pages/login')
})

router.post('/login', async (req, res) => {
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

router.get('/listener', (req, res) => {
    const songs = [
        { title: "Star", artist: "Oliver Tree"},
        { title: "Rain", artist: "Sleep Token"},
        { title: "Back to You", artist: "Illenium"}
    ]

    res.render('pages/listener', { songs })
})

router.get('/dj', (req, res) => {

    const records = [
        {name: 'Basket Case', artist: 'Green Day', album: 'Dookie'},
        {name: "21 Guns", artist: "Green Day", album: "21 Cen BDown"},
        {name: "Tender Surrender", artist: "Steve Vai", album: "Enc Guitar Mel."},
    ]

    res.render('pages/dj', {records})

})

router.get('/producer', async (req, res) => {
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

module.exports = router