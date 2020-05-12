const express = require('express')
const app = express()
const path = require('path')

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

// root 라우터
app.get('/', function (req, res) {
    res.send('<html><h1>title</h1><h2>contents</h2></html>')
})

// test 라우터
app.get('/test', function(req, res) {
    res.send('Test')
})

app.listen(3000)