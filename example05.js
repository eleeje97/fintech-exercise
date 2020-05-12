// #java
// String[] weeks = new String[7];
// weeks[0] = "Sun" // 0, 0.11 같이 문자열 이외의 타입은 들어갈 수 없음


var obj = {
    name : "daeun"
}

// #javascript
var weeks = ['Sun', 'Mon', 'Tues'];
weeks.push('Wed');
weeks.push('Turs');
weeks.push('Fri');
weeks.push('Sat');

weeks.push(1);
weeks.push(obj);
console.log(weeks)

console.log(weeks[0])