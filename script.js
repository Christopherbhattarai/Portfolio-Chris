// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navBrand = document.querySelector('.nav-brand');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Scroll handler for name visibility
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100; // Show name after scrolling 100px

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > scrollThreshold) {
            navBrand.classList.add('show');
        } else {
            navBrand.classList.remove('show');
        }
        
        lastScrollY = currentScrollY;
    });
});

// Image zoom functionality
function toggleZoom(img) {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        modalImg.src = img.src;
    }
}

// Close modal when clicking outside the image
document.getElementById('photo-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation to sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add text generation effect
document.querySelectorAll('.text-generate-effect').forEach(element => {
    const text = element.getAttribute('data-text');
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 50);
        }
    }
    
    typeText();
});

// Visitor Counter
let visitorCount = localStorage.getItem('visitorCount') || 0;
const visitorCountElement = document.getElementById('visitor-count');
const resetButton = document.getElementById('reset-counter');

// Update counter display
function updateCounter() {
    visitorCountElement.textContent = visitorCount;
    localStorage.setItem('visitorCount', visitorCount);
}

// Increment counter
function incrementCounter() {
    visitorCount++;
    updateCounter();
}

// Reset counter
function resetCounter() {
    if (confirm('Are you sure you want to reset the visitor counter?')) {
        visitorCount = 0;
        updateCounter();
    }
}

// Initialize counter
updateCounter();

// Add event listener for reset button
resetButton.addEventListener('click', resetCounter);

// Increment counter on page load
incrementCounter();

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Timeline Animation
function handleTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Project Animation
function handleProjectAnimation() {
    const projectItems = document.querySelectorAll('.project-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    projectItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize all animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    animateProgressBars();
    handleTimelineAnimation();
    handleProjectAnimation();
}); 