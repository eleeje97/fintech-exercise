const express = require('express')
const app = express()
const path = require('path')

app.set('views', path.join(__dirname, 'views')); // ejs file location
app.set('view engine', 'ejs'); //select view template engine

app.use(express.static(path.join(__dirname, 'public'))); // to use static asset (design)

// ajax로 데이터를 보내는 것을 허용하겠다.
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// root 라우터
app.get('/', function (req, res) {
    var title = "javascript"
    res.send('<html><h1>'+title+'</h1><h2>contents</h2></html>')
})

// ejs --> view와 logic을 분리
app.get('/ejs', function (req, res) {
    res.render('test')
})

// test 라우터
app.get('/test', function(req, res) {
    res.send('Test')
})

// design
app.get('/design', function(req, res) {
    res.render('designTest');
})


// dataSend 라우터
app.get('/dataSend', function(req, res) {
    res.render('dataSend');
})

app.post('/getTime', function(req, res) {
    var nowTime = new Date();
    res.json(nowTime);
})

app.post('/getData', function(req, res) {
    console.log(req.body);
    var userData = req.body.userInputData;
    console.log('userData = ', userData)
    res.json(userData + "!!!!!!")
})


app.listen(3000)