const express = require('express')
const app = express()

// root 라우터
app.get('/', function (req, res) {
    res.send('Hello Express')
})

// test 라우터
app.get('/test', function(req, res) {
    res.send('Test')
})

app.listen(3000)