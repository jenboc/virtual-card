// BASIC GRAPHICS CODE 

const lerp = (a, b, t) => a + t * (b - a);

class Colour 
{
    constructor(r, g, b, a) 
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toString() 
    {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    static lerp(a, b, t) 
    {
        return Colour(lerp(a.r, b.r, t), lerp(a.g, b.g, t), lerp(a.b, b.b, t), lerp(a.a, b.a, t));
    }
}

class Vec2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    static add(a, b)
    {
        return new Vec2(a.x + b.x, a.y + b.y);
    }

    static subtract(a, b) 
    {
        return new Vec2(a.x - b.x, a.y - b.y);
    }

    static multiplyScalar(a, b)
    {
        if (typeof(a) == "number")
        {
            return new Vec2(b.x * a, b.y * a);
        }
        else 
        {
            return new Vec2(a.x * b, a.y * b);
        }
    }

    static lerp(a, b, t) 
    {
        return Vec2(lerp(a.x, b.x, t), lerp(a.y, b.y, t));
    }

    static zero() 
    {
        return new Vec2(0, 0);
    }
}

class Canvas 
{
    #dom;
    #ctx;
    #backgroundColour;
    #sprites; 

    constructor(canvasId, backgroundColour) 
    {
        this.#dom = document.getElementById(canvasId);
        this.#ctx = this.#dom.getContext("2d");
        this.#backgroundColour = backgroundColour;
        this.#sprites = []
    }

    updateDimensions() 
    {
        this.#dom.width = document.body.clientWidth;
        this.#dom.height = document.body.clientHeight;
    }

    update() 
    {
        const toDelete = [];

        for (let i = 0; i < this.#sprites.length; i++)
        {
            const sprite = this.#sprites[i];
            sprite.update();
            
            if (sprite.delete)
                toDelete.push(i);
        }

        toDelete.forEach(index => this.#sprites.splice(index, 1));
    }

    draw() 
    {
        this.#sprites.forEach(sprite => sprite.draw(this.#ctx));
    }

    clear() 
    {
        this.#ctx.fillStyle = this.#backgroundColour.toString();
        this.#ctx.fillRect(0, 0, this.#dom.width, this.#dom.height)
    }

    tick() 
    {
        this.updateDimensions();
        this.clear();
        this.update();
        this.draw();
    }
}

class Sprite
{
    _position;
    _velocity; 
    _acceleration; 

    constructor(position, velocity, acceleration)
    {
        this._position = position;
        this._velocity = velocity;
        this._acceleration = acceleration;
        this.delete = false;
    }

    update() 
    {
        this._velocity = Vec2.add(this._velocity, this._acceleration);
        this._position = Vec2.add(this._position, this._velocity); 
    }

    draw(ctx) 
    {
        throw new Error("draw() is not implemented");
    }
}

class ParticleSettings
{
    constructor(startColour, endColour, startRadius, endRadius, startVelocity, endVelocity, lifetime)
    {
        this.startColour = startColour;
        this.endColour = endColour;
        this.startRadius = startRadius;
        this.endRadius = endRadius;
        this.startVelocity = startVelocity;
        this.endVelocity = endVelocity;
        this.lifetime = lifetime;
    }

    getColour(timeAlive) 
    {
        const t = timeAlive / this.lifetime;
        return Colour.lerp(this.startColour, this.endColour, t);
    }

    getRadius(timeAlive) 
    {
        const t = timeAlive / this.lifetime;
        return lerp(this.startRadius, this.endRadius, t);
    }

    getVelocity(timeAlive) 
    {
        const t = timeAlive / this.lifetime;
        return Vec2.lerp(this.startVelocity, this.endVelocity, t);
    }

    isAlive(timeAlive) 
    {
        return timeAlive >= this.lifetime;
    }
}

class Particle extends Sprite 
{
    #settings;
    #timeAlive;

    constructor(position, settings) 
    {
        super(position, Vec2.zero(), Vec2.zero());
        this.#settings = settings;
        this.#timeAlive;
    }

    update() 
    {
        this.#timeAlive++;
        this._velocity = this.#settings.getVelocity(this.#timeAlive);

        this.delete = this.#settings.isAlive(this.#timeAlive);
    }

    draw(ctx) 
    {
        ctx.fillStyle = this.#settings.getColour(this.#timeAlive).toString(); 
        ctx.beginPath(); 
        ctx.arc(this._position.x, this._position.y, this.#settings.getRadius(this.#timeAlive), 0, 2 * Math.PI);
        ctx.fill();
    }
}