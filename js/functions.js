var  kolik,text;

var vysledok


function vypis(kedy,pocet) { /* deklarácia funkcie*/

	//console.log(kedy +' som vypil ' + pocet+ ' piv');
	return (kedy +' som vypil ' + pocet+ ' piv') ;
}

function mocnina (x) {
	return x * x;
}

kolik = 7;
/*
vypis('Vcera',kolik);
vypis('Vcera',5);
vypis(); // undefined
*/
text = vypis ('Vcera', 7);
//console.log(text);

vysledok = mocnina(5);
console.log(vysledok);

//document.onclick = vypis;
