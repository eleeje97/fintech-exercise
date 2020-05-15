const express = require('express')
const app = express()
const path = require('path')

var request = require('request');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');

var auth = require('./lib/auth');


app.set('views', path.join(__dirname, 'views')); // ejs file location
app.set('view engine', 'ejs'); //select view template engine

app.use(express.static(path.join(__dirname, 'public'))); // to use static asset (design)

// ajax로 데이터를 보내는 것을 허용하겠다.
app.use(express.json());
app.use(express.urlencoded({extended:false}));


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'fintech'
});

connection.connect();


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


// authTest
app.post('/authTest', auth, function(req, res) {
    res.json(req.decoded);
})




//------------------ service start ------------------//
// signup 페이지
app.get('/signup', function(req, res) {
    res.render('signup');
})

// authResult 사용자 인증, 토큰 요청
app.get('/authResult', function(req, res) {
    var authCode = req.query.code
    console.log(authCode);


    // accesstoken get request
    var option = {
        method : "POST",
        url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
        header : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        form : {
            code : authCode, // 사용자마다 달라지는 값
            client_id : 'a4VYuap4YmsWUp8gRiFKHvnT2s7wNTD90mbRkuGN',
            client_secret : 'uzdgS8WDa2yfraBa2ooGbi8lBnbpwGhzL1OpPXKY',
            redirect_uri : 'http://localhost:3000/authResult',
            grant_type : 'authorization_code'
        }
    }

    request(option, function(err, response, body) {
        if(err) {
            console.error(err);
            throw err;
        }
        else {
            var accessRequestResult = JSON.parse(body);
            console.log(accessRequestResult);
            res.render('resultChild', {data : accessRequestResult})
        }
    })

})


// signup 동작
app.post('/signup', function(req, res) {
    // data req get db store
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userAccessToken = req.body.userAccessToken;
    var userRefreshToken = req.body.userRefreshToken;
    var userSeqNo = req.body.userSeqNo;

    console.log(userName, userAccessToken, userSeqNo);


    var sql ="INSERT INTO fintech.user (name, email, password, accesstoken, refreshtoken, userseqno) VALUES (?,?,?,?,?,?)"
    connection.query(
        sql, // execute sql
        [userName, userEmail, userPassword, userAccessToken, userRefreshToken, userSeqNo], // ? <- value
        function(err, result) {
            if(err) {
                console.error(err);
                res.json(0);
                throw err;
            }
            else {
                res.json(1);
            }
        }
    )
})

// login 페이지
app.get('/login', function(req, res) {
    res.render('login');
})

// login 동작
app.post('/login', function(req, res) {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;

    var sql = "SELECT * FROM user WHERE email = ?";
    connection.query(sql, [userEmail], function(err, result) {
        if(err) {
            console.error(err);
            res.json(0);
            throw err;
        }
        else {
            if(result.length == 0) {
                res.json(3)
            }
            else {
                var dbPassword = result[0].password;
                if(dbPassword == userPassword) {
                    // login success
                    var tokenKey = "f@i#n%tne#ckfhlafkd0102test!@#%";
                    jwt.sign(
                        {
                            userId : result[0].id,
                            userEmail : result[0].email
                        },
                        tokenKey,
                        {
                            expiresIn : '10d',
                            issuer : 'fintech.admin',
                            subject : 'user.login.info'
                        },
                        function(err, token){
                            console.log('로그인 성공', token)
                            res.json(token)
                        }
                    )
                }
                else {
                    res.json(2);
                }
            }
        }
    })
})


// main 페이지
app.get('/main', function(req, res) {
    res.render('main');
})


// list: 사용자 정보 조회
app.post('/list', auth, function(req, res) {
    //api response body
    var userId = req.decoded.userId;
    var sql = "SELECT * FROM user WHERE id = ?"
    connection.query(sql, [userId], function(err, result) {
        if(err) {
            console.error(err);
            throw err;
        }
        else {
            console.log(result);

            var option = {
                method : "GET",
                url : "https://testapi.openbanking.or.kr/v2.0/user/me",
                headers : {
                    Authorization : 'Bearer ' + result[0].accesstoken // accessToken
                },
                qs : {
                    user_seq_no : result[0].userseqno // user_seq_no
                }
            }
        
            request(option, function(err, response, body) {
                if(err) {
                    console.error(err);
                    throw err;
                }
                else {
                    var accessRequestResult = JSON.parse(body);
                    console.log(accessRequestResult);
                    res.json(accessRequestResult);
                }
            })
        }
    })
})


// balance 페이지 : 잔액조회
app.get('/balance', function(req, res) {
    res.render('balance');

    /*
        var option = {
        method = "GET"
    }
    request()
    */
})


app.listen(3000)