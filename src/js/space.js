export let space = {
  init() {
    space.AnimationRequestId;
    space.speedUpUntile = 0; // speed the camera until `now` >= `speedUpUntile`

    space.colorStars = "white";
    space.sizeFactor = 0.005; // max star size as a fraction of screen width
    space.speedFactor = 0.001; // fraction of screen width per second

    space.canvas = document.querySelector(".space > canvas");
    space.ctx = space.canvas.getContext("2d");

    window.addEventListener("resize", () => {
      space.setupStarts();
      space.update();
    });

    space.setupStarts();
    space.update();
  },

  setupStarts() {
    space.canvas.width = window.innerWidth;
    space.canvas.height = window.innerHeight;

    const STAR_SIZE =
      (space.sizeFactor * Math.min(space.canvas.width, space.canvas.height)) /
      2;
    const STAR_SPEED = space.speedFactor * space.canvas.width;
    const STAR_NUM = 200; // number of stars in the starfield

    // set up the stars
    space.stars = [];
    for (let i = 0; i < STAR_NUM; i++) {
      space.stars[i] = {
        x: Math.floor(Math.random() * space.canvas.width),
        y: Math.floor(Math.random() * space.canvas.height),
        z: Math.floor(
          Math.random() * Math.max(space.canvas.width, space.canvas.height)
        ),
        speed: STAR_SPEED * Math.random(),
        size: STAR_SIZE,
      };
    }
  },

  update() {
    let canvas = space.canvas;
    let ctx = space.ctx;
    let stars = space.stars;
  
    const FL = Math.min(canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // draw the stars
    ctx.fillStyle = space.colorStars;
    for (let i = 0; i < stars.length; i++) {
      let x = (stars[i].x - centerX) * (FL / stars[i].z) + centerX;
      let y = (stars[i].y - centerY) * (FL / stars[i].z) + centerY;
      let r = stars[i].size * (FL / stars[i].z);
  
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
  
      let now = Date.now();
      const speedGainfactor =
        space.speedUpUntile > now ? (space.speedUpUntile - now) / 50 : 1;
      const STAR_SPEED = space.speedFactor * space.canvas.width;
      stars[i].z -= STAR_SPEED * speedGainfactor + stars[i].speed;
  
      if (stars[i].z <= 0) {
        stars[i].x = Math.floor(Math.random() * canvas.width);
        stars[i].y = Math.floor(Math.random() * canvas.height);
        stars[i].z = Math.max(canvas.width, canvas.height);
      }
    }
  },

  animation() {
    space.AnimationRequestId = undefined;
    space.update();
    space.startAnimation();
  },

  startAnimation() {
    if (!space.AnimationRequestId) {
      space.AnimationRequestId = window.requestAnimationFrame(space.animation);
    }
  },

  stopAnimation() {
    if (space.AnimationRequestId) {
      window.cancelAnimationFrame(space.AnimationRequestId);
      space.AnimationRequestId = undefined;
    }
  },
};
