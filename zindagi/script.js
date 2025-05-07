document.addEventListener('DOMContentLoaded', function() {
    // Constants and Variables
    const COLORS = [
        '#fd79a8', // Pink
        '#a29bfe', // Purple
        '#74b9ff', // Blue
        '#ff9ff3', // Light Pink
        '#ffeaa7'  // Yellow
    ];

    // DOM Elements
    const loadingScreen = document.getElementById('loading-screen');
    const countdownNumber = document.getElementById('countdown-number');
    const mainContainer = document.querySelector('.main-container');
    const heroContent = document.querySelector('.hero-content');
    const header = document.getElementById('header');
    const titleText = document.querySelector('.title-text');
    const subtitleText = document.querySelector('.subtitle-text');
    const nameContainer = document.querySelector('.name-container');
    const messageContainer = document.querySelector('.message-container');
    const ctaButton = document.getElementById('enter-button');
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');
    const backgroundMusic = document.getElementById('background-music');
    const modal = document.getElementById('birthday-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.getElementById('close-modal');
    const particlesContainer = document.getElementById('particles-container');
    const ageBox = document.querySelector('.age-box');
    const dateAnimation = document.querySelector('.date-animation');

    
    // Audio State
    let isMuted = false;
    let timeLeft = 1; // Set countdown time to 5 seconds
    
    // Track if animations have started
    let animationsStarted = false;

    // Initialize the page
    init();

    function init() {
        let timeLeft = 9;
        const countdownNumber = document.getElementById('countdown-number');
        const loadingScreen = document.getElementById('loading-screen');
        let animationsStarted = false;
    
        const countdown = setInterval(function () {
            timeLeft--;
            countdownNumber.textContent = timeLeft;
    
            countdownNumber.style.animation = 'none';
            setTimeout(function () {
                countdownNumber.style.animation = 'pulse-light 1s infinite';
            }, 10);
    
            if (timeLeft <= 0) {
                clearInterval(countdown);
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.8s ease';
    
                setTimeout(function () {
                    loadingScreen.style.visibility = 'hidden';
                    loadingScreen.style.display = 'none';
    
                    if (!animationsStarted) {
                        startAnimations();
                        animationsStarted = true;
                        addAmbientElements();
                    }
                }, 800);
            }
        }, 1000); // Use 1000ms = 1 second interval
    
        setupEventListeners();
        playBackgroundMusic();
    }
    

    // Function to play background music
    function playBackgroundMusic() {
        audioIcon.className = 'fas fa-volume-up';

        const playPromise = backgroundMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMuted = false;
                console.log("Music playing automatically");
            }).catch(error => {
                console.log("Autoplay prevented:", error);

                audioControl.style.animation = 'pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite';
                audioIcon.className = 'fas fa-volume-mute';
                isMuted = true;

                document.addEventListener('click', function playOnFirstClick() {
                    backgroundMusic.play().then(() => {
                        isMuted = false;
                        audioIcon.className = 'fas fa-volume-up';
                        audioControl.style.animation = '';
                    });
                    document.removeEventListener('click', playOnFirstClick);
                }, { once: true });
            });
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        audioControl.addEventListener('click', toggleAudio);
        ctaButton.addEventListener('click', openModal);
        closeModal.addEventListener('click', closeModalFunction);
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunction();
            }
        });
        
    }
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM fully loaded - Starting debug');
        
        // Try multiple methods to find the timeline button
        const timelineButtonById = document.getElementById('timeline-button');
        const timelineButtonByClass = document.querySelector('.timeline-button');
        const allButtons = document.querySelectorAll('button');
        
        console.log('Button by ID:', timelineButtonById);
        console.log('Button by class:', timelineButtonByClass);
        console.log('All buttons found:', allButtons.length);
        
        // Log all buttons for debugging
        allButtons.forEach((btn, index) => {
            console.log(`Button ${index}:`, btn.outerHTML);
        });
        
        // Try to attach event listener using multiple methods
        function attachTimelineEvent(button) {
            if (!button) return false;
            
            console.log('Attaching event to button:', button);
            
            // Use both click and mousedown events for redundancy
            button.addEventListener('click', handleTimelineClick);
            button.addEventListener('mousedown', handleTimelineClick);
            
            // Make button more noticeable (for debugging)
            button.style.border = '3px solid red';
            button.style.position = 'relative';
            button.style.zIndex = '9999';
            
            return true;
        }
        
        function handleTimelineClick(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('TIMELINE BUTTON CLICKED!', e.target);
            
            alert('Timeline button clicked! Redirecting to timeline.html...');
            
            // Navigate to timeline page
            try {
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.8s ease';
                
                setTimeout(() => {
                    window.location.href = 'timeline.html';
                }, 800);
            } catch (err) {
                console.error('Navigation error:', err);
                // Direct fallback if transition fails
                window.location.href = 'timeline.html';
            }
        }
        
        // Try attaching by ID first
        let success = attachTimelineEvent(timelineButtonById);
        
        // If that didn't work, try by class
        if (!success) {
            success = attachTimelineEvent(timelineButtonByClass);
        }
        
        // If still no success, try brute force approach: attach to any button containing "timeline" or "memories"
        if (!success) {
            console.log('Trying brute force button finding...');
            allButtons.forEach(btn => {
                const btnText = btn.textContent.toLowerCase();
                if (btnText.includes('timeline') || btnText.includes('memories') || btnText.includes('clock')) {
                    console.log('Found potential timeline button by text:', btn);
                    attachTimelineEvent(btn);
                }
            });
        }
        
        // Add a global click handler as absolute fallback
        document.addEventListener('click', function(e) {
            const target = e.target;
            
            // Check if click is on or within a button that seems timeline-related
            if (target.tagName === 'BUTTON' || target.closest('button')) {
                const clickedButton = target.tagName === 'BUTTON' ? target : target.closest('button');
                const buttonText = clickedButton.textContent.toLowerCase();
                
                if (buttonText.includes('timeline') || buttonText.includes('memories') || 
                    buttonText.includes('clock') || clickedButton.id === 'timeline-button' ||
                    clickedButton.classList.contains('timeline-button')) {
                    
                    console.log('Timeline button found via global click handler:', clickedButton);
                    handleTimelineClick(e);
                }
            }
        });
        
        // Dynamic CSS to make timeline button more prominent
        const style = document.createElement('style');
        style.textContent = `
            .timeline-button, #timeline-button {
                cursor: pointer !important;
                position: relative !important;
                z-index: 9999 !important;
                transition: transform 0.3s ease, box-shadow 0.3s ease !important;
            }
            
            .timeline-button:hover, #timeline-button:hover {
                transform: scale(1.05) !important;
                box-shadow: 0 0 15px rgba(255, 105, 180, 0.7) !important;
            }
        `;
        document.head.appendChild(style);
        
        // Add a visible backup button (in case the original is hidden by CSS)
        setTimeout(() => {
            if (!success) {
                console.log('Adding backup timeline button');
                const backupButton = document.createElement('button');
                backupButton.textContent = '🕒 Go To Timeline';
                backupButton.style.position = 'fixed';
                backupButton.style.bottom = '20px';
                backupButton.style.right = '20px';
                backupButton.style.zIndex = '10000';
                backupButton.style.padding = '10px 20px';
                backupButton.style.backgroundColor = '#fd79a8';
                backupButton.style.color = 'white';
                backupButton.style.border = 'none';
                backupButton.style.borderRadius = '5px';
                backupButton.style.fontWeight = 'bold';
                backupButton.style.cursor = 'pointer';
                backupButton.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
                
                backupButton.addEventListener('click', handleTimelineClick);
                document.body.appendChild(backupButton);
            }
        }, 2000);
    });
    

    // Start animations for main content with smooth easing
    function startAnimations() {
        // Reset initial states
        [heroContent, titleText, subtitleText, nameContainer, dateAnimation, ageBox, ctaButton, header, audioControl].forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = el === nameContainer || el === audioControl ? 'scale(0.8)' : 'translateY(20px)';
                el.style.transition = 'opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)';
            }
        });
        
        // Apply smooth sequential animations
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            titleText.style.opacity = '1';
            titleText.style.transform = 'translateY(0)';
        }, 400);

        setTimeout(() => {
            subtitleText.style.opacity = '1';
            subtitleText.style.transform = 'translateY(0)';
        }, 600);

        setTimeout(() => {
            nameContainer.style.opacity = '1';
            nameContainer.style.transform = 'scale(1)';
        }, 800);

        setTimeout(() => {
            if (dateAnimation) {
                dateAnimation.style.opacity = '1';
                dateAnimation.style.transform = 'translateY(0)';
            }
        }, 1000);

        setTimeout(() => {
            if (ageBox) {
                ageBox.style.opacity = '1';
                ageBox.style.transform = 'translateY(0)';
            }
        }, 1200);

        setTimeout(() => {
            ctaButton.style.opacity = '1';
            ctaButton.style.transform = 'translateY(0)';
        }, 1400);

        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 1600);

        setTimeout(() => {
            audioControl.style.opacity = '1';
            audioControl.style.transform = 'scale(1)';
        }, 1800);
    }

    // Toggle audio with smooth animation
    function toggleAudio() {
        if (isMuted) {
            backgroundMusic.play();
            audioIcon.className = 'fas fa-volume-up';
        } else {
            backgroundMusic.pause();
            audioIcon.className = 'fas fa-volume-mute';
        }
        isMuted = !isMuted;

        // Smooth button press effect
        audioControl.style.transform = 'scale(0.9)';
        audioControl.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => {
            audioControl.style.transform = 'scale(1)';
        }, 200);
    }

    // Open modal with smooth animation
    function openModal() {
        modal.style.display = 'block';
        void modal.offsetWidth; // Force reflow
        
        modal.style.opacity = '1';
        modal.style.transition = 'opacity 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)';
        
        modalContent.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
        modalContent.style.transition = 'opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        createCelebrationEffect();
    }

    // Close modal with smooth animation
    function closeModalFunction() {
        modal.style.opacity = '0';
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    }
  

    // Add ambient floating elements - minimal but elegant
    function addAmbientElements() {
        // Initial set of ambient elements
        createAmbientElements(30);
        
        // Continue adding elements at intervals
        setInterval(() => {
            createAmbientElements(10);
        }, 3000);
    }
    
    // Create minimal but elegant ambient elements
    function createAmbientElements(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                // Choose element type based on probability 
                const rand = Math.random();
                if (rand < 0.7) {
                    // Create subtle glowing particles (most common)
                    createGlowParticle();
                } else if (rand < 0.9) {
                    // Create minimal stars (less common)
                    createMinimalStar();
                } else {
                    // Create minimal hearts (rare)
                    createMinimalHeart();
                }
            }, i * 200);
        }
    }
    
    // Create subtle glowing particle
    function createGlowParticle() {
        const particle = document.createElement('div');
        particle.className = 'glow-particle';
        
        // Small size for subtlety
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size*4}px`;
        particle.style.height = `${size*4}px`;
        particle.style.borderRadius = '50%';
        
        // Soft color
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const opacity = Math.random() * 0.5 + 0.2; // Subtle opacity
        
        particle.style.backgroundColor = color;
        particle.style.opacity = opacity.toString();
        particle.style.boxShadow = `0 0 ${size * 4}px ${color}`;
        
        setupFloatingElement(particle);
    }
    
    // Create minimal star
    function createMinimalStar() {
        const particle = document.createElement('div');
        particle.className = 'star-particle';
        
        // Choose between minimal star icon or unicode star
        if (Math.random() > 0.5) {
            particle.innerHTML = '✧'; // Unicode minimal star
        } else {
            particle.innerHTML = '✦'; // Alternative unicode star
        }
        
        const size = Math.random() * 18 + 6;
        particle.style.fontSize = `${size*6}px`;
        
        // Soft color with slight glow
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const opacity = Math.random() * 0.7 + 0.3;
        
        particle.style.color = color;
        particle.style.opacity = opacity.toString();
        particle.style.textShadow = `0 0 ${size}px ${color}`;
        
        setupFloatingElement(particle);
    }
    
    // Create minimal heart
    function createMinimalHeart() {
        const particle = document.createElement('div');
        particle.className = 'heart-particle';
        
        // Simple heart character
        particle.innerHTML = '♡'; // Unicode outline heart
        
        const size = Math.random() * 28 + 6;
        particle.style.fontSize = `${size*8}px`;
        
        // Soft pink/red color
        const heartColors = ['#fd79a8', '#e84393', '#ff9ff3', '#ff6b6b'];
        const color = heartColors[Math.floor(Math.random() * heartColors.length)];
        const opacity = Math.random() * 0.7 + 0.3;
        
        particle.style.color = color;
        particle.style.opacity = opacity.toString();
        particle.style.textShadow = `0 0 ${size/2}px ${color}`;
        
        setupFloatingElement(particle);
    }
    
    // Setup floating element with smooth animation
    function setupFloatingElement(element) {
        // Position randomly on screen
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        element.style.position = 'absolute';
        element.style.left = `${posX}px`;
        element.style.top = `${posY}px`;
        element.style.zIndex = '1';
        
        // Create smooth animation
        const duration = Math.random() * 15 + 20; // Longer duration for smoother movement
        const delay = Math.random() * 2;
        
        // Create unique animation for this element
        const animationName = `float-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        // Small random movements for more natural float
        const xMove1 = Math.random() * 30 - 15;
        const yMove1 = -Math.random() * 30 - 10;
        const xMove2 = Math.random() * 30 - 15;
        const yMove2 = -Math.random() * 60 - 20;
        
        const keyframes = `
            @keyframes ${animationName} {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: ${element.style.opacity};
                }
                33% {
                    transform: translate(${xMove1}px, ${yMove1}px) rotate(${Math.random() * 20}deg);
                    opacity: ${Math.min(parseFloat(element.style.opacity) + 0.1, 1)};
                }
                66% {
                    transform: translate(${xMove2}px, ${yMove2}px) rotate(${Math.random() * 40}deg);
                    opacity: ${parseFloat(element.style.opacity)};
                }
                100% {
                    transform: translate(${Math.random() * 40 - 20}px, ${-Math.random() * 80 - 30}px) rotate(${Math.random() * 60}deg);
                    opacity: 0;
                }
            }
        `;
        
        // Add the keyframes to the document
        const styleEl = document.createElement('style');
        styleEl.innerHTML = keyframes;
        document.head.appendChild(styleEl);
        
        // Apply the animation with cubic-bezier for smoothness
        element.style.animation = `${animationName} ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s forwards`;
        
        // Add to DOM
        particlesContainer.appendChild(element);
        
        // Remove after animation completes
        setTimeout(() => {
            element.remove();
            styleEl.remove();
        }, (duration + delay) * 1000);
    }

    // Celebration effect when modal opens - minimal but elegant
    function createCelebrationEffect() {
        // Add a few celebration elements
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const rand = Math.random();
                if (rand < 0.4) {
                    createGlowParticle();
                } else if (rand < 0.45) {
                    createMinimalStar();
                } else if (rand < 0.7) {
                    createMinimalHeart();
                } else {
                    // Special celebration emoji (used sparingly)
                    const celebElement = document.createElement('div');
                    celebElement.className = 'celeb-emoji';
                    
                    // Choose from minimal celebration emojis
                    const celebEmojis = ['✧', '♡', '✦', '★', '♥'];
                    celebElement.innerHTML = celebEmojis[Math.floor(Math.random() * celebEmojis.length)];
                    
                    const size = Math.random() * 25 + 10;
                    celebElement.style.fontSize = `${size*4}px`;
                    celebElement.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                    
                    setupFloatingElement(celebElement);
                }
            }, i * 100);
        }
    }
    // Add this code at the end of your existing JavaScript file (just before the closing });

