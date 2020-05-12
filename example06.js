// array-object
var cars= [];
var car01 = {
    name: "sonata",
    ph: "500ph",

    start: function() {
        console.log("engineisstarting");
    },
    stop: function() {
        console.log("engineisstoped");
    }
}
var car02 = {
    name: "BMW",
    ph: "600ph",

    start: function() {
        console.log("engineisstarting");
    },
    stop: function() {
        console.log("engineisstoped");
    }
}

cars[0] = car01;
cars[1] = car02;
console.log(cars[1].name);


// for-loop
var cars= ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
var text= "";
var i;
for(i = 0; i < cars.length; i++) {
    text += cars[i];
}
console.log(text);
