// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1200,
    once: false
  });
  
  // Create floating hearts
  createHearts();
  
  // Setup audio controls
  setupAudio();
  
  // Setup slide show functionality
  setupSlideshow();
  
  // Setup May slideshow
  setupMaySlideshow();
});

// Create floating hearts in the background
const createHearts = () => {
  const container = document.querySelector('.floating-hearts');
  const heartCount = 35;
  
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100 + 100;
    
    // Random size
    const size = Math.random() * 15 + 10;
    
    // Random animation duration
    const duration = Math.random() * 20 + 5;
    const delay = Math.random() * 8;
    
    heart.style.left = `${posX}%`;
    heart.style.top = `${posY}%`;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    
    container.appendChild(heart);
  }
};

// Audio controls setup
const setupAudio = () => {
  const audio1 = document.getElementById('background-music-1');
  const audio2 = document.getElementById('background-music-2');
  
  const playPauseBtn = document.getElementById('play-pause');
  const muteBtn = document.getElementById('mute');
  const volumeControl = document.querySelector('.volume-control');
  
  let currentAudio = audio1; // Keep track of which audio is currently active
  
  // Set initial volume for both audio elements
  audio1.volume = 1;
  audio2.volume = 1;
  
  // Function to play audio sequence
  const playSequence = () => {
    audio1.play().catch(e => console.log('Audio playback was prevented:', e));
    currentAudio = audio1;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    
    // When audio1 ends, play audio2
    audio1.addEventListener('ended', () => {
      audio2.play().catch(e => console.log('Audio playback was prevented:', e));
      currentAudio = audio2;
    }, { once: true });
    
    // Optional: If you want to loop back to audio1
    audio2.addEventListener('ended', () => {
      audio1.currentTime = 0;
      playSequence();
    }, { once: true });
  };
  
  // Play audio when user interacts with the page
  window.addEventListener('click', () => {
    if (audio1.paused && audio2.paused) {
      playSequence();
    }
  }, { once: true });
  
  // Play/Pause button - now handles both audio elements
  playPauseBtn.addEventListener('click', () => {
    if (audio1.paused && audio2.paused) {
      // Both are paused, start or resume
      if (currentAudio.currentTime > 0 && currentAudio.currentTime < currentAudio.duration) {
        // Resume current audio
        currentAudio.play().catch(e => console.log('Audio playback was prevented:', e));
      } else {
        // Start from the beginning
        playSequence();
      }
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      // Something is playing, pause both
      audio1.pause();
      audio2.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });
  
  // Mute button - mutes both audio elements
  muteBtn.addEventListener('click', () => {
    const muted = !audio1.muted;
    audio1.muted = muted;
    audio2.muted = muted;
    
    if (muted) {
      muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });
  
  // Volume control - controls volume for both audio elements
  volumeControl.addEventListener('input', () => {
    const volume = volumeControl.value;
    audio1.volume = volume;
    audio2.volume = volume;
    
    if (volume === 0) {
      muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });
};

// Setup slideshow functionality
const setupSlideshow = () => {
  const timeline = document.getElementById('timeline');
  const entries = document.querySelectorAll('.timeline-entry');
  const nextSectionBtn = document.querySelector('.next-section-container');
  const mayEntryIndex = Array.from(entries).findIndex(entry => 
    entry.querySelector('h2')?.textContent.includes('May 2003')
  );
  
  let currentIndex = 0;
  let autoSlideInterval;
  let reachedMay = false;
  
  // Create slide controls
  const createSlideControls = () => {
    const slideControls = document.createElement('div');
    slideControls.id = 'slide-controls';
    
    const prevBtn = document.createElement('button');
    prevBtn.id = 'prev-slide';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextBtn = document.createElement('button');
    nextBtn.id = 'next-slide';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    const pauseBtn = document.createElement('button');
    pauseBtn.id = 'pause-slide';
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    
    const indicator = document.createElement('span');
    indicator.id = 'slide-indicator';
    indicator.textContent = `${currentIndex + 1} / ${entries.length}`;
    
    slideControls.appendChild(prevBtn);
    slideControls.appendChild(pauseBtn);
    slideControls.appendChild(nextBtn);
    slideControls.appendChild(indicator);
    
    document.body.appendChild(slideControls);
    
    return { prevBtn, nextBtn, pauseBtn, indicator };
  };
  
  const { prevBtn, nextBtn, pauseBtn, indicator } = createSlideControls();
  
  // Make sure next-section-container is initially hidden via JS in case CSS fails
  if (nextSectionBtn) {
    nextSectionBtn.style.display = 'none';
  }
  
  // Show the current slide
  const showSlide = (index) => {
    entries.forEach((entry, i) => {
      entry.classList.remove('active');
      if (i === index) {
        entry.classList.add('active');
        // Animate text when slide is shown
        animateText(entry.querySelector('.poetry-text'));
        // Scroll to the current entry
        entry.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    
    indicator.textContent = `${index + 1} / ${entries.length}`;
    
    // Check if we're at the May 2003 slide
    if (index === mayEntryIndex && !reachedMay) {
      reachedMay = true;
      stopAutoSlide();
      
      // Show the "Next Step" button with a delay
      if (nextSectionBtn) {
        setTimeout(() => {
          nextSectionBtn.style.display = 'flex';
          
          // Add button highlighting animation
          const nextButton = nextSectionBtn.querySelector('.next-step-button');
          if (nextButton) {
            nextButton.classList.add('highlight-button');
          }
          
          // Show popup panel after May slide
          showNextStepPopup();
        }, 10000); // Show after 2 seconds of seeing the May slide
      }
    } else if (index !== mayEntryIndex && nextSectionBtn) {
      // Hide the button on all other slides
      nextSectionBtn.style.display = 'none';
      hideNextStepPopup();
    }
  };
  
  // Create and show a popup panel for cake.html transition
 // FUNCTION 1: Replace your showNextStepPopup function with this:
const showNextStepPopup = () => {
  // Create full-screen gradient overlay
  const overlay = document.createElement('div');
  overlay.id = 'next-step-popup-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg,rgb(223, 34, 34),rgb(60, 9, 131));
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fade-in 0.8s ease-out;
  `;
  
  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'next-step-popup';
  popup.style.cssText = `
    background: rgba(255, 255, 255, 0.2);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 90%;
    width: 500px;
    border: 3px solid white;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  `;
  
  // Add content to popup
  popup.innerHTML = `
    <h2 style="color: white; margin-top: 0; font-size: 2.5rem; text-shadow: 0 2px 5px rgba(0,0,0,0.3);">Kaisa Laga Budddhu</h2>
    <p style="color: white; font-size: 1.3rem; margin-bottom: 30px; text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
     Mere Afifa Khush Kya ji Mmm Mere Zindagi
    </p>
    <a href="cake/cake.html" class="next-step-button" style="
      display: inline-flex;
      padding: 15px 30px;
      background: white;
      color:rgb(247, 243, 237);
      background: linear-gradient(145deg,rgb(223, 34, 34),rgb(60, 9, 131));
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      font-size: 1.4rem;
      align-items: center;
      gap: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
    ">
      <i class="fas fa-birthday-cake"></i> Baby Chalo Ab Mmm Cake Taatinge
    </a>
    <style>
     @keyframes background-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
      #next-step-popup .next-step-button:hover {
        transform: scale(1.05);
        box-shadow: 0 7px 20px rgba(0,0,0,0.3);
      }
    </style>
  `;
  
  // Hide all other content
  const mainContent = document.querySelectorAll('body > *:not(script):not(link):not(style)');
  mainContent.forEach(element => {
    if (element !== overlay) {
      element.style.display = 'none';
    }
  });
  
  // Add popup to overlay
  overlay.appendChild(popup);
  
  // Add overlay to page
  document.body.appendChild(overlay);
  
  // Listen for click on overlay to close it
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      hideNextStepPopup();
    }
  });
};

  
  // Hide the popup panel
  const hideNextStepPopup = () => {
    const overlay = document.getElementById('next-step-popup-overlay');
    if (overlay) {
      overlay.style.animation = 'fade-out 0.5s forwards';
      
      // Create the disappear animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fade-out{
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
      `;
      document.head.appendChild(style);
      
      // Remove after animation completes
      setTimeout(() => {
        overlay.remove();
        
        // Show all previously hidden content
        const mainContent = document.querySelectorAll('body > *:not(script):not(link):not(style)');
        mainContent.forEach(element => {
          element.style.display = '';
        });
      }, 500);
    }
  };
  
  // Go to next slide
  const nextSlide = () => {
    // Don't proceed beyond May if we've reached it
    if (reachedMay && currentIndex === mayEntryIndex) {
      return;
    }
    
    currentIndex = (currentIndex + 1) % entries.length;
    showSlide(currentIndex);
  };
  
  // Go to previous slide
  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + entries.length) % entries.length;
    showSlide(currentIndex);
  };
  
  // Text animation function - letter by letter display
  const animateText = (textElement) => {
    if (!textElement) return;
    
    const text = textElement.textContent;
    textElement.textContent = '';
    textElement.style.opacity = '1';
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
  };
  
  // Start auto-sliding
  const startAutoSlide = () => {
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    // Decrease the interval to 10 seconds for better user experience
    autoSlideInterval = setInterval(nextSlide, 11000); 
  };
  
  // Stop auto-sliding
  const stopAutoSlide = () => {
    pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    clearInterval(autoSlideInterval);
  };
  
  // Toggle auto-sliding
  const toggleAutoSlide = () => {
    if (autoSlideInterval) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  };
  
  // Event listeners for controls
  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    if (!reachedMay) { // Only restart auto-slide if we haven't reached May
      startAutoSlide();
    }
  });
  
  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    if (!reachedMay) { // Only restart auto-slide if we haven't reached May
      startAutoSlide();
    }
  });
  
  pauseBtn.addEventListener('click', toggleAutoSlide);
  
  // Initialize the slideshow
  showSlide(currentIndex);
  startAutoSlide();
};
// Setup May Slideshow
// Setup May Slideshow with debugging
// Setup May Slideshow with improved functionality
