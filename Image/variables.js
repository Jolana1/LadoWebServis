"use strict";

var x,y,z; // undefined
var temperature;

x = "ahoj"; // string
x = 'hi';
x = 'My name is O\'Neill';

x = -.5e2; // number, -50
//x = 0777;
x = "6ahoj";
y = "5";
z = x + y;

temperature = 15;
z = "Dnes je " + temperature + " stupnu";

x = "ahoj";
y = 4;
z = x * y; // "ahoj"--NaN(Not a Number),datovy typ number

z = 5 / 0; // Infinity, number

z = parseInt("5ahoj" , 10);
z = parseFloat("5.56");

/*

x = true;// boolean
*/

console.log(z);
console.log(typeof z);
