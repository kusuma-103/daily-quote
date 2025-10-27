// Daily Quote Generator - Interactive JavaScript Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initQuoteAnimations();
    initFormEnhancements();
    initThemeSwitcher();
    initSmoothScrolling();
    initQuoteSharing();
    initTypingEffect();
    initFavoriteButton();
    initFormLoading();
});

// Quote animations and transitions
function initQuoteAnimations() {
    const quoteContainer = document.querySelector('.quote-container');
    const newQuoteBtn = document.querySelector('#new-quote-btn');
    
    if (quoteContainer && newQuoteBtn) {
        // Add click animation to new quote button
        newQuoteBtn.addEventListener('click', function(e) {
            // Add loading state
            this.innerHTML = '<span class="loading">Loading...</span>';
            this.disabled = true;
            
            // Add pulse animation
            quoteContainer.style.animation = 'pulse 0.5s ease-in-out';
            
            // Reset animation after delay
            setTimeout(() => {
                quoteContainer.style.animation = 'fadeInUp 0.6s ease-out';
            }, 500);
        });
        
        // Add hover effects to quote text
        const quoteText = document.querySelector('.quote-text');
        if (quoteText) {
            quoteText.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            quoteText.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    }
}

// Favorite button functionality
function initFavoriteButton() {
    const favoriteBtn = document.querySelector('#favorite-btn');
    
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            const quoteText = document.querySelector('.quote-text').textContent;
            const quoteAuthor = document.querySelector('.quote-author').textContent;
            
            // Toggle favorite state
            if (this.classList.contains('favorited')) {
                this.classList.remove('favorited');
                this.innerHTML = '❤️ Favorite';
                showNotification('Removed from favorites', 'info');
            } else {
                this.classList.add('favorited');
                this.innerHTML = '❤️ Favorited';
                showNotification('Added to favorites!', 'success');
                
                // Store in localStorage
                const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
                const quote = { text: quoteText, author: quoteAuthor, date: new Date().toISOString() };
                favorites.push(quote);
                localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
            }
        });
    }
}

// Form loading states
function initFormLoading() {
    const form = document.querySelector('#quote-form');
    const submitBtn = document.querySelector('#submit-btn');
    
    if (form && submitBtn) {
        form.addEventListener('submit', function() {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        });
    }
}

// Form enhancements
function initFormEnhancements() {
    const form = document.querySelector('.quote-form');
    const textarea = document.querySelector('textarea[name="quote_text"]');
    const authorInput = document.querySelector('input[name="author"]');
    
    if (form) {
        // Add real-time character count for quote text
        if (textarea) {
            const charCount = document.createElement('div');
            charCount.className = 'char-count';
            charCount.style.cssText = `
                text-align: right;
                font-size: 0.9rem;
                color: #718096;
                margin-top: 5px;
            `;
            textarea.parentNode.appendChild(charCount);
            
            textarea.addEventListener('input', function() {
                const count = this.value.length;
                charCount.textContent = `${count} characters`;
                
                // Change color based on length
                if (count > 200) {
                    charCount.style.color = '#e53e3e';
                } else if (count > 150) {
                    charCount.style.color = '#f6ad55';
                } else {
                    charCount.style.color = '#718096';
                }
            });
        }
        
        // Add form validation feedback
        form.addEventListener('submit', function(e) {
            const quoteText = textarea.value.trim();
            const author = authorInput.value.trim();
            
            if (!quoteText || !author) {
                e.preventDefault();
                showNotification('Please fill in both fields!', 'error');
                return;
            }
            
            if (quoteText.length < 10) {
                e.preventDefault();
                showNotification('Quote text should be at least 10 characters long!', 'error');
                return;
            }
            
            if (author.length < 2) {
                e.preventDefault();
                showNotification('Author name should be at least 2 characters long!', 'error');
                return;
            }
            
            // Show success animation
            showNotification('Quote added successfully!', 'success');
        });
    }
}

