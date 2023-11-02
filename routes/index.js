const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/index')
})

router.get('/listener', (req, res) => {
    const songs = [
        { title: "Star", artist: "Oliver Tree"},
        { title: "Rain", artist: "Sleep Token"},
        { title: "Back to You", artist: "Illenium"}
    ]

    res.render('pages/listener', { songs })
})

router.get('/dj', (req, res) => {
    res.render('pages/dj')
})

router.get('/producer', (req, res) => {
    const songs = [
        { title: "Star", played: 100 },
        { title: "Sunset", played: 200 },
        { title: "Moonlight", played: 150 }
    ];

    const comments = [
        "Comment 1",
        "Comment 2",
        "Comment 3",
        "Comment 4"
    ];

    const trending = [
        "Song A",
        "Song B",
        "Song C"
    ];
    res.render('pages/producer', { songs, comments, trending });
})

module.exports = router