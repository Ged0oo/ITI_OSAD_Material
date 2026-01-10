let idx = 0;
let timer = null;
let imgElement = document.getElementById("mainImg");
let images = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg", "images/6.jpg"];

function nextImg() {
    if (idx < images.length - 1) imgElement.src = images[++idx];
}

function prevImg() {
    if (idx > 0) imgElement.src = images[--idx];
}

function startSlideshow() {
    if (timer !== null) return;

    timer = setInterval(function() {
        idx++;
        if (idx >= images.length) idx = 0;
        imgElement.src = images[idx];
    }, 2000);
}

function stopSlideshow() {
    clearInterval(timer);
    timer = null;
}