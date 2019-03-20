var img, animace;

img = document.querySelector("#bg");

//console.log(img.src);
//console.log(img.getAttribute("src"));

img.src = "../WebServis/Image/bg3.jpg";

//console.log(typeof img);
//console.log(img);

//document.querySelector("h1").innerHTML = "©Úvod do JS/DOM Elementy a CSS";
//document.querySelector("h1").textContent = "Úvod do JS/ DOM Elementy a CSS";

//document.querySelector("h1").className = "mystyle";
//document.querySelector("h1").classList.add = ("mystyle");

animace = document.querySelector("#animace");

animace.onclick = function() {
animace.style.backgroundPosition = "0 0";
}
