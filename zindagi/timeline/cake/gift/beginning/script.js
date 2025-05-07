// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Slideshow
    initSlideshow();
    
    // Initialize Audio Controls
    initAudio();
    
    // Initialize Countdown Modal
    initCountdownModal();
    
    // Initialize Floating Elements
    initFloatingElements();
});

// Slideshow Functionality
function initSlideshow() {
    const slideshowWrapper = document.querySelector('.slideshow-wrapper');
    // Fixed path - removed duplication
    const slidesRoot = "images/";
    const totalImages = 38;
    const captions = [
        "Sona", "Chanda", "Heera", "Mothi", "Nek",
        "Baccha", "Baby", "Jaana", "Ummah", "Sunna",
        "Shona", "Sunnu", "Pari", "Shaitaan", "Beta",
        "Buddhu", "Jaan", "Cutiepie", "Lifeline", "Betu",
        "Apsara", "Tota", "My Smile", "Angel", "Babu",
        "Queen", "Jiii", "Sweety", "Sabkuch", "Munchkin",
        "Doll", "Gudiya", "Laddoo", "Zindagi", "Benstokes",
        "koti", "Twinkle", "Cupcake"
    ];
    
    
    // Create additional slides
    for (let i = 2; i <= totalImages; i++) {
        const slide = document.createElement('div');
        slide.className = 'slide';
        // Updated to match the correct file name format with space: "1 (2).jpeg", "1 (3).jpeg", etc.
        slide.style.backgroundImage = `url("${slidesRoot}1 (${i}).jpeg")`;
        
        const caption = document.createElement('div');
        caption.className = 'slide-caption';
        caption.textContent = captions[(i-1) % captions.length]; // Loop through captions if needed
        
        slide.appendChild(caption);
        slideshowWrapper.appendChild(slide);
    }
    
    // Set background image for the first slide - fixed path format
    const firstSlide = document.querySelector('.slide.active');
    firstSlide.style.backgroundImage = `url("${slidesRoot}1 (1).jpeg")`;
    
    // Start slideshow rotation
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    
    function rotateSlides() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 4 seconds
    setInterval(rotateSlides, 1500);
}

// Audio Controls Functionality
function initAudio() {
    const audio = document.getElementById('background-audio');
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    let isPlaying = false;

    // Enable autoplay if user interacted before
    document.addEventListener('click', function handleFirstClick() {
        audio.play().then(() => {
            isPlaying = true;
            audioIcon.classList.remove('fa-volume-mute');
            audioIcon.classList.add('fa-volume-up');
        }).catch(error => {
            console.log("Audio play prevented:", error);
        });

        document.removeEventListener('click', handleFirstClick);
    }, { once: true });

    // Toggle on click
    audioToggle.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            audioIcon.classList.remove('fa-volume-mute');
            audioIcon.classList.add('fa-volume-up');
            isPlaying = true;
        } else {
            audio.pause();
            audioIcon.classList.remove('fa-volume-up');
            audioIcon.classList.add('fa-volume-mute');
            isPlaying = false;
        }
    });
}

// Countdown Modal Functionality
function initCountdownModal() {
    const modal = document.getElementById('countdown-modal');
    const btn = document.getElementById('countdown-btn');
    const closeBtn = document.getElementById('close-modal');
    
    // Open modal on button click
    btn.addEventListener('click', function() {
        modal.style.display = 'block';
        
        // Add the active class after a short delay to trigger animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Start the countdown
        updateCountdown();
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        
        // Hide modal after animation completes
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
            
            // Hide modal after animation completes
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        }
    });
    
    // Update countdown timer
    function updateCountdown() {
        const countdownDate = new Date("May 9, 2026 00:00:00").getTime();
        
        // Update the countdown every second
        const countdownTimer = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update the HTML elements
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
            
            // If the countdown is over
            if (distance < 0) {
                clearInterval(countdownTimer);
                document.getElementById('countdown-timer').innerHTML = "<div class='countdown-expired'>Today is the day!</div>";
            }
        }, 1000);
    }
}

// Initialize Floating Elements
function initFloatingElements() {
    // Additional stars and hearts for a more magical effect
    const floatingElements = document.querySelectorAll('.floating-elements');
    
    floatingElements.forEach(container => {
        // Add more floating elements dynamically
        for (let i = 0; i < 10; i++) {
            const elem = document.createElement('i');
            // Randomly select an icon type
            const icons = ['fa-star', 'fa-heart', 'fa-moon', 'fa-sparkles'];
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            
            elem.className = `fas ${randomIcon}`;
            elem.style.left = `${Math.random() * 100}%`;
            elem.style.top = `${Math.random() * 100}%`;
            elem.style.fontSize = `${Math.random() * 20 + 10}px`; // Size between 10px and 30px
            elem.style.animationDuration = `${Math.random() * 20 + 15}s`; // Duration between 15s and 35s
            elem.style.animationDelay = `${Math.random() * 5}s`; // Delay between 0s and 5s
            elem.style.opacity = `${Math.random() * 0.5 + 0.1}`; // Opacity between 0.1 and 0.6
            
            container.appendChild(elem);
        }
    });
    
    // Initialize particles.js for background effect if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.2,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    out_mode: "out"
                }
            }
        });
    }
}

// Content animation on scroll
window.addEventListener('scroll', function() {
    const contentTexts = document.querySelectorAll('.content-text');
    
    contentTexts.forEach((text, index) => {
        // Only animate if not already animated
        if (!text.classList.contains('animated')) {
            const textPosition = text.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (textPosition < screenPosition) {
                text.style.animationDelay = `${index * 0.2}s`;
                text.classList.add('animated');
            }
        }
    });
});

// Add a preloader to ensure all images load before displaying content
window.addEventListener('load', function() {
    // Preload all slideshow images
    // Fixed path - removed duplication
    const slidesRoot = "images/";
    const totalImages = 38;
    let loadedImages = 0;
    
    for (let i = 1; i <= totalImages; i++) {
        const img = new Image();
        // Path with space between 1 and parenthesis
        img.src = `${slidesRoot}1 (${i}).jpeg`;
        img.onload = function() {
            loadedImages++;
            updatePreloader(loadedImages, totalImages);
            if (loadedImages === totalImages) {
                // All images loaded, add an initial animation to the site
                document.body.classList.add('loaded');
            }
        };
        img.onerror = function() {
            loadedImages++;
            console.warn(`Failed to load image: ${slidesRoot}1 (${i}).jpeg`);
            updatePreloader(loadedImages, totalImages);
            if (loadedImages === totalImages) {
                // Continue even if some images failed to load
                document.body.classList.add('loaded');
            }
        };
    }
    
    // Add a visual preloader update function
    function updatePreloader(loaded, total) {
        // If you have a preloader element with progress indicator
        const preloaderProgress = document.getElementById('preloader-progress');
        if (preloaderProgress) {
            const percentage = Math.floor((loaded / total) * 100);
            preloaderProgress.textContent = `${percentage}%`;
            preloaderProgress.style.width = `${percentage}%`;
        }
    }
});