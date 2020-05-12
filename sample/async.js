function aFunc() {
    setTimeout(function () { // setTimeout지연시간을 주는 함수
        console.log('A');
    }, 700)
}

function bFunc() {
    setTimeout(function () {
        console.log('B');
    }, 1000)
}

function cFunc() {
    setTimeout(function () {
        console.log('C');
    }, 500)
}

aFunc();
bFunc();
cFunc();
