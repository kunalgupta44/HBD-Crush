const cake = document.querySelector('.cake-container');
        const candle = document.querySelector('.candle');
        const flame = document.querySelector('.flame');
        let isClicked = false;

        const ribbonColors = [
            'linear-gradient(45deg, #FF9ECD, #FF71B6)',
            'linear-gradient(45deg, #FFB7E0, #FF8AC7)',
            'linear-gradient(45deg, #FFC4E6, #FFA3D4)',
            'linear-gradient(45deg, #E0C3FC, #BDE0FE)',
            'linear-gradient(45deg, #FFCAD4, #FFD1E3)',
            'linear-gradient(45deg, #B5EAD7, #C7F9CC)',
            'linear-gradient(45deg, #FF9AA2, #FFB7B2)',
            'linear-gradient(45deg, #FFDAC1, #FFE5D9)'
        ];

        function createRibbon() {
            const ribbon = document.createElement('div');
            ribbon.className = 'ribbon';
            ribbon.style.left = `${Math.random() * window.innerWidth}px`;
            ribbon.style.background = ribbonColors[Math.floor(Math.random() * ribbonColors.length)];
            document.body.appendChild(ribbon);

            ribbon.addEventListener('animationend', () => {
                ribbon.remove();
            });
        }

        function startCelebration() {
            if (isClicked) return;
            isClicked = true;

            // Fade out candle smoothly
            gsap.to(candle, {
                opacity: 0,
                y: -20,
                duration: 1,
                ease: "power2.out",
                onComplete: () => candle.remove()
            });

            // Start ribbon rain
            const ribbonInterval = setInterval(() => {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => createRibbon(), i * 100);
                }
            }, 200);

            // Show next page button after 2 seconds
            setTimeout(() => {
                const nextButton = document.querySelector('.next-page-button');
                nextButton.classList.add('show');
            }, 2000);

            // Stop ribbon rain after 5 seconds
            setTimeout(() => {
                clearInterval(ribbonInterval);
            }, 5000);
        }

        // Add button click handler
        document.querySelector('.next-page-button').addEventListener('click', () => {
            // You can replace this with your actual next page URL
            window.location.href = 'index-3.html';
        });

        cake.addEventListener('click', startCelebration);