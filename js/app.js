var n;
n = 1;
maxN = 4;


$("#obr").on('click',function(){

n++;
	if(n>maxN) {
	n = 1;
		}
$(this).attr('src','mypics/obr'+ n + '.jpg');

})
