/**
 * High-End Water Liquid Cursor Effect
 * Uses a physics-based particle system with surface tension,
 * specular shimmering highlights, and velocity stretching.
 */

export function initLiquidCursor() {
    const canvas = document.getElementById('liquid-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let points = [];
    const maxPoints = 50;
    const mouse = { x: 0, y: 0, lastX: 0, lastY: 0, vx: 0, vy: 0, active: false };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        mouse.vx = e.clientX - mouse.lastX;
        mouse.vy = e.clientY - mouse.lastY;
        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    });

    window.addEventListener('mousedown', (e) => {
        // Splash Effect
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const force = 10 + Math.random() * 20;
            points.push(new WaterPoint(
                e.clientX, 
                e.clientY, 
                Math.cos(angle) * force, 
                Math.sin(angle) * force,
                true // Is splash
            ));
        }
    });

    class WaterPoint {
        constructor(x, y, vx = 0, vy = 0, isSplash = false) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.isSplash = isSplash;
            this.life = 1.0;
            this.decay = isSplash ? 0.02 : 0.015 + Math.random() * 0.015;
            this.baseRadius = isSplash ? 5 + Math.random() * 10 : 20 + Math.random() * 25;
            this.radius = this.baseRadius;
            this.shimmer = Math.random() > 0.7; // Only some particles have specularity
        }

        update() {
            // Apply mouse velocity slightly
            if (!this.isSplash) {
                this.vx += (mouse.x - this.x) * 0.02;
                this.vy += (mouse.y - this.y) * 0.02;
            }

            // Surface Tension: Pull toward mouse/center
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            this.vx += dx * 0.005;
            this.vy += dy * 0.005;

            // Friction/Viscosity
            this.vx *= 0.88;
            this.vy *= 0.88;

            this.x += this.vx;
            this.y += this.vy;

            this.life -= this.decay;
            this.radius = this.baseRadius * this.life;
        }

        draw() {
            if (this.life <= 0) return;

            // Main Liquid Body
            ctx.beginPath();
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            const stretch = 1 + speed * 0.05;
            const angle = Math.atan2(this.vy, this.vx);

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(angle);
            ctx.ellipse(0, 0, this.radius * stretch, this.radius / (stretch * 0.8), 0, 0, Math.PI * 2);
            ctx.fillStyle = '#00d2ff';
            ctx.fill();

            // Specular Highlight (The "Shimmer")
            if (this.shimmer && this.life > 0.4) {
                ctx.beginPath();
                ctx.arc(this.radius * 0.3, -this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.fill();
            }
            ctx.restore();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (mouse.active) {
            // Add continuous trail
            points.push(new WaterPoint(
                mouse.x + (Math.random() - 0.5) * 10, 
                mouse.y + (Math.random() - 0.5) * 10
            ));
        }

        points = points.filter(p => p.life > 0);

        points.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}
