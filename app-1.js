// Canvas elements
const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas.getContext('2d');
const fireworksCanvas = document.getElementById('fireworksCanvas');
const fireworksCtx = fireworksCanvas.getContext('2d');
const petalsCanvas = document.getElementById('petalsCanvas');
const petalsCtx = petalsCanvas.getContext('2d');
const heartsContainer = document.getElementById('heartsContainer');

// Set canvas size
function resizeCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
    petalsCanvas.width = window.innerWidth;
    petalsCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Star class for twinkling stars
class Star {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * starCanvas.width;
        this.y = Math.random() * starCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.maxSize = this.size + Math.random() * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.glowFactor = Math.random() * 15 + 5;
        this.speed = Math.random() * 0.05 + 0.01;
        this.growing = Math.random() > 0.5;
        this.color = {
            r: 255,
            g: Math.floor(Math.random() * 100) + 155,
            b: Math.floor(Math.random() * 155) + 100
        };
    }
    
    update() {
        if (this.growing) {
            this.size += this.speed;
            if (this.size >= this.maxSize) {
                this.growing = false;
            }
        } else {
            this.size -= this.speed;
            if (this.size <= 0.5) {
                this.growing = true;
            }
        }
        
        // Twinkle effect with color change
        if (Math.random() < 0.01) {
            this.color.g = Math.floor(Math.random() * 100) + 155;
            this.color.b = Math.floor(Math.random() * 155) + 100;
        }
        
        // Occasionally reset for more dynamic movement
        if (Math.random() < 0.001) {
            this.reset();
        }
    }
    
    draw() {
        const glow = starCtx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * this.glowFactor
        );
        
        glow.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        starCtx.fillStyle = glow;
        starCtx.beginPath();
        starCtx.arc(this.x, this.y, this.size * this.glowFactor, 0, Math.PI * 2);
        starCtx.fill();
        
        starCtx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        starCtx.beginPath();
        starCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        starCtx.fill();
    }
}

// Petal class for falling rose petals
class Petal {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * petalsCanvas.width;
        this.y = -20;
        this.size = Math.random() * 15 + 8;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.color = {
            r: Math.floor(Math.random() * 55) + 200,
            g: Math.floor(Math.random() * 50),
            b: Math.floor(Math.random() * 80) + 50
        };
    }
    
    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) + this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > petalsCanvas.height) {
            this.reset();
        }
    }
    
    draw() {
        petalsCtx.save();
        petalsCtx.translate(this.x, this.y);
        petalsCtx.rotate(this.rotation * Math.PI / 180);
        
        // Draw petal shape
        petalsCtx.beginPath();
        petalsCtx.moveTo(0, 0);
        petalsCtx.bezierCurveTo(
            this.size / 2, -this.size / 4,
            this.size, -this.size / 2,
            0, -this.size
        );
        petalsCtx.bezierCurveTo(
            -this.size, -this.size / 2,
            -this.size / 2, -this.size / 4,
            0, 0
        );
        
        // Fill with gradient
        const gradient = petalsCtx.createLinearGradient(0, 0, 0, -this.size);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color.r - 30}, ${this.color.g}, ${this.color.b + 20}, ${this.opacity * 0.7})`);
        petalsCtx.fillStyle = gradient;
        petalsCtx.fill();
        
        petalsCtx.restore();
    }
}

// Firework particle class
class FireworkParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 1;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.gravity = 0.04;
        this.friction = 0.97;
        this.opacity = 1;
        this.life = Math.random() * 60 + 80;
        this.remainingLife = this.life;
    }
    
    update() {
        this.velocity.y += this.gravity;
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        this.remainingLife--;
        this.opacity = this.remainingLife / this.life;
    }
    
    draw() {
        fireworksCtx.beginPath();
        fireworksCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        fireworksCtx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        fireworksCtx.fill();
        
        // Add glow effect
        const glow = fireworksCtx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius * 4
        );
        
        glow.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.7})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        fireworksCtx.fillStyle = glow;
        fireworksCtx.beginPath();
        fireworksCtx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        fireworksCtx.fill();
    }
}

// Heart-shaped firework
class HeartFirework {
    constructor() {
        this.x = Math.random() * fireworksCanvas.width;
        this.y = fireworksCanvas.height;
        this.destination = {
            x: Math.random() * (fireworksCanvas.width * 0.8) + fireworksCanvas.width * 0.1,
            y: Math.random() * (fireworksCanvas.height * 0.5) + fireworksCanvas.height * 0.1
        };
        this.velocity = {
            x: (this.destination.x - this.x) / 100,
            y: (this.destination.y - this.y) / 100
        };
        this.particles = [];
        this.color = {
            r: Math.floor(Math.random() * 55) + 200,
            g: Math.floor(Math.random() * 50),
            b: Math.floor(Math.random() * 80) + 50
        };
        this.trail = [];
        this.exploded = false;
    }
    
    update() {
        if (!this.exploded) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            // Add trail
            this.trail.push({
                x: this.x,
                y: this.y,
                opacity: 1
            });
            
            // Update trail
            for (let i = 0; i < this.trail.length; i++) {
                this.trail[i].opacity -= 0.025;
                if (this.trail[i].opacity <= 0) {
                    this.trail.splice(i, 1);
                    i--;
                }
            }
            
            // Check if arrived at destination
            const distance = Math.sqrt(
                Math.pow(this.x - this.destination.x, 2) +
                Math.pow(this.y - this.destination.y, 2)
            );
            
            if (distance < 10 || this.y <= this.destination.y) {
                this.explode();
            }
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                if (this.particles[i].remainingLife <= 0) {
                    this.particles.splice(i, 1);
                    i--;
                }
            }
        }
    }
    
    explode() {
        this.exploded = true;
        
        // Create heart shape
        const heartPoints = [];
        const totalPoints = 150;
        
        for (let i = 0; i < totalPoints; i++) {
            const angle = (i / totalPoints) * Math.PI * 2;
            const heartX = 16 * Math.pow(Math.sin(angle), 3);
            const heartY = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
            
            heartPoints.push({
                x: heartX * 3, // Scale factor
                y: heartY * 3  // Scale factor
            });
        }
        
        // Create particles at heart points
        for (let i = 0; i < heartPoints.length; i++) {
            const particle = new FireworkParticle(this.x, this.y, this.color);
            particle.velocity.x = heartPoints[i].x * (Math.random() * 0.1 + 0.05);
            particle.velocity.y = heartPoints[i].y * (Math.random() * 0.1 + 0.05);
            this.particles.push(particle);
        }
    }
    
    draw() {
        if (!this.exploded) {
            // Draw trail
            for (let i = 0; i < this.trail.length; i++) {
                fireworksCtx.beginPath();
                fireworksCtx.arc(this.trail[i].x, this.trail[i].y, 2, 0, Math.PI * 2);
                fireworksCtx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.trail[i].opacity})`;
                fireworksCtx.fill();
            }
            
            fireworksCtx.beginPath();
            fireworksCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            fireworksCtx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
            fireworksCtx.fill();
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        }
    }
}

