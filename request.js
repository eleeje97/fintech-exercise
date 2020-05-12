const request = require('request');
var parseString = require('xml2js').parseString;

/*
request('http://www.google.com', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
*/


// weather api 예제
request('https://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
    //console.log('body:', body);

    // #work3 xml2js example
    parseString(body, function (err, result) {
        console.dir(result);
        console.dir(result.rss);
        console.dir(result.rss.channel[0]);

        // #work4 wf forecast info print
        console.dir(result.rss.channel[0].item[0].description[0].header[0].wf[0]);
    });
});



// 마스크 판매정보 api 예제
request('https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json', function (error, response, body) {
    //console.log(body);

    var obj = JSON.parse(body);
    console.dir(obj.count);
    console.dir(obj.stores[0]);
});
