/* JS DOM-Spracovanie udalosti 29.5.2018*/
(function () {
"use strict"
var toggle, obr;
var n,maxN;
var q;

function action () {
	var c;
	c = document.querySelector("#c");
	c.classList.toggle("hide");
	//console.log( 'click' );
}

function action2() {
	console.log("tiež spracuje nadpis po kliknuti");
}

function action3(){
	console.log("ok");
		obr.onclick = null;
}

function action4 () {
	console.log("ok");
	obr.removeEventListener("click", action4, false);
}
function nextImage (e) {
	//console.log(e.type);
	//console.log(e.currentTarget);
	n++;
	if ( n>maxN) {
	n = 1;
}
e.currentTarget.src = "mypics/obr" + n + ".jpg";
}

toggle = document.querySelector("#toggle");

// user = click --> function

//toggle.onclick = action;

/*toggle.onclick = function(){
	console.log('also click');
}*/


toggle.addEventListener("click", action, false);
toggle.addEventListener("click", action2, false);

/*toggle.onclick = function() {
	console.log( 'also click' );
}
*/

obr = document.querySelector("#obr");
//obr.onclick = action3;
//obr.addEventListener("click", action4, false);

//obr.addEventListener("mouseover", nextImage, false);
//obr.addEventListener("mouseout", nextImage, false);
n = 1;
maxN = 5;
obr.addEventListener("click", nextImage, false);

q = document.querySelector("#q");

q.onkeyup = function (e){
	var input,text;
	input = e.currentTarget;
	text = e.currentTarget.value;
	if (text.length>=5 && text.length<=10){
	input.style.color = "green";
		//console.log(q.value);
		}else{
		input.style.color = "red";
		}
		}
}) ()


