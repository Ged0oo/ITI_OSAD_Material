var img = document.querySelector("#header img");
var container = document.querySelector(".center");
var navContainer = document.getElementById("navigation");
var header = document.getElementById("header");
var nav = document.getElementById("nav");

container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";

header.style.alignSelf = "flex-end";
header.style.width = "100%";
header.style.textAlign = "right";

var clone = img.cloneNode(true);
container.appendChild(clone);
clone.style.alignSelf = "flex-start";

nav.style.fontWeight = "bold";