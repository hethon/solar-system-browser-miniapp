function setBackgroundFor(container, position='') {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    let containerElt = document.querySelector(container);
    canvas.height = containerElt.clientHeight;
    canvas.width = containerElt.clientWidth;
    canvas.style.zIndex = "-1";
    canvas.style.position = position;
    canvas.style.backgroundColor = "black";

    containerElt.appendChild(canvas);

    const COLOR_STARS = "white";
    const STAR_NUM = 200; // number of stars in the starfield
    const STAR_SIZE = 0.005; // max star size as a fraction of screen width
    const STAR_SPEED = 0.05; // fraction of screen width per second


    // set up the stars
    var stars = [];
    var starSpeed = STAR_SPEED * canvas.width;
    var vx = starSpeed * randomSign() * Math.random();
    // Using Pythagoras' theorem, vy = sqrt(starSpeed^2 - vx^2)
    var vy = Math.sqrt(Math.pow(starSpeed, 2) - Math.pow(vx, 2)) * randomSign();
    for (let i = 0; i < STAR_NUM; i++) {
        let speedMult = Math.random() * 1.5 + 0.5;
        stars[i] = {
            r: Math.random() * STAR_SIZE * canvas.width / 2,
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            vx: vx * speedMult,
            vy: vy * speedMult
        }
    }

    // set up the animation loop
    var timeDelta, timeLast = 0;
    requestAnimationFrame(animation);

    function animation(timeNow) {
        // calculate the time difference
        timeDelta = timeNow - timeLast;
        timeLast = timeNow;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw the stars
        ctx.fillStyle = COLOR_STARS;
        for (let i = 0; i < STAR_NUM; i++) {
            ctx.beginPath();
            ctx.arc(stars[i].x, stars[i].y, stars[i].r, 0, Math.PI * 2);
            ctx.fill();

            // update the star's x position
            stars[i].x += stars[i].vx * timeDelta * 0.001;

            // reposition the star to the other side if it goes off screen
            if (stars[i].x < 0 - stars[i].r) {
                stars[i].x = canvas.width + stars[i].r;
            } else if (stars[i].x > canvas.width + stars[i].r) {
                stars[i].x = 0 - stars[i].r;
            }
            
            // update the star's y position
            stars[i].y += stars[i].vy * timeDelta * 0.001;

            // reposition the star to the other side if it goes off screen
            if (stars[i].y < 0 - stars[i].r) {
                stars[i].y = canvas.height + stars[i].r;
            } else if (stars[i].y > canvas.height + stars[i].r) {
                stars[i].y = 0 - stars[i].r;
            }
        }

        // call the next frame
        requestAnimationFrame(animation);
    }

}

function randomSign() {
    return Math.random() >= 0.5 ? 1 : -1;
}
