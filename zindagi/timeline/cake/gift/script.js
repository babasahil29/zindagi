document.addEventListener('DOMContentLoaded', function() {
    // Sahil's promises
    const promises = [
        "Promise ki Har Din Nayi Ice Cream Har Flavour ki  🍦😋💖.",
        "Promise ki Kabhi Awaaz Nahi Uthaaunga Mere Ji Pe🫱🤍",
        "Promise ki Deen Mey Bhi Badhunga Duniya Mey Bhi🌙🌍",
        "Promise ki Har Chote Nakhre Uthaunga.💁‍♀️😄",
        "Promise ki Mera Pyaar Hi Jyaada Rahega Hamesha🔒💫❤️"
    ];

    const cardsContainer = document.querySelector('.cards-container');
    const nextButton = document.getElementById('nextButton');
    
    let totalCards = 9; // Total cards (5 promise + 4 blank)
    let interactedCards = 0; // Track how many cards have been interacted with
    
    // Add a variable to track the currently flipped card
    let currentlyFlippedCard = null;
    
    // Create background particles
    createParticles();
    
    // Shuffle array function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Create an array with card types (promise or blank)
    function createCardTypes() {
        let cardTypes = [];
        // Add promise cards
        for (let i = 0; i < promises.length; i++) {
            cardTypes.push({type: 'promise', content: promises[i]});
        }
        // Add blank cards
        for (let i = 0; i < 4; i++) {
            cardTypes.push({type: 'blank'});
        }
        return shuffleArray(cardTypes);
    }
    
    // Generate cards
    function generateCards() {
        const cardTypes = createCardTypes();
        
        cardTypes.forEach((cardData, index) => {
            if (cardData.type === 'promise') {
                createPromiseCard(cardData.content, index);
            } else {
                createBlankCard(index);
            }
        });
        
        // Delayed card appearance
        setTimeout(() => {
            const allCards = document.querySelectorAll('.card');
            allCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 300);
    }
    
    // Create a promise card
    function createPromiseCard(promiseText, index) {
        const template = document.getElementById('promise-card-template');
        const cardClone = document.importNode(template.content, true);
        
        const card = cardClone.querySelector('.card');
        card.dataset.index = index;
        
        cardClone.querySelector('.promise-text').textContent = promiseText;
        
        // Add click event for flipping
        card.addEventListener('click', function(e) {
            if (!card.classList.contains('flipped') && !card.classList.contains('completed')) {
                // Close previously flipped card if one exists
                if (currentlyFlippedCard && currentlyFlippedCard !== card) {
                    closeCard(currentlyFlippedCard);
                }
                
                // Update currently flipped card reference
                currentlyFlippedCard = card;
                
                flipCard(card);
            }
        });
        
        // Add close event by clicking anywhere on the back
        cardClone.querySelector('.close-area').addEventListener('click', function() {
            closeCard(card);
            // Reset currently flipped card reference
            if (currentlyFlippedCard === card) {
                currentlyFlippedCard = null;
            }
        });
        
        cardsContainer.appendChild(cardClone);
    }
    
    // Create a blank card
    function createBlankCard(index) {
        const template = document.getElementById('blank-card-template');
        const cardClone = document.importNode(template.content, true);
        
        const card = cardClone.querySelector('.card');
        card.dataset.index = index;
        
        // Add click event for flipping
        card.addEventListener('click', function(e) {
            if (!card.classList.contains('flipped') && !card.classList.contains('completed') && 
                !e.target.classList.contains('promise-input') && 
                !e.target.classList.contains('submit-promise')) {
                
                // Close previously flipped card if one exists
                if (currentlyFlippedCard && currentlyFlippedCard !== card) {
                    closeCard(currentlyFlippedCard);
                }
                
                // Update currently flipped card reference
                currentlyFlippedCard = card;
                
                flipCard(card);
            }
        });
        
        // Add submit button event
        cardClone.querySelector('.submit-promise').addEventListener('click', function() {
            const textarea = card.querySelector('.promise-input');
            const text = textarea.value.trim();
            
            if (text) {
                submitPromise(card, text);
                // Reset currently flipped card reference after submission
                if (currentlyFlippedCard === card) {
                    currentlyFlippedCard = null;
                }
            } else {
                textarea.placeholder = "Please write something sweet...";
                textarea.classList.add('error');
                setTimeout(() => {
                    textarea.classList.remove('error');
                }, 1000);
            }
        });
        
        cardsContainer.appendChild(cardClone);
    }
    
    // Flip card function
    function flipCard(card) {
        // Only allow flip if card hasn't been interacted with
        if (!card.classList.contains('completed')) {
            // If there's already a flipped card that's not this one, close it first
            if (currentlyFlippedCard && currentlyFlippedCard !== card) {
                closeCard(currentlyFlippedCard);
            }
            
            // Now flip this card
            card.classList.add('flipped');
            currentlyFlippedCard = card;
            
            // For promise cards, mark as completed once flipped
            if (!card.querySelector('.promise-input')) {
                // Set a timer to auto-close the card after reading
                setTimeout(() => {
                    // Only close if it's still flipped and not already completed
                    if (card.classList.contains('flipped') && !card.classList.contains('completed')) {
                        closeCard(card);
                        // Reset currently flipped card reference
                        if (currentlyFlippedCard === card) {
                            currentlyFlippedCard = null;
                        }
                    }
                }, 8000);
            }
        }
    }
    
    // Submit promise function for blank cards
    function submitPromise(card, text) {
        const successMessage = card.querySelector('.success-message');
        const submittedText = card.querySelector('.submitted-text');
        const submitButton = card.querySelector('.submit-promise');
        const textarea = card.querySelector('.promise-input');
        
        // Display the submitted text
        
        
        // Hide textarea and submit button
        textarea.style.display = 'none';
        submitButton.style.display = 'none';
        
        // Show success message
        successMessage.classList.remove('hidden');
        
        // Add a close area to the card back if it doesn't already have one
        if (!card.querySelector('.card-back .close-area')) {
            const closeArea = document.createElement('div');
            closeArea.classList.add('close-area');
            card.querySelector('.card-back').prepend(closeArea);
            
            // Add event listener to close area
            closeArea.addEventListener('click', function() {
                closeCard(card);
                // Reset currently flipped card reference
                if (currentlyFlippedCard === card) {
                    currentlyFlippedCard = null;
                }
            });
        }
        
        // Mark card as completed immediately
        markCardAsCompleted(card);
        
        // Set a timer to auto-close the card after showing success message
        setTimeout(() => {
            closeCard(card);
            // Reset currently flipped card reference
            currentlyFlippedCard = null;
        }, 8000);
    }
    
    // Close card function
   // Close card function
function closeCard(card) {
    card.classList.remove('flipped');
    
    // If card is not already marked as completed
    if (!card.classList.contains('completed')) {
        markCardAsCompleted(card);
    }
    
    // Check if all cards are completed after this card is closed
    checkAllCardsCompleted();
}
    
    // Mark card as completed
  // Mark card as completed
 // Mark card as completed
function markCardAsCompleted(card) {
    // Only count each card once
    if (!card.classList.contains('completed')) {
        card.classList.add('completed');
        interactedCards++;
        
        // Change the heart icon to a tick/check icon
        const iconElement = card.querySelector('.heart-icon');
        if (iconElement) {
            iconElement.classList.remove('fa-heart');
            iconElement.classList.add('fa-check');
        }
        
        // Create a completion effect
        createCompletionEffect(card);
        
        // Check if all cards have been completed
        checkAllCardsCompleted();
    }
}
    // Create completion effect
    function createCompletionEffect(card) {
        // Add a subtle animation to the card
        card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Create sparkle effect
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            const size = Math.random() * 6 + 2;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            
            const duration = Math.random() * 1 + 0.5;
            sparkle.style.animation = `sparkle ${duration}s forwards`;
            
            card.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                sparkle.remove();
            }, duration * 1000);
        }
    }
    
    // Show next button
    // Show next button
    function showNextButton() {
        nextButton.classList.remove('hidden');
        // Make the button visible immediately
        nextButton.style.display = 'inline-block';
        nextButton.classList.add('visible');
    }
    // Check if all cards are completed and show next button if they are
function checkAllCardsCompleted() {
    const allCards = document.querySelectorAll('.card');
    const completedCards = document.querySelectorAll('.card.completed');
    
    if (completedCards.length === allCards.length) {
        showNextButton();
    }
}
    
    // Next button click handler
    nextButton.addEventListener('click', function() {
        // Add a fancy exit animation
        document.body.classList.add('page-exit');
        
        // Redirect after animation completes
        setTimeout(() => {
            window.location.href = 'file:///C:/Users/user/zindagi/timeline/cake/gift/beginning/beginning.html';

        }, 800);
    });
    
    // Create background particles
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            particle.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 15}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Initialize
    generateCards();
    
    // Add some page load animations
    document.querySelector('header').style.opacity = '0';
    document.querySelector('header').style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        document.querySelector('header').style.transition = 'all 1s ease';
        document.querySelector('header').style.opacity = '1';
        document.querySelector('header').style.transform = 'translateY(0)';
    }, 300);
});
initAudio();
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
