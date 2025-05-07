// ===== IMPROVED TIMELINE BUTTON FIX =====
// Copy this entire script and replace your existing timeline-fix.js file

(function() {
    console.log('Improved timeline fix script loaded');
    
    // Wait for the document to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTimelineButtonFix);
    } else {
        // Document already loaded, run fix immediately
        initializeTimelineButtonFix();
    }
    
    // Also run on window load as an extra precaution
    window.addEventListener('load', initializeTimelineButtonFix);
    
    function initializeTimelineButtonFix() {
        console.log('Initializing improved timeline button fix');
        
        // Check current page to avoid redirection loops
        const currentPage = window.location.pathname.toLowerCase();
        const isTimelinePage = currentPage.includes('timeline/timeline.html') || currentPage.endsWith('timeline');
        
        console.log('Current page:', currentPage);
        console.log('Is timeline page:', isTimelinePage);
        
        if (isTimelinePage) {
            // We're already on the timeline page
            console.log('Already on timeline page - setting up home button functionality instead');
            setupHomeButton();
        } else {
            // We're on the main page - set up timeline button functionality
            console.log('On main page - setting up timeline button functionality');
            
            // Try multiple approaches - one of these will definitely work
            fixExistingButton();
            fixAllPossibleButtons();
            createBackupButton();
            addGlobalClickHandler();
        }
    }
    
    function setupHomeButton() {
        // Find home button or create one if needed
        const homeBtn = document.getElementById('home-button') || 
                        document.querySelector('.home-button');
        
        if (homeBtn) {
            console.log('Found home button - setting up return functionality');
            homeBtn.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            };
        } else {
            // Create a home button
            console.log('No home button found - creating one');
            const backupHomeBtn = document.createElement('button');
            backupHomeBtn.textContent = '🏠 Return Home';
            backupHomeBtn.id = 'backup-home-button';
            
            // Style it nicely
            backupHomeBtn.style.position = 'fixed';
            backupHomeBtn.style.top = '20px';
            backupHomeBtn.style.left = '20px';
            backupHomeBtn.style.zIndex = '100000';
            backupHomeBtn.style.padding = '10px 20px';
            backupHomeBtn.style.background = 'linear-gradient(135deg, rgba(162, 155, 254, 0.9), rgba(231, 92, 92, 0.9))';
            backupHomeBtn.style.color = 'white';
            backupHomeBtn.style.border = 'none';
            backupHomeBtn.style.borderRadius = '25px';
            backupHomeBtn.style.fontSize = '16px';
            backupHomeBtn.style.fontWeight = 'bold';
            backupHomeBtn.style.cursor = 'pointer';
            backupHomeBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            
            backupHomeBtn.onclick = function() {
                window.location.href = 'index.html';
            };
            
            document.body.appendChild(backupHomeBtn);
        }
    }
    
    function fixExistingButton() {
        // Try by ID
        const timelineBtn = document.getElementById('timeline-button');
        if (timelineBtn) {
            console.log('Found timeline button by ID');
            applyFix(timelineBtn);
        }
        
        // Try by class
        const classButtons = document.querySelectorAll('.timeline-button');
        if (classButtons.length > 0) {
            console.log('Found timeline buttons by class:', classButtons.length);
            classButtons.forEach(applyFix);
        }
    }
    
    function fixAllPossibleButtons() {
        // Get ALL buttons
        const allButtons = document.querySelectorAll('button');
        console.log('Checking all buttons:', allButtons.length);
        
        allButtons.forEach(btn => {
            // Check if this looks like a timeline button
            const text = btn.textContent.toLowerCase();
            const hasIcon = btn.querySelector('i.fa-clock') !== null;
            
          
        });
    }
    
    function applyFix(button) {
        // Make sure button is visible and clickable
        button.style.display = 'flex'; // Ensure it's visible
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto'; // Make sure it receives clicks
        button.style.cursor = 'pointer';
        button.style.position = 'relative';
        button.style.zIndex = '10000'; // Very high z-index
        
        // Add a subtle animation to make it more noticeable
        button.style.animation = 'pulse 2s infinite';
        
        // Add styles directly
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        // Remove any existing click handlers by cloning and replacing
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add a simple, direct click handler
        newButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Timeline button clicked! Going to timeline.html');
            
            // Use multiple navigation methods for redundancy
            try {
                // First try direct navigation
                window.location.href = 'timeline/timeline.html';
                
                // If that doesn't work immediately, try with a slight delay
                setTimeout(function() {
                    window.location.href = 'timeline/timeline.html';
                }, 100);
                
                // Also try with replace as a fallback
                setTimeout(function() {
                    window.location.replace('timeline,timeline.html');
                }, 200);
            } catch (err) {
                console.error('Navigation error:', err);
                // Last resort - create an actual link and click it
                const link = document.createElement('a');
                link.href = 'timeline/imeline.html';
                document.body.appendChild(link);
                link.click();
            }
        };
    }
    
    function createBackupButton() {
        // Create a completely separate backup button
        setTimeout(() => {
            console.log('Creating backup timeline button');
            const backupButton = document.createElement('button');
            
            backupButton.id = 'backup-timeline-button';
            
            // Style it attractively but make it stand out
          
            
            // Add direct click handler
            backupButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Backup button clicked');
                window.location.href = 'timeline/imeline.html';
            });
            
            // Add to the body
            document.body.appendChild(backupButton);
        }, 1000); // Delay to ensure the page is loaded
    }
    
    function addGlobalClickHandler() {
        // Add a global click interceptor as absolute last resort
        document.addEventListener('click', function(e) {
            // Check if this looks like it could be our timeline button
            const target = e.target;
            const closestButton = target.closest('button');
            
            if (closestButton) {
                const text = closestButton.textContent.toLowerCase();
                const hasIcon = closestButton.querySelector('i.fa-clock') !== null;
                
                if (text.includes('memories') || text.includes('timeline') || 
                    text.includes('clock') || hasIcon ||
                    closestButton.id === 'timeline-button' ||
                    closestButton.classList.contains('timeline-button')) {
                    
                    console.log('Global handler caught timeline button click');
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = 'timeline/timeline.html';
                }
            }
        }, true); // Use capture phase for earliest interception
    }
})();