// Direct timeline button fix
document.addEventListener('DOMContentLoaded', function() {
    // Simple direct approach to fix the timeline button
    const timelineButton = document.getElementById('timeline-button');
    
    if (timelineButton) {
        console.log('Timeline button found - attaching direct event listener');
        
        // Clear any existing click handlers and add a clean one
        timelineButton.onclick = function(e) {
            e.preventDefault();
            console.log('Timeline button clicked!');
            window.location.href = 'timeline.html';
        };
        
        // Make the button visibly clickable
        timelineButton.style.cursor = 'pointer';
        timelineButton.style.position = 'relative';
        timelineButton.style.zIndex = '999';
    } else {
        console.log('Timeline button not found by ID - trying alternatives');
        
        // Try finding by class or content
        const altButtons = document.querySelectorAll('.timeline-button, button:contains("Memories")');
        
        if (altButtons.length > 0) {
            console.log('Found alternative buttons:', altButtons.length);
            
            altButtons.forEach(btn => {
                btn.onclick = function(e) {
                    e.preventDefault();
                    console.log('Alternative timeline button clicked!');
                    window.location.href = 'timeline.html';
                };
                
                btn.style.cursor = 'pointer';
                btn.style.position = 'relative';
                btn.style.zIndex = '999';
            });
        } else {
            // Last resort: create a backup button
            console.log('No timeline buttons found - creating backup');
            createBackupTimelineButton();
        }
    }
    
    // Create a backup timeline button function
    function createBackupTimelineButton() {
        const backupButton = document.createElement('button');
        backupButton.textContent = '🕒 Go To Memories';
        backupButton.id = 'backup-timeline-button';
        backupButton.style.position = 'fixed';
        backupButton.style.bottom = '20px';
        backupButton.style.right = '20px';
        backupButton.style.zIndex = '10000';
        backupButton.style.padding = '10px 20px';
        backupButton.style.backgroundColor = '#fd79a8';
        backupButton.style.color = 'white';
        backupButton.style.border = 'none';
        backupButton.style.borderRadius = '5px';
        backupButton.style.fontWeight = 'bold';
        backupButton.style.cursor = 'pointer';
        backupButton.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        
        backupButton.onclick = function() {
            window.location.href = 'timeline.html';
        };
        
        document.body.appendChild(backupButton);
    }
    
});
});
// Show the current slide

  
  