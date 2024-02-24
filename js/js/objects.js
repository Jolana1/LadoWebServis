"use strict"

var o, h1;
var vlastnost;
var v;

function factory (){
	var o;
	o = {
		x: 'ahoj'
	}
	return o;
	//return {x:'hi'}
}

o = {
	width:10,
	height:20,
	getArea: function() {
		return this.width * this.height;
		}
};

h1 = document.querySelector("h1");

//o.widht = 30;/ preklep zle urobený objekt

//console.log(typeof h1); //object
//console.log(o.height);
//console.log(o['height']); // alternativny zápis objektu

vlastnost = 'width';

//console.log (o[vlastnost]); // o['width']
o.width = 50;
v =	o.getArea();// 1000
//console.log(v);

console.log(factory().x);
