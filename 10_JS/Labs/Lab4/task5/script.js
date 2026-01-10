var cur = 0;
var interval;
var balls = document.querySelectorAll(".ball")
var cont = document.getElementById('container');

function startAnim(){
    interval = setInterval(() => {
        balls.forEach(ball => ball.src = "gray.jpg");
        cur = (cur+1)%balls.length;
        balls[cur].src = "red.jpg";
    }, 1000);
}

cont.onmouseover = function() {
    clearInterval(interval);
};

cont.onmouseout = function() {
    startAnim();
};

startAnim();