// Theme switcher functionality
function initThemeSwitcher() {
    // Create theme switcher button
    const themeBtn = document.createElement('button');
    themeBtn.innerHTML = '🎨';
    themeBtn.className = 'theme-switcher';
    themeBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(themeBtn);
    
    const themes = [
        {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            textColor: 'white',
            contrastColor: 'rgba(255, 255, 255, 0.9)'
        },
        {
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
            textColor: '#2d3748',
            contrastColor: 'rgba(45, 55, 72, 0.9)'
        },
        {
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            textColor: '#2d3748',
            contrastColor: 'rgba(45, 55, 72, 0.9)'
        },
        {
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            textColor: '#2d3748',
            contrastColor: 'rgba(45, 55, 72, 0.9)'
        },
        {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            textColor: 'white',
            contrastColor: 'rgba(255, 255, 255, 0.9)'
        }
    ];
    
    let currentTheme = 0;
    
    function applyTheme(themeIndex) {
        const theme = themes[themeIndex];
        document.body.style.background = theme.background;
        
        // Add theme class to body for CSS targeting
        document.body.classList.remove('theme-light', 'theme-dark');
        if (themeIndex === 0 || themeIndex === 4) {
            document.body.classList.add('theme-dark');
        } else {
            document.body.classList.add('theme-light');
        }
        
        // Update text colors for some elements via class-based theming
        // (Do NOT set inline colors for form tips here — styling is handled in CSS)
        const elementsToUpdate = [
            '.quote-stats',
            'footer'
        ];

        elementsToUpdate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.color = theme.textColor;
            });
        });

        // Update stat labels specifically (small exception)
        const statLabels = document.querySelectorAll('.stat-label');
        statLabels.forEach(label => {
            label.style.color = theme.contrastColor;
        });

        // Also set a data attribute for theme so CSS can respond without inline styles
        document.body.dataset.theme = (themeIndex === 0 || themeIndex === 4) ? 'dark' : 'light';
    }
    
    themeBtn.addEventListener('click', function() {
        currentTheme = (currentTheme + 1) % themes.length;
        applyTheme(currentTheme);
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Add hover effect
    themeBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    themeBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Apply initial theme
    applyTheme(0);
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Quote sharing functionality
function initQuoteSharing() {
    const quoteContainer = document.querySelector('.quote-container');
    
    if (quoteContainer) {
        // Create share button
        const shareBtn = document.createElement('button');
        shareBtn.innerHTML = '📤 Share';
        shareBtn.className = 'btn btn-secondary share-btn';
        shareBtn.style.marginLeft = '10px';
        
        const quoteActions = document.querySelector('.quote-actions');
        if (quoteActions) {
            quoteActions.appendChild(shareBtn);
            
            shareBtn.addEventListener('click', function() {
                const quoteText = document.querySelector('.quote-text').textContent;
                const quoteAuthor = document.querySelector('.quote-author').textContent;
                const shareText = `${quoteText} ${quoteAuthor}`;
                
                if (navigator.share) {
                    navigator.share({
                        title: 'Daily Quote',
                        text: shareText,
                        url: window.location.href
                    });
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(shareText).then(() => {
                        showNotification('Quote copied to clipboard!', 'success');
                    }).catch(() => {
                        showNotification('Unable to copy quote', 'error');
                    });
                }
            });
        }
    }
}

// Typing effect for quotes
function initTypingEffect() {
    const quoteText = document.querySelector('.quote-text');
    
    if (quoteText && !quoteText.dataset.animated) {
        quoteText.dataset.animated = 'true';
        const originalText = quoteText.textContent;
        quoteText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                quoteText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 1001;
        animation: slideDown 0.3s ease-out;
        max-width: 400px;
        text-align: center;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for JavaScript features
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
    
    .loading {
        display: inline-block;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .theme-switcher:hover {
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
    }
    
    .share-btn:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important;
    }
`;
document.head.appendChild(style);
