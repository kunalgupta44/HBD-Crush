// Create decorative elements
function createDecorations() {
    const decorationsContainer = document.getElementById('decorations');

    // Create floating bubbles
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // Random properties
        const size = Math.random() * 60 + 20;
        const posX = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 10;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;

        decorationsContainer.appendChild(bubble);
    }
}

// Initialize elements
document.addEventListener('DOMContentLoaded', () => {
    createDecorations();

    const messageContainer = document.getElementById('messageContainer');
    const initialMessage = document.getElementById('initialMessage');
    const secondMessage = document.getElementById('secondMessage');
    const enterButton = document.getElementById('enterButton');
    const gifContainer = document.getElementById('gifContainer');

    // Click handler for container
    messageContainer.addEventListener('click', () => {
        // Transition messages with GSAP
        gsap.to(initialMessage, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                initialMessage.classList.add('hidden');
                secondMessage.classList.remove('hidden');
                gsap.fromTo(secondMessage,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );

                // Show the enter button
                gsap.to(enterButton, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.3
                });

                // Show the GIF container
                gsap.to(gifContainer, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.5
                });
            }
        });

        // Create hearts animation
        createHearts();
    });

    // Heartbeat animation for button
    enterButton.addEventListener('mouseenter', () => {
        gsap.to(enterButton, {
            scale: 1.05,
            duration: 0.3,
            repeat: 1,
            yoyo: true
        });
    });

    // Create hearts effect
    function createHearts() {
        const emojis = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝'];

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                heart.innerHTML = randomEmoji;
                heart.classList.add('heart');
                heart.style.fontSize = `${Math.random() * 20 + 10}px`;

                // Position around the container
                const containerRect = messageContainer.getBoundingClientRect();
                const startX = containerRect.x + Math.random() * containerRect.width;
                const startY = containerRect.y + containerRect.height;

                heart.style.left = `${startX}px`;
                heart.style.top = `${startY}px`;

                document.body.appendChild(heart);

                // Animate the heart
                gsap.to(heart, {
                    y: -150 - Math.random() * 100,
                    x: (Math.random() - 0.5) * 100,
                    opacity: 0,
                    rotation: Math.random() * 90 - 45,
                    duration: 2 + Math.random() * 3,
                    ease: "power1.out",
                    onComplete: () => {
                        heart.remove();
                    }
                });

                gsap.to(heart, {
                    scale: 0.5,
                    duration: 2,
                    ease: "power1.in"
                });
            }, i * 100);
        }
    }

    // Enter button click effect
    enterButton.addEventListener('click', () => {
        // You can redirect to the main birthday page here
        window.location.href = "index-1.html";

        // For demonstration, we'll just add a celebratory effect
        gsap.to(document.body, {
            backgroundColor: "#ffd6e0",
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });

        // Zoom effect on GIF
        gsap.to(gifContainer, {
            scale: 1.1,
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });

        createHearts();
    });

    // Initialize with hidden elements
    gsap.set(enterButton, { opacity: 0, y: 20 });
    gsap.set(gifContainer, { opacity: 0, y: 20 });
});