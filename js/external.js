"use strict";

var headingColor, x1;
var r,g,b;
//var for;
//var document;
//document = "ahoj";

r = 255;
g = 128;
b = 66;

headingColor = "rgb(" + r + "," + g+ "," + b + ")";
console.log(headingColor);


document.querySelector("h1").onclick = function () {
	//console.log(headingColor);
	this.style.color = headingColor;

	//this.style.textAlign = "center";// centrovanie txt*/

}