// Standard firework class
class Firework {
    constructor() {
        this.x = Math.random() * fireworksCanvas.width;
        this.y = fireworksCanvas.height;
        this.destination = {
            x: Math.random() * fireworksCanvas.width,
            y: Math.random() * (fireworksCanvas.height * 0.6)
        };
        this.velocity = {
            x: (this.destination.x - this.x) / 100,
            y: (this.destination.y - this.y) / 100
        };
        this.particles = [];
        this.color = {
            r: Math.floor(Math.random() * 200) + 55,
            g: Math.floor(Math.random() * 200) + 55,
            b: Math.floor(Math.random() * 255)
        };
        this.trail = [];
        this.exploded = false;
    }
    
    update() {
        if (!this.exploded) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            // Add trail
            this.trail.push({
                x: this.x,
                y: this.y,
                opacity: 1
            });
            
            // Update trail
            for (let i = 0; i < this.trail.length; i++) {
                this.trail[i].opacity -= 0.025;
                if (this.trail[i].opacity <= 0) {
                    this.trail.splice(i, 1);
                    i--;
                }
            }
            
            // Check if arrived at destination
            const distance = Math.sqrt(
                Math.pow(this.x - this.destination.x, 2) +
                Math.pow(this.y - this.destination.y, 2)
            );
            
            if (distance < 10 || this.y <= this.destination.y) {
                this.explode();
            }
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                if (this.particles[i].remainingLife <= 0) {
                    this.particles.splice(i, 1);
                    i--;
                }
            }
        }
    }
    
    explode() {
        this.exploded = true;
        const particleCount = Math.floor(Math.random() * 50) + 80;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new FireworkParticle(this.x, this.y, this.color));
        }
    }
    
    draw() {
        if (!this.exploded) {
            // Draw trail
            for (let i = 0; i < this.trail.length; i++) {
                fireworksCtx.beginPath();
                fireworksCtx.arc(this.trail[i].x, this.trail[i].y, 2, 0, Math.PI * 2);
                fireworksCtx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.trail[i].opacity})`;
                fireworksCtx.fill();
            }
            
            fireworksCtx.beginPath();
            fireworksCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            fireworksCtx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
            fireworksCtx.fill();
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        }
    }
}

// Create stars
const stars = [];
for (let i = 0; i < 200; i++) {
    stars.push(new Star());
}

// Create petals
const petals = [];
for (let i = 0; i < 50; i++) {
    petals.push(new Petal());
}

// Create fireworks and heart effects
const fireworks = [];
let fireworksInterval;
let heartFireworksInterval;

function addFirework() {
    if (Math.random() < 0.3) {
        fireworks.push(new HeartFirework());
    } else {
        fireworks.push(new Firework());
    }
}

function addFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${Math.random() * 90 + 5}%`;
    heart.style.top = `${Math.random() * 90 + 5}%`;
    heart.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                  fill="rgba(255, ${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 0.4 + 0.6})"/>
        </svg>
    `;
    heartsContainer.appendChild(heart);
    
    // Animate heart
    gsap.to(heart, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
        onComplete: () => {
            gsap.to(heart, {
                y: -100 - Math.random() * 100,
                x: (Math.random() - 0.5) * 100,
                opacity: 0,
                rotation: Math.random() * 60 - 30,
                scale: 0.5,
                duration: 4 + Math.random() * 4,
                ease: "power1.out",
                onComplete: () => {
                    heart.remove();
                }
            });
        }
    });
}

// Animate stars
function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    requestAnimationFrame(animateStars);
}

// Animate petals
function animatePetals() {
    petalsCtx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);
    
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    
    requestAnimationFrame(animatePetals);
}

// Animate fireworks
function animateFireworks() {
    fireworksCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    fireworksCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
    for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].update();
        fireworks[i].draw();
        
        if (fireworks[i].exploded && fireworks[i].particles.length === 0) {
            fireworks.splice(i, 1);
            i--;
        }
    }
    
    requestAnimationFrame(animateFireworks);
}

// Start fireworks animation
function startFireworks() {
    // Regular fireworks
    fireworksInterval = setInterval(addFirework, 500);
    setTimeout(() => {
        clearInterval(fireworksInterval);
    }, 5000);
    
    // Heart fireworks
    heartFireworksInterval = setInterval(addFloatingHeart, 300);
    setTimeout(() => {
        clearInterval(heartFireworksInterval);
    }, 4000);
}

// Initialize the page
window.addEventListener('load', () => {
    // Start animations
    animateStars();
    animatePetals();
    animateFireworks();
    startFireworks();
    
    // Split text for animation
    const birthdayText = document.querySelector('.birthday-text');
    const text = birthdayText.textContent;
    birthdayText.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const letter = document.createElement('span');
        letter.textContent = text[i];
        letter.className = 'letter';
        birthdayText.appendChild(letter);
    }
    
    // Start text animation after 3 seconds
    setTimeout(() => {
        birthdayText.style.opacity = 1;
        
        // Animate each letter
        const letters = document.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            gsap.to(letter, {
                opacity: 1,
                y: 0,
                delay: 3 + index * 0.1,
                duration: 0.6,
                ease: "back.out(1.7)"
            });
        });
        
        // Animate the whole text with glow
        gsap.to(birthdayText, {
            textShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 123, 172, 0.4)",
            delay: 3 + text.length * 0.1 + 0.3,
            duration: 1.5
        });
        
        // Animate button appearance
        const celebrateBtn = document.getElementById('celebrateBtn');
        gsap.to(celebrateBtn, {
            opacity: 1,
            scale: 1,
            delay: 3 + text.length * 0.1 + 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        });
        
        // Add button effects
        let hoverEffect = 0;
        celebrateBtn.addEventListener('mouseenter', () => {
            hoverEffect = (hoverEffect + 1) % 3;
            
            switch(hoverEffect) {
                case 0: // Glow effect
                    gsap.to(celebrateBtn, {
                        boxShadow: "0 7px 25px rgba(255, 123, 172, 0.8), 0 0 40px rgba(255, 123, 172, 0.6)",
                        duration: 0.4
                    });
                    break;
                case 1: // Bounce effect
                    gsap.to(celebrateBtn, {
                        y: -10,
                        duration: 0.4,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.inOut"
                    });
                    break;
                case 2: // Scale-up effect
                    gsap.to(celebrateBtn, {
                        scale: 1.1,
                        duration: 0.4,
                        ease: "power1.out"
                    });
                    break;
            }
        });
        

        
        celebrateBtn.addEventListener('mouseleave', () => {
            gsap.to(celebrateBtn, {
                boxShadow: "0 5px 15px rgba(255, 123, 172, 0.4), 0 0 20px rgba(255, 123, 172, 0.2)",
                y: 0,
                scale: 1,
                duration: 0.4
            });
        });

        const nextPageBtn = document.getElementById('nextPageBtn');
nextPageBtn.addEventListener('click', () => {
window.location.href = 'index-2.html'; // Change this URL to the actual next page
});

gsap.to(nextPageBtn, {
opacity: 1,
delay: 3 + text.length * 0.1 + 1.5,
duration: 0.8,
ease: "elastic.out(1, 0.3)"
});
        
        celebrateBtn.addEventListener('click', () => {
            // Add click effect
            gsap.to(celebrateBtn, {
                scale: 0.95,
                duration: 0.1,
                onComplete: () => {
                    // Navigate to next page (you can change this URL)
                    
                    
                    // For demo purposes, restart animations
                    startFireworks();
                    gsap.to(celebrateBtn, {
                        scale: 1,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                }
            });
        });
    }, 3000);
});