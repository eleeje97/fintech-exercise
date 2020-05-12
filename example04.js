var car = {
    name : "sonata",
    ph : "500ph",

    start : function() {
        console.log(this.name + "'s " + "engine is starting " + this.ph);
    },
    stop : function() {
        console.log(this.name + "'s " + "engine is stopped");
    }
}

console.log(car.name);
car.start();
car.stop();

var car2 = {
    name : "bmw",
    ph : "500ph",

    start : function() {
        console.log(this.name + "'s " + "engine is starting " + this.ph);
    },
    stop : function() {
        console.log(this.name + "'s " + "engine is stopped");
    }
}

car2.start();
car2.stop();