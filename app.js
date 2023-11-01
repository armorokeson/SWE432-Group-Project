const express = require('express') 
const routes = require('./routes')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('static'))
app.use('/', routes)

const port = 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})