var fs = require('fs'); // filesystem 모듈

console.log('first func');
fs.readFile('./example/test.txt', 'utf8', function (err, result) {
    if(err) {
        console.error(err);
        throw err;
    }
    else {
        console.error('second func, file loading...');
        console.log(result);
    }
});
console.log('third func');