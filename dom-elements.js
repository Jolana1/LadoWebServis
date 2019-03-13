var img, animace;

img = document.querySelector("#obr");

//console.log(img.src);
//console.log(img.getAttribute("src"));

img.src = "./Image/good%20life.jpg";

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
