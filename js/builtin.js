/* Math matematic.vstavane objekty */

/*console.log(Math.PI);*/

//console.log(Math.random());
var angle,result;
var d,e;
var mesta,pole;
var p;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Math.log10 = Math.log10 || function(x) {
  return Math.log(x) * Math.LOG10E;
}; // 3.zrada toto musiš dať ako test abz išlo aj pre ie8

//console.log(getRandomIntInclusive(1,6));
//1.zrada v JS uhly treba zadavať v radianoch
angle = 45;
angle = angle / (180/Math.PI);

result = Math.sin(angle);
//console.log(result);

//console.log(Math.log10(100));//2 2.zrada toto je nova metoda,treba pozrieť v akom prehliadači ide

/* Date*/

//console.lo(Date.now());

d = new Date();
e = new Date(2015,1,20);

//
//pole = [4];
//console.log(pole);

//console.log(d.getFullYear()); // 2018 metoda ukáže  akt.rok
//console.log(d.getFullYear()); // 2015 ukaže rok

d.setMonth(11);
d.setDate(24);

//console.log(d.getMonth());// 0-januar....11-december
//console.log(d.getDay());// 0-nedela....6-sobota

/* Array-polia su spec. druh metody*/

mesta = new Array("Bratislava", "Košice","Poprad");
//console.log(mesta.lenght);
//console.log(mesta.[3]);
mesta[0] = "Zilina";
//mesta[3] = "Bratislava";


//console.log(mesta);

/*mesta.push("Bratislava");
mesta.[6] = "Galanta";
mesta.forEach(function (item,index){
	console.log(index + ": " + item);
};

/*
for (var i = 0; i < mesta.lenght; i++) {
	console.log(mesta[i]);
}*/

p = document.querySelectorAll("p");// toto nieje Array ale Nodelist,array-like object
console.log(p.length);
console.log(p[0];// prvý odstavec v dokumente
