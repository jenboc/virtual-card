const canvas = new Canvas("animated-background", new Colour(0, 0, 0, 1));
canvas.tick();
setInterval(() => {
    canvas.tick();
}, 500);