"use strict";

var x , y;
var h1;
var a,b;

console.log
x = 3;
y = 0;
//console.log(y);

h1 = document.querySelector("h1");

//console.log(h1);
//console.log(typeof h1);

if (h1){ /*h1 != null*/

h1.onclick = function () {
	console.log('klikol si na nadpis');
  }

}

a = -6;
b = 9;//može byt v tvare aj ako za 1. if (a>0 && b>0) alebo cize or 2. if (a>0 || b>0)
a =-6;
b =9;
/*if ( echo (true) && echo (false)) {
   console.log('ano');
}else{
	console.log('nie');
}
*/


/*var x,y;  x = 0; y = "0"; tu treba použiť aby si spravne porovnal hodnoty tvar if (x === y) js najprv porovnava ci ide o č. hodnoty alebo retazce a až potom vyhodnotí tu je zrada,
2.dalsia zrada je pri desat.č.  x = 0.3. y = 0.1 + 0.1 3.zrada if (x = y) x = 3; y = 6; vyhodi true co neni pravda,treba mať tri rovnatka vždy. !znači ze sa nesmie rovnat 3
if (x != 3) {
   console.log('true');
}else{
	console.log('false');
}
*/
//console.log(x);


/* var x,y ; x = 0;
if ( x > 0) {
	console.log('kladne');
	} else {
		console.log('zaporne abo nula');
	}
*/

//console.log('dalsi kod');
