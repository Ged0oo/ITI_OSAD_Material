var originalDiv = document.querySelector('.box');

originalDiv.addEventListener('click', function() {
    var clone = originalDiv.cloneNode(true);
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var randomColor = `rgb(${r}, ${g}, ${b})`;
    clone.style.backgroundColor = randomColor;
    document.body.appendChild(clone);
});