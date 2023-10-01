// PUTTING TOGETHER THE GRAPHICS AND THE FIREWORKS TO MAKE THE BACKGROUND

const GRAVITY = 0.25;

const canvas = new Canvas("animated-background", new Colour(0, 0, 0, 1));
const fireworkSpawner = new FireworkLauncher(canvas, 1, 10, 90, GRAVITY, 10, 20, 10, 50, 10, 20);
canvas.addSpawner(fireworkSpawner);

canvas.updateDimensions();

// const firework = new Firework(canvas, new Vec2(canvas.getWidth() / 2, canvas.getHeight()), new Vec2(0, -50), GRAVITY, 10, 50);
// canvas.addSprite(firework);

canvas.tick();
setInterval(() => {
    canvas.tick();
}, 10);