/*===== PERFORMANCE & MOBILE OPTIMIZATIONS =====*/

// Enhanced smooth scrolling
function initSmoothScrolling() {
    // Enable smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation link
                updateActiveNavLink(this.getAttribute('href'));
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Enhanced mobile navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('show-menu');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                navMenu.classList.add('show-menu');
                navToggle.classList.add('active');
                document.body.classList.add('menu-open');
                navToggle.setAttribute('aria-expanded', 'true');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    navMenu.classList.remove('show-menu');
    navToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

// Active navigation link tracking
function updateActiveNavLink(href) {
    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active-link');
    });
    
    const activeLink = document.querySelector(`a[href="${href}"]`);
    if (activeLink) {
        activeLink.classList.add('active-link');
    }
}

// Scroll-based navigation highlighting
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                updateActiveNavLink(`#${sectionId}`);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Header scroll behavior
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
        
        // Hide/show header on scroll (mobile optimization)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.classList.add('hide-header');
            } else {
                header.classList.remove('hide-header');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Touch gesture enhancements
function initTouchGestures() {
    if (!('ontouchstart' in window)) return;
    
    let startX, startY, endX, endY;
    
    // Swipe to close mobile menu
    const navMenu = document.getElementById('nav-menu');
    
    if (navMenu) {
        navMenu.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        navMenu.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = Math.abs(endY - startY);
            
            // Swipe right to close menu (for left-sliding menus)
            if (deltaX > 100 && deltaY < 50) {
                closeMobileMenu();
            }
        }, { passive: true });
    }
}

// Optimized resize handler
function initResizeHandler() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250);
    });
}

// Performance monitoring and optimization
function initPerformanceOptimizations() {
    // Debounced scroll handler for better performance
    let scrollTimer;
    const originalScrollHandlers = new Map();
    
    // Override scroll events with debouncing
    const optimizedScrollHandler = (callback, delay = 16) => {
        return function(...args) {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => callback.apply(this, args), delay);
        };
    };
    
    // Reduce animation complexity on lower-end devices
    if (navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2) {
        document.body.classList.add('reduce-animations');
    }
    
    // Connection-aware loading
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('slow-connection');
        }
    }
}

// Initialize all optimizations
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initMobileNavigation();
    initScrollSpy();
    initHeaderScroll();
    initTouchGestures();
    initResizeHandler();
    initPerformanceOptimizations();
});

/*===== INTERACTIVE HERO SECTION =====*/

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
        // Disable animations for slow connections
        disable: document.body.classList.contains('slow-connection') || 
                window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
});

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const options = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = parseFloat(element.getAttribute('data-float-speed')) || 1;
        
        // Add random offset for more natural movement
        const offset = Math.random() * 2 * Math.PI;
        
        function animate() {
            const time = Date.now() * 0.001 * speed;
            const x = Math.sin(time + offset) * 10;
            const y = Math.cos(time + offset) * 15;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(animate);
        }
        
        // Start animation after element becomes visible
        setTimeout(() => {
            animate();
        }, 1000 + (index * 400));
    });
}

// Interactive Map Pin
function initMapInteraction() {
    const mapPin = document.querySelector('.map-pin');
    const mapContainer = document.querySelector('.map-container');
    
    if (mapPin && mapContainer) {
        mapPin.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 150);
            
            // Show location info with animation
            const mapInfo = document.querySelector('.map-info');
            if (mapInfo) {
                mapInfo.style.transform = 'translateY(0)';
                mapInfo.style.opacity = '1';
            }
        });
        
        // Tooltip functionality
        const tooltip = mapPin.getAttribute('data-tooltip');
        if (tooltip) {
            mapPin.addEventListener('mouseenter', function(e) {
                showTooltip(e, tooltip);
            });
            
            mapPin.addEventListener('mouseleave', function() {
                hideTooltip();
            });
        }
    }
}

// Tooltip System
function showTooltip(event, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 1000;
        pointer-events: none;
        transform: translateY(-10px);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    
    // Animate in
    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    });
}

function hideTooltip() {
    const tooltip = document.querySelector('.custom-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }
}

// Button Ripple Effect
function initButtonRipples() {
    const interactiveButtons = document.querySelectorAll('.btn--interactive');
    
    interactiveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = this.querySelector('.btn__ripple');
            if (ripple) {
                ripple.style.width = '0';
                ripple.style.height = '0';
                
                requestAnimationFrame(() => {
                    ripple.style.width = '300px';
                    ripple.style.height = '300px';
                });
                
                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                }, 500);
            }
        });
    });
}

// Dynamic Text Effects
function initDynamicText() {
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        const texts = ['The New Lagos', 'Future Megacity', 'Investment Haven', 'Economic Hub'];
        let currentIndex = 0;
        
        setInterval(() => {
            dynamicText.style.opacity = '0';
            dynamicText.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                dynamicText.textContent = texts[currentIndex];
                dynamicText.style.opacity = '1';
                dynamicText.style.transform = 'translateY(0)';
            }, 300);
        }, 4000);
    }
}

// Smooth Scroll Enhancement
function initSmoothScroll() {
    const scrollButtons = document.querySelectorAll('a[href^="#"]');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 80; // Account for fixed header
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Viewport height fix for mobile
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Performance optimization for mobile
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    const floatingElements = document.querySelectorAll('.floating-element');
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (isMobile) {
        // Disable heavy animations on mobile
        floatingElements.forEach(el => {
            el.style.display = 'none';
        });
        
        parallaxElements.forEach(el => {
            el.style.backgroundAttachment = 'scroll';
        });
    }
}

// Initialize all hero interactions
function initHeroInteractions() {
    initParallax();
    initCounters();
    initFloatingElements();
    initMapInteraction();
    initButtonRipples();
    initDynamicText();
    initSmoothScroll();
    setViewportHeight();
    optimizeForMobile();
    
    // Re-optimize on resize
    window.addEventListener('resize', () => {
        setViewportHeight();
        optimizeForMobile();
    });
}

// Start everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initHeroInteractions);

/*===== NAVIGATION MENU =====*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Menu show
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); 
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*===== SHOW SCROLL UP =====*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); 
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*===== PROPERTY SHOWCASE GALLERY =====*/
const showcaseImages = document.querySelectorAll('.showcase__img');
const showcaseThumbnails = document.querySelectorAll('.showcase__thumbnail');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentImageIndex = 0;
const imageData = [
    { src: 'assets/casa-main.jpg', alt: 'Casa de Casablanca main view' },
    { src: 'assets/casa-interior.jpg', alt: 'Luxury interior design' },
    { src: 'assets/casa-amenities.jpg', alt: 'Premium amenities' },
    { src: 'assets/casa-location.jpg', alt: 'Prime location view' }
];

// Initialize gallery
function initializeGallery() {
    if (showcaseImages.length > 0) {
        updateMainImage(0);
    }
}

// Update main image
function updateMainImage(index) {
    currentImageIndex = index;
    const mainImage = document.querySelector('.showcase__img');
    
    if (mainImage && imageData[index]) {
        mainImage.src = imageData[index].src;
        mainImage.alt = imageData[index].alt;
    }
    
    // Update thumbnail active state
    showcaseThumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Thumbnail click handlers
showcaseThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        updateMainImage(index);
    });
});

// Navigation button handlers
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : imageData.length - 1;
        updateMainImage(currentImageIndex);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentImageIndex = currentImageIndex < imageData.length - 1 ? currentImageIndex + 1 : 0;
        updateMainImage(currentImageIndex);
    });
}

/*===== INVESTMENT CALCULATOR =====*/
const calculatorInputs = {
    propertyValue: document.getElementById('propertyValue'),
    downPayment: document.getElementById('downPayment'),
    rentalIncome: document.getElementById('rentalIncome'),
    expenses: document.getElementById('expenses'),
    appreciation: document.getElementById('appreciation')
};

const calculatorResults = {
    cashRequired: document.getElementById('cashRequired'),
    monthlyCashFlow: document.getElementById('monthlyCashFlow'),
    annualROI: document.getElementById('annualROI'),
    projectedValue: document.getElementById('projectedValue')
};

function calculateROI() {
    // Get input values
    const propertyValue = parseFloat(calculatorInputs.propertyValue?.value || 850000);
    const downPaymentPercent = parseFloat(calculatorInputs.downPayment?.value || 30);
    const monthlyRental = parseFloat(calculatorInputs.rentalIncome?.value || 4500);
    const monthlyExpenses = parseFloat(calculatorInputs.expenses?.value || 800);
    const appreciationRate = parseFloat(calculatorInputs.appreciation?.value || 8);

    // Calculate values
    const downPaymentAmount = (propertyValue * downPaymentPercent) / 100;
    const loanAmount = propertyValue - downPaymentAmount;
    const monthlyMortgage = calculateMortgage(loanAmount, 4.5, 30); // 4.5% interest, 30 years
    const netMonthlyCashFlow = monthlyRental - monthlyExpenses - monthlyMortgage;
    const annualCashFlow = netMonthlyCashFlow * 12;
    const annualROI = (annualCashFlow / downPaymentAmount) * 100;
    const projectedValue = propertyValue * Math.pow(1 + appreciationRate / 100, 10);

    // Update display
    if (calculatorResults.cashRequired) {
        calculatorResults.cashRequired.textContent = formatCurrency(downPaymentAmount);
    }
    if (calculatorResults.monthlyCashFlow) {
        calculatorResults.monthlyCashFlow.textContent = formatCurrency(netMonthlyCashFlow);
    }
    if (calculatorResults.annualROI) {
        calculatorResults.annualROI.textContent = annualROI.toFixed(1) + '%';
    }
    if (calculatorResults.projectedValue) {
        calculatorResults.projectedValue.textContent = formatCurrency(projectedValue);
    }
}

function calculateMortgage(principal, rate, years) {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    const mortgage = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                     (Math.pow(1 + monthlyRate, numPayments) - 1);
    return mortgage;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Add event listeners to calculator inputs
Object.values(calculatorInputs).forEach(input => {
    if (input) {
        input.addEventListener('input', calculateROI);
    }
});

/*===== PROPERTY ACTIONS =====*/
const scheduleViewingBtn = document.getElementById('scheduleViewing');
const downloadBrochureBtn = document.getElementById('downloadBrochure');

if (scheduleViewingBtn) {
    scheduleViewingBtn.addEventListener('click', () => {
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill the interest dropdown
        const interestSelect = document.getElementById('interest');
        if (interestSelect) {
            interestSelect.value = 'property-viewing';
        }
        
        // Pre-fill message
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.value = 'I would like to schedule a viewing for Casa de Casablanca. Please contact me to arrange a convenient time.';
        }
    });
}

if (downloadBrochureBtn) {
    downloadBrochureBtn.addEventListener('click', () => {
        // In a real implementation, this would trigger a download
        showNotification('Brochure download will be available soon. Please contact us for detailed information.', 'info');
    });
}

/*===== CONTACT FORM =====*/
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObj = Object.fromEntries(formData);
        
        // Basic validation
        if (!validateForm(formObj)) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="spinner"></div> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            showNotification('Thank you for your inquiry! We will contact you within 24 hours.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

function validateForm(formData) {
    const required = ['firstName', 'lastName', 'email', 'phone', 'interest', 'message'];
    const missing = required.filter(field => !formData[field] || formData[field].trim() === '');
    
    if (missing.length > 0) {
        showNotification(`Please fill in all required fields: ${missing.join(', ')}`, 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

/*===== NOTIFICATION SYSTEM =====*/
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="notification__icon fas ${getNotificationIcon(type)}"></i>
            <span class="notification__message">${message}</span>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getNotificationColor(type),
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        maxWidth: '400px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#2c5530',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || colors.info;
}

/*===== MAP MARKERS =====*/
const mapMarkers = document.querySelectorAll('.map__marker');

mapMarkers.forEach(marker => {
    marker.addEventListener('mouseenter', function() {
        const info = this.getAttribute('data-info');
        showTooltip(this, info);
    });
    
    marker.addEventListener('mouseleave', function() {
        hideTooltip();
    });
});

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    tooltip.textContent = text;
    
    Object.assign(tooltip.style, {
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
        zIndex: '1000',
        pointerEvents: 'none',
        transform: 'translate(-50%, -100%)',
        marginTop: '-10px'
    });
    
    element.appendChild(tooltip);
}

function hideTooltip() {
    const tooltip = document.querySelector('.map-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

/*===== SMOOTH SCROLLING =====*/
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*===== BREADCRUMB NAVIGATION =====*/
function updateBreadcrumbs() {
    const breadcrumb = document.querySelector('.breadcrumb');
    const currentSection = getCurrentSection();
    
    if (breadcrumb && currentSection) {
        const activeItem = breadcrumb.querySelector('.breadcrumb-item.active');
        if (activeItem) {
            activeItem.textContent = getSectionName(currentSection);
        }
    }
}

function getCurrentSection() {
    const scrollY = window.pageYOffset;
    let currentSection = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    return currentSection;
}

function getSectionName(sectionId) {
    const sectionNames = {
        'home': 'Home',
        'featured': 'Featured Project',
        'investment-tools': 'Investment Tools',
        'about': 'About',
        'testimonials': 'Testimonials',
        'location': 'Location',
        'contact': 'Contact'
    };
    return sectionNames[sectionId] || 'Home';
}

window.addEventListener('scroll', updateBreadcrumbs);

/*===== ANIMATIONS ON SCROLL =====*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.tool__card, .testimonial__card, .advantage__item, .value__item');
animatedElements.forEach(el => observer.observe(el));

/*===== LAZY LOADING IMAGES =====*/
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

/*===== FORM ENHANCEMENTS =====*/
const formInputs = document.querySelectorAll('.form__input, .form__textarea');

formInputs.forEach(input => {
    // Floating label effect
    input.addEventListener('focus', function() {
        this.parentNode.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentNode.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value !== '') {
        input.parentNode.classList.add('focused');
    }
});

/*===== KEYBOARD NAVIGATION =====*/
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }
    }
    
    // Arrow keys for gallery navigation
    if (e.key === 'ArrowLeft' && document.activeElement.closest('.showcase__gallery')) {
        e.preventDefault();
        if (prevBtn) prevBtn.click();
    }
    
    if (e.key === 'ArrowRight' && document.activeElement.closest('.showcase__gallery')) {
        e.preventDefault();
        if (nextBtn) nextBtn.click();
    }
});

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollActive = throttle(scrollActive, 100);
const throttledScrollHeader = throttle(scrollHeader, 100);
const throttledScrollUp = throttle(scrollUp, 100);
const throttledUpdateBreadcrumbs = throttle(updateBreadcrumbs, 100);

window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollUp);
window.removeEventListener('scroll', updateBreadcrumbs);

window.addEventListener('scroll', throttledScrollActive);
window.addEventListener('scroll', throttledScrollHeader);
window.addEventListener('scroll', throttledScrollUp);
window.addEventListener('scroll', throttledUpdateBreadcrumbs);

/*===== INITIALIZATION =====*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeGallery();
    calculateROI();
    updateBreadcrumbs();
    
    // Add loading state removal
    document.body.classList.remove('loading');
    
    // Show welcome message after a delay
    setTimeout(() => {
        if (window.location.hash === '' || window.location.hash === '#home') {
            showNotification('Welcome to Tom Casa Properties! Explore our premium real estate opportunities.', 'info');
        }
    }, 1000);
});

/*===== ERROR HANDLING =====*/
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

/*===== ANALYTICS TRACKING (PLACEHOLDER) =====*/
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', { category, action, label });
    
    // In production, implement with your analytics service:
    // gtag('event', action, { event_category: category, event_label: label });
}

// Track user interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('[data-track]');
    if (target) {
        const trackData = target.dataset.track.split('|');
        trackEvent(trackData[0] || 'interaction', trackData[1] || 'click', trackData[2] || target.textContent.trim());
    }
});

/*===== ACCESSIBILITY ENHANCEMENTS =====*/
// Focus management for mobile menu
const firstFocusableElement = navMenu?.querySelector('a, button, input, [tabindex]:not([tabindex="-1"])');
const lastFocusableElement = navMenu?.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');

function trapFocus(e) {
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement[lastFocusableElement.length - 1].focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement[lastFocusableElement.length - 1]) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }
}

// Apply focus trap when mobile menu is open
if (navMenu) {
    const menuObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('show-menu')) {
                document.addEventListener('keydown', trapFocus);
                firstFocusableElement?.focus();
            } else {
                document.removeEventListener('keydown', trapFocus);
            }
        });
    });
    
    menuObserver.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
}

/*===== PRELOADER (OPTIONAL) =====*/
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
}

// Hide preloader when page is fully loaded
window.addEventListener('load', hidePreloader);

/*===== COUNTDOWN TIMER =====*/
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set countdown to 24 hours from now (or any specific date)
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            countdownElement.innerHTML = "EXPIRED";
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = 
            String(hours).padStart(2, '0') + ':' + 
            String(minutes).padStart(2, '0') + ':' + 
            String(seconds).padStart(2, '0');
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Start countdown when page loads
document.addEventListener('DOMContentLoaded', startCountdown);

/*===== ENHANCED FORM VALIDATION =====*/
function validateInvestmentForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value.trim();
        
        // Enhanced validation
        if (firstName.length < 2) {
            showNotification('Please enter a valid first name', 'error');
            return;
        }
        
        if (lastName.length < 2) {
            showNotification('Please enter a valid last name', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        if (!interest) {
            showNotification('Please select your investment interest', 'error');
            return;
        }
        
        if (message.length < 10) {
            showNotification('Please provide more details about your investment requirements', 'error');
            return;
        }
        
        // If validation passes
        showNotification('Thank you! Our VIP investment team will contact you within 24 hours.', 'success');
        
        // Here you would typically send the form data to your server
        console.log('Form submitted:', {
            firstName, lastName, email, phone, interest, message
        });
        
        // Reset form
        form.reset();
    });
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', validateInvestmentForm);

// ===== INTERACTIVE PROPERTY SHOWCASE FUNCTIONALITY =====

// Image Gallery with Lightbox
class PropertyGallery {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.thumbnails = [];
        
        this.init();
    }
    
    init() {
        this.setupGallery();
        this.setupKeyboardNavigation();
        this.setupSwipeGestures();
    }
    
    setupGallery() {
        // Initialize image data
        this.images = [
            {
                src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=675&fit=crop',
                title: 'Casa de Casablanca - Exterior View',
                description: 'Stunning Mediterranean architecture with premium finishes'
            },
            {
                src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop',
                title: 'Luxurious Living Room',
                description: 'Spacious open-plan living area with premium fixtures'
            },
            {
                src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=675&fit=crop',
                title: 'Gourmet Kitchen',
                description: 'Modern kitchen with high-end appliances and marble countertops'
            },
            {
                src: 'https://images.unsplash.com/photo-1571708541999-3ac0e16b0e68?w=1200&h=675&fit=crop',
                title: 'Master Bedroom',
                description: 'Elegant master suite with panoramic views'
            },
            {
                src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=675&fit=crop',
                title: 'Community Pool',
                description: 'Resort-style swimming pool and entertainment area'
            },
            {
                src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=675&fit=crop',
                title: 'Garden View',
                description: 'Beautifully landscaped gardens and outdoor spaces'
            }
        ];
        
        this.loadMainImage();
        this.setupThumbnails();
        this.setupGalleryControls();
    }
    
    loadMainImage() {
        const mainImageContainer = document.querySelector('.gallery__main-image');
        const counterElement = document.querySelector('.gallery__counter');
        
        if (!mainImageContainer) return;
        
        // Clear existing images
        mainImageContainer.querySelectorAll('.gallery__img').forEach(img => img.remove());
        
        // Add all images
        this.images.forEach((imageData, index) => {
            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = imageData.title;
            img.className = `gallery__img ${index === this.currentIndex ? 'active' : ''}`;
            mainImageContainer.appendChild(img);
        });
        
        // Update counter
        if (counterElement) {
            counterElement.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        }
    }
    
    setupThumbnails() {
        const thumbnailContainer = document.querySelector('.gallery__thumbnails');
        if (!thumbnailContainer) return;
        
        thumbnailContainer.innerHTML = '';
        
        this.images.forEach((imageData, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === this.currentIndex ? 'active' : ''}`;
            thumbnail.innerHTML = `
                <img src="${imageData.src}" alt="${imageData.title}">
                <div class="thumbnail__label">${imageData.title}</div>
            `;
            
            thumbnail.addEventListener('click', () => this.goToImage(index));
            thumbnailContainer.appendChild(thumbnail);
        });
        
        this.thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');
    }
    
    setupGalleryControls() {
        const prevBtn = document.querySelector('.gallery__btn--prev');
        const nextBtn = document.querySelector('.gallery__btn--next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevImage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextImage());
    }
    
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }
    
    setupSwipeGestures() {
        let startX = null;
        let startY = null;
        
        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };
        
        const handleTouchEnd = (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextImage();
                } else {
                    this.prevImage();
                }
            }
            
            startX = null;
            startY = null;
        };
        
        const galleryContainer = document.querySelector('.gallery__main-image');
        if (galleryContainer) {
            galleryContainer.addEventListener('touchstart', handleTouchStart);
            galleryContainer.addEventListener('touchend', handleTouchEnd);
        }
        
    }
    
    goToImage(index) {
        this.currentIndex = index;
        this.updateDisplay();
    }
    
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateDisplay();
    }
    
    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Update main gallery
        const activeImg = document.querySelector('.gallery__img.active');
        if (activeImg) activeImg.classList.remove('active');
        
        const newActiveImg = document.querySelectorAll('.gallery__img')[this.currentIndex];
        if (newActiveImg) newActiveImg.classList.add('active');
        
        // Update thumbnails
        this.thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update counter
        const counter = document.querySelector('.gallery__counter');
        if (counter) {
            counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        }
        
    }
    
}

// Interactive Site Plan
class InteractiveSitePlan {
    constructor() {
        this.plots = [];
        this.tooltip = null;
        this.activeTooltip = null;
        
        this.init();
    }
    
    init() {
        this.initializePlots();
        this.createTooltip();
        this.setupPlotInteractions();
    }
    
    initializePlots() {
        // Plot data with pricing and details
        this.plots = [
            { id: 'plot-1', status: 'available', size: '800m²', price: '$125,000', type: 'Standard', roi: '18%' },
            { id: 'plot-2', status: 'premium', size: '1000m²', price: '$165,000', type: 'Premium', roi: '22%' },
            { id: 'plot-3', status: 'sold', size: '750m²', price: 'SOLD', type: 'Standard', roi: 'N/A' },
            { id: 'plot-4', status: 'available', size: '850m²', price: '$135,000', type: 'Standard', roi: '19%' },
            { id: 'plot-5', status: 'premium', size: '1200m²', price: '$195,000', type: 'Premium', roi: '25%' },
            { id: 'plot-6', status: 'available', size: '900m²', price: '$145,000', type: 'Standard', roi: '20%' }
        ];
    }
    
    createTooltip() {
        const tooltipHTML = `
            <div class="plot-tooltip" id="plot-tooltip">
                <div class="tooltip__header">
                    <h4 class="tooltip__title">Plot Information</h4>
                    <button class="tooltip__close">&times;</button>
                </div>
                <div class="tooltip__content">
                    <div class="tooltip__info">
                        <span class="info__label">Size:</span>
                        <span class="info__value" id="tooltip-size"></span>
                    </div>
                    <div class="tooltip__info">
                        <span class="info__label">Price:</span>
                        <span class="info__value" id="tooltip-price"></span>
                    </div>
                    <div class="tooltip__info">
                        <span class="info__label">Type:</span>
                        <span class="info__value" id="tooltip-type"></span>
                    </div>
                    <div class="tooltip__info">
                        <span class="info__label">Expected ROI:</span>
                        <span class="info__value" id="tooltip-roi"></span>
                    </div>
                    <div class="tooltip__actions">
                        <button class="btn btn--primary btn--sm" id="tooltip-inquire">Inquire Now</button>
                    </div>
                </div>
            </div>
        `;
        
        const siteMapContainer = document.querySelector('.site-plan__map');
        if (siteMapContainer) {
            siteMapContainer.insertAdjacentHTML('beforeend', tooltipHTML);
            this.tooltip = document.getElementById('plot-tooltip');
            
            // Setup tooltip close
            const closeBtn = this.tooltip.querySelector('.tooltip__close');
            closeBtn.addEventListener('click', () => this.hideTooltip());
            
            // Setup inquire button
            const inquireBtn = document.getElementById('tooltip-inquire');
            inquireBtn.addEventListener('click', () => this.handleInquiry());
        }
    }
    
    setupPlotInteractions() {
        const plotElements = document.querySelectorAll('.plot');
        
        plotElements.forEach((plot, index) => {
            if (index < this.plots.length) {
                const plotData = this.plots[index];
                plot.classList.add(plotData.status);
                plot.setAttribute('data-plot-id', plotData.id);
                
                // Only add interactions for available plots
                if (plotData.status !== 'sold') {
                    plot.addEventListener('click', (e) => this.showTooltip(e, plotData));
                    plot.addEventListener('mouseenter', () => plot.style.opacity = '0.8');
                    plot.addEventListener('mouseleave', () => plot.style.opacity = '1');
                }
            }
        });
        
        // Hide tooltip when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.plot') && !e.target.closest('.plot-tooltip')) {
                this.hideTooltip();
            }
        });
    }
    
    showTooltip(event, plotData) {
        if (plotData.status === 'sold' || !this.tooltip) return;
        
        // Update tooltip content
        document.getElementById('tooltip-size').textContent = plotData.size;
        document.getElementById('tooltip-price').textContent = plotData.price;
        document.getElementById('tooltip-type').textContent = plotData.type;
        document.getElementById('tooltip-roi').textContent = plotData.roi;
        
        // Position tooltip
        const rect = event.target.getBoundingClientRect();
        const mapRect = document.querySelector('.site-plan__map').getBoundingClientRect();
        
        const x = rect.left - mapRect.left + rect.width / 2;
        const y = rect.top - mapRect.top;
        
        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y - 10}px`;
        this.tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
        
        // Show tooltip
        this.tooltip.classList.add('show');
        this.activeTooltip = plotData.id;
    }
    
    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.classList.remove('show');
            this.activeTooltip = null;
        }
    }
    
    handleInquiry() {
        // Simulate inquiry process
        alert(`Thank you for your interest! We'll contact you about ${this.activeTooltip} shortly.`);
        this.hideTooltip();
    }
}

// Pricing Calculator
class PricingCalculator {
    constructor() {
        this.plotSize = 800;
        this.downPayment = 30;
        this.loanTerm = 15;
        this.interestRate = 8.5;
        
        this.init();
    }
    
    init() {
        this.setupInputs();
        this.calculate();
    }
    
    setupInputs() {
        // Plot size input
        const plotSizeInput = document.getElementById('plot-size');
        const plotSizeValue = document.getElementById('plot-size-value');
        
        if (plotSizeInput && plotSizeValue) {
            plotSizeInput.addEventListener('input', (e) => {
                this.plotSize = parseInt(e.target.value);
                plotSizeValue.textContent = `${this.plotSize}m²`;
                this.calculate();
            });
        }
        
        // Down payment input
        const downPaymentInput = document.getElementById('down-payment');
        const downPaymentValue = document.getElementById('down-payment-value');
        
        if (downPaymentInput && downPaymentValue) {
            downPaymentInput.addEventListener('input', (e) => {
                this.downPayment = parseInt(e.target.value);
                downPaymentValue.textContent = `${this.downPayment}%`;
                this.calculate();
            });
        }
        
        // Loan term input
        const loanTermInput = document.getElementById('loan-term');
        const loanTermValue = document.getElementById('loan-term-value');
        
        if (loanTermInput && loanTermValue) {
            loanTermInput.addEventListener('input', (e) => {
                this.loanTerm = parseInt(e.target.value);
                loanTermValue.textContent = `${this.loanTerm} years`;
                this.calculate();
            });
        }
    }
    
    calculate() {
        // Base price calculation (price per square meter)
        const basePricePerSqm = 150; // $150 per m²
        const totalPrice = this.plotSize * basePricePerSqm;
        
        // Down payment calculation
        const downPaymentAmount = (totalPrice * this.downPayment) / 100;
        const loanAmount = totalPrice - downPaymentAmount;
        
        // Monthly payment calculation
        const monthlyRate = this.interestRate / 100 / 12;
        const numberOfPayments = this.loanTerm * 12;
        const monthlyPayment = loanAmount * 
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        
        // ROI calculation (simplified)
        const expectedAppreciation = 0.12; // 12% annual appreciation
        const futureValue = totalPrice * Math.pow(1 + expectedAppreciation, 5); // 5 year projection
        const totalReturn = futureValue - totalPrice;
        const roiPercentage = (totalReturn / totalPrice) * 100;
        
        // Update display
        this.updateResults({
            totalPrice,
            downPaymentAmount,
            loanAmount,
            monthlyPayment,
            totalReturn,
            roiPercentage
        });
    }
    
    updateResults(results) {
        const elements = {
            'result-total-price': `$${results.totalPrice.toLocaleString()}`,
            'result-down-payment': `$${results.downPaymentAmount.toLocaleString()}`,
            'result-loan-amount': `$${results.loanAmount.toLocaleString()}`,
            'result-monthly-payment': `$${results.monthlyPayment.toLocaleString()}`,
            'result-roi': `${results.roiPercentage.toFixed(1)}%`,
            'result-total-return': `$${results.totalReturn.toLocaleString()}`
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
                
                // Add animation effect
                element.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }
}

// Development Progress Timeline
class DevelopmentTimeline {
    constructor() {
        this.milestones = [
            {
                phase: 'Planning & Permits',
                status: 'completed',
                progress: 100,
                date: 'Q1 2024',
                description: 'All permits secured, architectural plans finalized'
            },
            {
                phase: 'Infrastructure Development',
                status: 'active',
                progress: 75,
                date: 'Q2 2024',
                description: 'Roads, utilities, and basic infrastructure installation'
            },
            {
                phase: 'Plot Development',
                status: 'upcoming',
                progress: 0,
                date: 'Q3 2024',
                description: 'Individual plot preparation and landscaping'
            },
            {
                phase: 'Community Facilities',
                status: 'upcoming',
                progress: 0,
                date: 'Q4 2024',
                description: 'Club house, pool, and recreational facilities'
            },
            {
                phase: 'Final Handover',
                status: 'upcoming',
                progress: 0,
                date: 'Q1 2025',
                description: 'Project completion and plot handover to investors'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.updateTimeline();
        this.animateProgress();
    }
    
    updateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline__item');
        
        timelineItems.forEach((item, index) => {
            if (index < this.milestones.length) {
                const milestone = this.milestones[index];
                
                // Update status class
                item.className = `timeline__item ${milestone.status}`;
                
                // Update progress display
                const progressElement = item.querySelector('.marker__progress');
                if (progressElement) {
                    progressElement.textContent = `${milestone.progress}%`;
                }
                
                // Update progress bar
                const progressBar = item.querySelector('.progress__fill');
                if (progressBar) {
                    progressBar.style.width = `${milestone.progress}%`;
                }
                
                // Update content
                const titleElement = item.querySelector('.timeline__title');
                const dateElement = item.querySelector('.timeline__date');
                const descriptionElement = item.querySelector('.timeline__description');
                
                if (titleElement) titleElement.textContent = milestone.phase;
                if (dateElement) dateElement.textContent = milestone.date;
                if (descriptionElement) descriptionElement.textContent = milestone.description;
            }
        });
    }
    
    animateProgress() {
        const progressBars = document.querySelectorAll('.progress__fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
}

// Social Sharing
class SocialSharing {
    constructor() {
        this.shareData = {
            title: 'Casa de Casablanca - Premium Investment Opportunity',
            text: 'Discover this exclusive real estate investment opportunity in Morocco. High ROI, prime location, and luxury amenities.',
            url: window.location.href
        };
        
        this.init();
    }
    
    init() {
        this.setupShareButtons();
    }
    
    setupShareButtons() {
        // WhatsApp sharing
        const whatsappBtn = document.querySelector('.share__btn--whatsapp');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => this.shareToWhatsApp());
        }
        
        // Twitter sharing
        const twitterBtn = document.querySelector('.share__btn--twitter');
        if (twitterBtn) {
            twitterBtn.addEventListener('click', () => this.shareToTwitter());
        }
        
        // Facebook sharing
        const facebookBtn = document.querySelector('.share__btn--facebook');
        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => this.shareToFacebook());
        }
        
        // LinkedIn sharing
        const linkedinBtn = document.querySelector('.share__btn--linkedin');
        if (linkedinBtn) {
            linkedinBtn.addEventListener('click', () => this.shareToLinkedIn());
        }
        
        // Email sharing
        const emailBtn = document.querySelector('.share__btn--email');
        if (emailBtn) {
            emailBtn.addEventListener('click', () => this.shareViaEmail());
        }
        
        // Copy link
        const copyBtn = document.querySelector('.share__btn--copy');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyToClipboard());
        }
    }
    
    shareToWhatsApp() {
        const message = encodeURIComponent(`${this.shareData.text}\n\n${this.shareData.url}`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
    }
    
    shareToTwitter() {
        const text = encodeURIComponent(this.shareData.text);
        const url = encodeURIComponent(this.shareData.url);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
    
    shareToFacebook() {
        const url = encodeURIComponent(this.shareData.url);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
    
    shareToLinkedIn() {
        const url = encodeURIComponent(this.shareData.url);
        const title = encodeURIComponent(this.shareData.title);
        const text = encodeURIComponent(this.shareData.text);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${text}`, '_blank');
    }
    
    shareViaEmail() {
        const subject = encodeURIComponent(this.shareData.title);
        const body = encodeURIComponent(`${this.shareData.text}\n\nView details: ${this.shareData.url}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
    
    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.shareData.url);
            this.showCopyFeedback();
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = this.shareData.url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showCopyFeedback();
        }
    }
    
    showCopyFeedback() {
        const copyBtn = document.querySelector('.share__btn--copy');
        if (copyBtn) {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = 'var(--success)';
            copyBtn.style.color = 'white';
            copyBtn.style.borderColor = 'var(--success)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
                copyBtn.style.color = '';
                copyBtn.style.borderColor = '';
            }, 2000);
        }
    }
}

// Virtual Tour Handler
class VirtualTourHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTourLaunch();
        this.setupNavigation();
    }
    
    setupTourLaunch() {
        const launchBtn = document.querySelector('.tour__launch-btn');
        if (launchBtn) {
            launchBtn.addEventListener('click', () => this.launchVirtualTour());
        }
    }
    
    setupNavigation() {
        const navButtons = document.querySelectorAll('.tour__nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.navigateToRoom(btn.dataset.room);
            });
        });
    }
    
    launchVirtualTour() {
        // Simulate 360° tour launch
        const placeholder = document.querySelector('.tour__placeholder');
        if (placeholder) {
            placeholder.innerHTML = `
                <div class="tour__loading">
                    <i class="fas fa-spinner fa-spin tour__icon"></i>
                    <h3 class="tour__placeholder-title">Loading Virtual Tour...</h3>
                    <p class="tour__placeholder-text">Preparing immersive 360° experience</p>
                </div>
            `;
            
            // Simulate loading
            setTimeout(() => {
                placeholder.innerHTML = `
                    <div class="tour__active">
                        <iframe 
                            src="https://momento360.com/e/u/60bd7d1a5b9a47398b7c893b6c93b7d3?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium"
                            width="100%" 
                            height="400" 
                            frameborder="0" 
                            allowfullscreen>
                        </iframe>
                        <p style="margin-top: 1rem; color: rgba(255,255,255,0.8);">
                            Use mouse to navigate • Click and drag to explore
                        </p>
                    </div>
                `;
            }, 2000);
        }
    }
    
    navigateToRoom(roomId) {
        console.log(`Navigating to room: ${roomId}`);
        // In a real implementation, this would switch the 360° view
    }
}

// Initialize all showcase components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components with delay to ensure DOM is ready
    setTimeout(() => {
        new PropertyGallery();
        new InteractiveSitePlan();
        new PricingCalculator();
        new DevelopmentTimeline();
        new SocialSharing();
        new VirtualTourHandler();
        new AdvancedInvestmentCalculator();
    }, 100);
});

// ===== ADVANCED INVESTMENT CALCULATOR =====

class AdvancedInvestmentCalculator {
    constructor() {
        this.plotSize = 800;
        this.investmentAmount = 120000;
        this.downPayment = 30;
        this.investmentPeriod = 5;
        this.paymentPlan = 'lump-sum';
        this.chart = null;
        
        // Lekki area growth rates based on market trends
        this.growthRates = {
            conservative: 0.08,  // 8% annual growth
            realistic: 0.12,     // 12% annual growth (based on Lekki trends)
            optimistic: 0.15     // 15% annual growth
        };
        
        this.basePricePerSqm = 150; // $150 per square meter
        
        this.init();
    }
    
    init() {
        this.setupInputs();
        this.setupPaymentPlans();
        this.setupActionButtons();
        this.setupEmailModal();
        this.calculate();
        this.initChart();
        this.generatePaymentSchedule();
    }
    
    setupInputs() {
        // Plot size slider
        const plotSizeInput = document.getElementById('calc-plot-size');
        const plotSizeValue = document.getElementById('calc-plot-size-value');
        const plotPrice = document.getElementById('calc-plot-price');
        
        if (plotSizeInput && plotSizeValue && plotPrice) {
            plotSizeInput.addEventListener('input', (e) => {
                this.plotSize = parseInt(e.target.value);
                this.investmentAmount = this.plotSize * this.basePricePerSqm;
                
                plotSizeValue.textContent = `${this.plotSize}m²`;
                plotPrice.textContent = `$${this.investmentAmount.toLocaleString()}`;
                
                // Update investment amount slider
                const investmentInput = document.getElementById('calc-investment');
                if (investmentInput) {
                    investmentInput.value = this.investmentAmount;
                    document.getElementById('calc-investment-value').textContent = `$${this.investmentAmount.toLocaleString()}`;
                }
                
                this.calculate();
                this.updateChart();
                this.generatePaymentSchedule();
            });
        }
        
        // Investment amount slider
        const investmentInput = document.getElementById('calc-investment');
        const investmentValue = document.getElementById('calc-investment-value');
        
        if (investmentInput && investmentValue) {
            investmentInput.addEventListener('input', (e) => {
                this.investmentAmount = parseInt(e.target.value);
                investmentValue.textContent = `$${this.investmentAmount.toLocaleString()}`;
                
                // Update plot size accordingly
                this.plotSize = Math.round(this.investmentAmount / this.basePricePerSqm);
                const plotSizeInput = document.getElementById('calc-plot-size');
                if (plotSizeInput) {
                    plotSizeInput.value = this.plotSize;
                    document.getElementById('calc-plot-size-value').textContent = `${this.plotSize}m²`;
                    document.getElementById('calc-plot-price').textContent = `$${this.investmentAmount.toLocaleString()}`;
                }
                
                this.calculate();
                this.updateChart();
                this.generatePaymentSchedule();
            });
        }
        
        // Down payment slider
        const downPaymentInput = document.getElementById('calc-down-payment');
        const downPaymentValue = document.getElementById('calc-down-payment-value');
        const downPaymentAmount = document.getElementById('calc-down-payment-amount');
        
        if (downPaymentInput && downPaymentValue && downPaymentAmount) {
            downPaymentInput.addEventListener('input', (e) => {
                this.downPayment = parseInt(e.target.value);
                const amount = ( this.investmentAmount * this.downPayment) / 100;
                
                downPaymentValue.textContent = `${this.downPayment}%`;
                downPaymentAmount.textContent = `$${amount.toLocaleString()}`;
                
                this.calculate();
                this.generatePaymentSchedule();
            });
        }
        
        // Investment period slider
        const periodInput = document.getElementById('calc-period');
        const periodValue = document.getElementById('calc-period-value');
        
        if (periodInput && periodValue) {
            periodInput.addEventListener('input', (e) => {
                this.investmentPeriod = parseInt(e.target.value);
                periodValue.textContent = `${this.investmentPeriod} years`;
                
                this.calculate();
                this.updateChart();
            });
        }
    }
    
    setupPaymentPlans() {
        const paymentPlanInputs = document.querySelectorAll('input[name="payment-plan"]');
        
        paymentPlanInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.paymentPlan = e.target.value;
                this.calculate();
                this.generatePaymentSchedule();
            });
        });
    }
    
    setupActionButtons() {
        // Download PDF summary
        const downloadBtn = document.getElementById('download-summary');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadPDF());
        }
        
        // Email projections
        const emailBtn = document.getElementById('email-projections');
        if (emailBtn) {
            emailBtn.addEventListener('click', () => this.showEmailModal());
        }
        
        // Schedule consultation
        const consultationBtn = document.getElementById('schedule-consultation');
        if (consultationBtn) {
            consultationBtn.addEventListener('click', () => this.scheduleConsultation());
        }
    }
    
    setupEmailModal() {
        const modal = document.getElementById('email-modal');
        const closeBtn = document.getElementById('modal-close');
        const form = document.getElementById('email-projection-form');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideEmailModal());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal.querySelector('.modal__overlay')) {
                    this.hideEmailModal();
                }
            });
        }
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitEmailForm();
            });
        }
    }
    
    calculate() {
        // Apply payment plan discount
        let finalInvestmentAmount = this.investmentAmount;
        
        switch(this.paymentPlan) {
            case 'lump-sum':
                finalInvestmentAmount = this.investmentAmount * 0.95; // 5% discount
                break;
            case 'installment-6':
                // No change
                break;
            case 'installment-12':
                finalInvestmentAmount = this.investmentAmount * 1.02; // 2% interest
                break;
            case 'mortgage':
                // Will be handled in payment schedule
                break;
        }
        
        // Calculate future value using realistic growth rate (12%)
        const futureValue = finalInvestmentAmount * Math.pow(1 + this.growthRates.realistic, this.investmentPeriod);
        const totalReturn = futureValue - finalInvestmentAmount;
        const totalROI = (totalReturn / finalInvestmentAmount) * 100;
        const annualROI = Math.pow(futureValue / finalInvestmentAmount, 1/this.investmentPeriod) - 1;
        
        // Update display
        this.updateResults({
            currentValue: finalInvestmentAmount,
            futureValue: futureValue,
            totalROI: totalROI,
            annualROI: annualROI * 100
        });
    }
    
    updateResults(results) {
        const elements = {
            'calc-current-value': `$${results.currentValue.toLocaleString()}`,
            'calc-future-value': `$${results.futureValue.toLocaleString()}`,
            'calc-total-roi': `${results.totalROI.toFixed(1)}%`,
            'calc-annual-roi': `${results.annualROI.toFixed(1)}%`,
            'comparison-roi': `${results.annualROI.toFixed(1)}%`
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
                
                // Add animation effect
                element.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        });
        
        // Update comparison bar width
        const comparisonBar = document.querySelector('.comparison-item--highlight .bar__fill');
        if (comparisonBar) {
            const percentage = Math.min((results.annualROI / 15) * 100, 100);
            comparisonBar.style.width = `${percentage}%`;
        }
    }
    
    initChart() {
        const canvas = document.getElementById('appreciation-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        this.drawChart(ctx, canvas.width, canvas.height);
    }
    
    updateChart() {
        const canvas = document.getElementById('appreciation-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawChart(ctx, canvas.width, canvas.height);
    }
    
    drawChart(ctx, width, height) {
        const padding = 40;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        // Calculate data points
        const years = [];
        const conservativeData = [];
        const realisticData = [];
        const optimisticData = [];
        
        for (let i = 0; i <= this.investmentPeriod; i++) {
            years.push(i);
            conservativeData.push(this.investmentAmount * Math.pow(1 + this.growthRates.conservative, i));
            realisticData.push(this.investmentAmount * Math.pow(1 + this.growthRates.realistic, i));
            optimisticData.push(this.investmentAmount * Math.pow(1 + this.growthRates.optimistic, i));
        }
        
        const maxValue = Math.max(...optimisticData);
        const minValue = Math.min(...conservativeData);
        
        // Draw axes
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw grid lines
        ctx.strokeStyle = '#F3F4F6';
        ctx.lineWidth = 0.5;
        
        for (let i = 1; i <= this.investmentPeriod; i++) {
            const x = padding + (i / this.investmentPeriod) * chartWidth;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
        }
        
        // Draw data lines
        this.drawLine(ctx, years, conservativeData, '#10B981', padding, chartWidth, chartHeight, maxValue, minValue);
        this.drawLine(ctx, years, realisticData, '#3B82F6', padding, chartWidth, chartHeight, maxValue, minValue);
        this.drawLine(ctx, years, optimisticData, '#8B5CF6', padding, chartWidth, chartHeight, maxValue, minValue);
        
        // Draw labels
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        
        // X-axis labels
        for (let i = 0; i <= this.investmentPeriod; i++) {
            const x = padding + (i / this.investmentPeriod) * chartWidth;
            ctx.fillText(`Year ${i}`, x, height - padding + 20);
        }
        
        // Y-axis labels
        ctx.textAlign = 'right';
        for (let i = 0; i <= 4; i++) {
            const value = minValue + (maxValue - minValue) * (i / 4);
            const y = height - padding - (i / 4) * chartHeight;
            ctx.fillText(`$${(value / 1000).toFixed(0)}K`, padding - 10, y + 4);
        }
    }
    
    drawLine(ctx, years, data, color, padding, chartWidth, chartHeight, maxValue, minValue) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = padding + (i / (data.length - 1)) * chartWidth;
            const y = (chartHeight + padding) - ((data[i] - minValue) / (maxValue - minValue)) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = color;
        for (let i = 0; i < data.length; i++) {
            const x = padding + (i / (data.length - 1)) * chartWidth;
            const y = (chartHeight + padding) - ((data[i] - minValue) / (maxValue - minValue)) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    
    generatePaymentSchedule() {
        const scheduleBody = document.getElementById('schedule-body');
        if (!scheduleBody) return;
        
        scheduleBody.innerHTML = '';
        
        const downPaymentAmount = (this.investmentAmount * this.downPayment) / 100;
        const remainingAmount = this.investmentAmount - downPaymentAmount;
        
        let payments = [];
        
        switch(this.paymentPlan) {
            case 'lump-sum':
                payments = [{
                    payment: 1,
                    amount: this.investmentAmount * 0.95, // 5% discount
                    date: 'Immediate',
                    balance: 0
                }];
                break;
                
            case 'installment-6':
                const monthlyAmount6 = this.investmentAmount / 6;
                for (let i = 1; i <= 6; i++) {
                    payments.push({
                        payment: i,
                        amount: monthlyAmount6,
                        date: `Month ${i}`,
                        balance: this.investmentAmount - (monthlyAmount6 * i)
                    });
                }
                break;
                
            case 'installment-12':
                const monthlyAmount12 = (this.investmentAmount * 1.02) / 12; // 2% annual interest
                const totalAmount = this.investmentAmount * 1.02;
                for (let i = 1; i <= 12; i++) {
                    payments.push({
                        payment: i,
                        amount: monthlyAmount12,
                        date: `Month ${i}`,
                        balance: totalAmount - (monthlyAmount12 * i)
                    });
                }
                break;
                
            case 'mortgage':
                // Add down payment first
                payments.push({
                    payment: 'Down Payment',
                    amount: downPaymentAmount,
                    date: 'Immediate',
                    balance: remainingAmount
                });
                
                // Calculate 15-year mortgage payments
                const monthlyRate = 0.085 / 12; // 8.5% annual rate
                const numberOfPayments = 15 * 12;
                const monthlyPayment = remainingAmount * 
                    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                
                // Show first 6 months of payments
                let balance = remainingAmount;
                for (let i = 1; i <= 6; i++) {
                    const interestPayment = balance * monthlyRate;
                    const principalPayment = monthlyPayment - interestPayment;
                    balance -= principalPayment;
                    
                    payments.push({
                        payment: `Month ${i}`,
                        amount: monthlyPayment,
                        date: new Date(Date.now() + (i * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
                        balance: balance
                    });
                }
                break;
        }
        
        payments.forEach(payment => {
            const row = document.createElement('div');
            row.className = 'schedule-row';
            row.innerHTML = `
                <div class="schedule-cell schedule-cell--payment">${payment.payment}</div>
                <div class="schedule-cell schedule-cell--amount">$${payment.amount.toLocaleString()}</div>
                <div class="schedule-cell">${payment.date}</div>
                <div class="schedule-cell schedule-cell--balance">$${payment.balance.toLocaleString()}</div>
            `;
            scheduleBody.appendChild(row);
        });
    }
    
    downloadPDF() {
        // In a real implementation, this would generate a PDF using libraries like jsPDF
        // For now, we'll simulate the process
        
        const btn = document.getElementById('download-summary');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        btn.disabled = true;
        
        // Simulate PDF generation
        setTimeout(() => {
            // Create a detailed investment summary object
            const summary = {
                plotSize: this.plotSize,
                investmentAmount: this.investmentAmount,
                downPayment: this.downPayment,
                investmentPeriod: this.investmentPeriod,
                paymentPlan: this.paymentPlan,
                projectedValue: this.investmentAmount * Math.pow(1 + this.growthRates.realistic, this.investmentPeriod),
                expectedROI: ((Math.pow(1 + this.growthRates.realistic, this.investmentPeriod) - 1) * 100).toFixed(1),
                generatedDate: new Date().toLocaleDateString()
            };
            
            // In a real app, you would generate and download the actual PDF here
            alert(`Investment Summary Generated!\n\nPlot Size: ${summary.plotSize}m²\nInvestment: $${summary.investmentAmount.toLocaleString()}\nProjected Value: $${summary.projectedValue.toLocaleString()}\nExpected ROI: ${summary.expectedROI}%\n\nIn a production environment, this would download a comprehensive PDF report.`);
            
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }
    
    showEmailModal() {
        const modal = document.getElementById('email-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    hideEmailModal() {
        const modal = document.getElementById('email-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    submitEmailForm() {
        const form = document.getElementById('email-projection-form');
        const submitBtn = form.querySelector('.modal__submit');
        const originalText = submitBtn.innerHTML;
        
        // Get form data
        const formData = {
            name: document.getElementById('email-name').value,
            email: document.getElementById('email-address').value,
            phone: document.getElementById('email-phone').value,
            budget: document.getElementById('investment-budget').value,
            updates: document.getElementById('email-updates').checked,
            calculatorData: {
                plotSize: this.plotSize,
                investmentAmount: this.investmentAmount,
                downPayment: this.downPayment,
                investmentPeriod: this.investmentPeriod,
                paymentPlan: this.paymentPlan
            }
        };
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate email sending
        setTimeout(() => {
            alert(`Thank you, ${formData.name}! Your detailed investment projections have been sent to ${formData.email}. Our investment team will contact you within 24 hours.`);
            
            // Reset form and close modal
            form.reset();
            this.hideEmailModal();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    scheduleConsultation() {
        // In a real implementation, this would integrate with a booking system
        alert('Redirecting to consultation booking system...\n\nYou would be taken to a calendar system where you can book a free consultation with our investment experts.');
    }
}

/*===== EXPORT FOR TESTING =====*/
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateROI,
        formatCurrency,
        validateForm,
        showNotification,
        startCountdown,
        PropertyGallery,
        InteractiveSitePlan,
        PricingCalculator,
        DevelopmentTimeline,
        SocialSharing,
        VirtualTourHandler,
        AdvancedInvestmentCalculator,
        InteractiveLocationAdvantages
    };
}

/*===== INTERACTIVE LOCATION ADVANTAGES =====*/
class InteractiveLocationAdvantages {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.startAnimations();
        this.initializeTimeline();
        this.initializeStatistics();
        this.initializeTransformation();
        this.setupMapInteractions();
    }

    initializeElements() {
        this.mapContainer = document.querySelector('.interactive-map');
        this.mapButtons = document.querySelectorAll('.map-btn');
        this.distanceItems = document.querySelectorAll('.distance-item');
        this.timelineContainer = document.querySelector('.infrastructure-timeline');
        this.milestones = document.querySelectorAll('.milestone');
        this.statisticsContainer = document.querySelector('.growth-statistics');
        this.statCards = document.querySelectorAll('.stat-card');
        this.transformationContainer = document.querySelector('.transformation-showcase');
        this.transformButtons = document.querySelectorAll('.transform-btn');
        this.transformSlides = document.querySelectorAll('.transformation__slide');
        
        // Map layers and pins
        this.infrastructurePins = document.querySelectorAll('.infrastructure-pin');
        this.amenityPins = document.querySelectorAll('.amenity-pin');
        this.distanceLines = document.querySelectorAll('.distance-line');
        
        this.currentMapView = 'infrastructure';
        this.currentTransformationSlide = 0;
        this.animationTimers = [];
    }

    setupEventListeners() {
        // Map button controls
        this.mapButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMapView(e.target.dataset.view);
            });
        });

        // Distance item interactions
        this.distanceItems.forEach(item => {
            item.addEventListener('click', () => {
                this.highlightLocation(item.dataset.location);
            });
        });

        // Transformation controls
        this.transformButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.switchTransformationSlide(index);
            });
        });

        // Infrastructure pin interactions
        this.infrastructurePins.forEach(pin => {
            pin.addEventListener('click', () => {
                this.showLocationDetails(pin.dataset.location);
            });
        });

        // Amenity pin interactions
        this.amenityPins.forEach(pin => {
            pin.addEventListener('mouseenter', () => {
                this.highlightAmenity(pin);
            });
            
            pin.addEventListener('mouseleave', () => {
                this.unhighlightAmenity(pin);
            });
        });

        // Timeline milestone interactions
        this.milestones.forEach(milestone => {
            milestone.addEventListener('click', () => {
                this.showMilestoneDetails(milestone.dataset.year);
            });
        });
    }

    setupMapInteractions() {
        // Animate distance lines
        this.animateDistanceLines();
        
        // Setup infrastructure proximity indicators
        this.setupProximityIndicators();
        
        // Initialize map tooltips
        this.initializeMapTooltips();
    }

    switchMapView(view) {
        this.currentMapView = view;
        
        // Update button states
        this.mapButtons.forEach(btn => {
            btn.classList.toggle('map-btn--active', btn.dataset.view === view);
        });

        // Show/hide relevant map elements
        this.updateMapVisibility(view);
        
        // Update distance display
        this.updateDistanceDisplay(view);
    }

    updateMapVisibility(view) {
        const svg = document.querySelector('.location-svg');
        if (!svg) return;

        // Hide all groups first
        const allGroups = svg.querySelectorAll('g[id]');
        allGroups.forEach(group => {
            group.style.opacity = '0.3';
        });

        // Show relevant groups based on view
        const relevantGroups = this.getRelevantGroups(view);
        relevantGroups.forEach(groupId => {
            const group = svg.querySelector(`#${groupId}`);
            if (group) {
                group.style.opacity = '1';
                group.style.transition = 'opacity 0.5s ease';
            }
        });

        // Animate view transition
        this.animateViewTransition(view);
    }

    getRelevantGroups(view) {
        const groups = {
            infrastructure: ['infrastructure-pins', 'major-roads', 'distance-lines'],
            amenities: ['amenity-pins', 'local-roads'],
            transport: ['infrastructure-pins', 'major-roads', 'railway'],
            development: ['development-areas', 'future-projects']
        };
        
        return groups[view] || ['infrastructure-pins'];
    }

    animateViewTransition(view) {
        const container = document.querySelector('.map__canvas');
        if (!container) return;

        container.style.transform = 'scale(0.95)';
        container.style.opacity = '0.8';
        
        setTimeout(() => {
            container.style.transform = 'scale(1)';
            container.style.opacity = '1';
            container.style.transition = 'all 0.3s ease';
        }, 150);
    }

    updateDistanceDisplay(view) {
        this.distanceItems.forEach(item => {
            const shouldShow = this.shouldShowDistance(item.dataset.location, view);
            item.style.display = shouldShow ? 'flex' : 'none';
        });
    }

    shouldShowDistance(location, view) {
        const locationViewMap = {
            'dangote-refinery': ['infrastructure', 'transport'],
            'lekki-airport': ['infrastructure', 'transport'],
            'deep-sea-port': ['infrastructure', 'transport'],
            'shopping-mall': ['amenities'],
            'hospital': ['amenities'],
            'school': ['amenities']
        };
        
        return locationViewMap[location]?.includes(view) || false;
    }

    highlightLocation(location) {
        // Remove previous highlights
        this.distanceItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Add highlight to selected location
        const targetItem = document.querySelector(`[data-location="${location}"]`);
        if (targetItem) {
            targetItem.classList.add('active');
        }

        // Highlight corresponding map pin
        this.highlightMapPin(location);
        
        // Show distance line animation
        this.animateDistanceLine(location);
    }

    highlightMapPin(location) {
        const svg = document.querySelector('.location-svg');
        if (!svg) return;

        // Reset all pins
        svg.querySelectorAll('.location-pin').forEach(pin => {
            pin.style.transform = 'scale(1)';
            pin.style.filter = 'none';
        });

        // Highlight target pin
        const targetPin = svg.querySelector(`[data-location="${location}"]`);
        if (targetPin) {
            targetPin.style.transform = 'scale(1.2)';
            targetPin.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';
            targetPin.style.transition = 'all 0.3s ease';
        }
    }

    animateDistanceLine(location) {
        const svg = document.querySelector('.location-svg');
        if (!svg) return;

        const distanceLine = svg.querySelector(`[data-line="${location}"]`);
        if (distanceLine) {
            distanceLine.style.strokeDasharray = '10,5';
            distanceLine.style.strokeDashoffset = '0';
            distanceLine.style.animation = 'dash-flow 1s ease-in-out';
        }
    }

    showLocationDetails(location) {
        const details = this.getLocationDetails(location);
        this.createLocationTooltip(details);
    }

    getLocationDetails(location) {
        const details = {
            'dangote-refinery': {
                name: 'Dangote Refinery',
                distance: '12km',
                description: 'Africa\'s largest oil refinery and petrochemical complex',
                impact: 'Major economic hub driving regional growth',
                benefits: ['Job creation', 'Infrastructure development', 'Property value appreciation']
            },
            'lekki-airport': {
                name: 'Lekki International Airport',
                distance: '15km',
                description: 'Modern international airport serving Lagos East',
                impact: 'Enhanced connectivity and accessibility',
                benefits: ['International flights', 'Business opportunities', 'Tourism growth']
            },
            'deep-sea-port': {
                name: 'Lekki Deep Sea Port',
                distance: '8km',
                description: 'West Africa\'s deepest seaport',
                impact: 'Maritime trade and logistics hub',
                benefits: ['Trade opportunities', 'Economic growth', 'Employment']
            }
        };
        
        return details[location] || {};
    }

    createLocationTooltip(details) {
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.location-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        // Create new tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'location-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip__header">
                <h4 class="tooltip__title">${details.name}</h4>
                <span class="tooltip__distance">${details.distance}</span>
            </div>
            <p class="tooltip__description">${details.description}</p>
            <div class="tooltip__impact">
                <strong>Impact:</strong> ${details.impact}
            </div>
            <div class="tooltip__benefits">
                <strong>Benefits:</strong>
                <ul>
                    ${details.benefits?.map(benefit => `<li>${benefit}</li>`).join('') || ''}
                </ul>
            </div>
            <button class="tooltip__close">&times;</button>
        `;

        // Add styles
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 400px;
            z-index: 1000;
            border: 1px solid #e5e7eb;
        `;

        document.body.appendChild(tooltip);

        // Close button functionality
        tooltip.querySelector('.tooltip__close').addEventListener('click', () => {
            tooltip.remove();
        });

        // Close on backdrop click
        setTimeout(() => {
            const handleOutsideClick = (e) => {
                if (!tooltip.contains(e.target)) {
                    tooltip.remove();
                    document.removeEventListener('click', handleOutsideClick);
                }
            };
            document.addEventListener('click', handleOutsideClick);
        }, 100);
    }

    initializeTimeline() {
        this.observeMilestones();
        this.setupTimelineProgress();
    }

    observeMilestones() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateMilestones();
                }
            });
        }, { threshold: 0.3 });

        const milestonesContainer = document.querySelector('.company-milestones');
        if (milestonesContainer) {
            observer.observe(milestonesContainer);
        }
    }

    setupTimelineProgress() {
        const currentYear = new Date().getFullYear();
        const timelineData = [
            { year: 2019, status: 'completed' },
            { year: 2021, status: 'completed' },
            { year: 2023, status: currentYear >= 2023 ? 'active' : 'upcoming' },
            { year: 2027, status: 'upcoming' }
        ];

        timelineData.forEach((data, index) => {
            const milestone = this.milestones[index];
            if (milestone) {
                milestone.classList.add(`milestone--${data.status}`);
                milestone.dataset.year = data.year;
            }
        });
    }

    animateMilestones() {
        // Animate timeline progress
        const timelineProgress = this.timelineTrack?.querySelector('::after');
        
        // Animate milestones sequentially
        this.milestoneItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.transition = 'all 0.6s ease';
                
                // Add entrance animation class
                item.classList.add('fade-in-trust');
                
                // Special animation for current milestone
                const dot = item.querySelector('.milestone__dot--current');
                if (dot) {
                    setTimeout(() => {
                        dot.style.animation = 'pulse 2s infinite';
                    }, 300);
                }
            }, index * 200);
        });
    }

    setupCertificationsAnimation() {
        this.observeCertifications();
    }

    observeCertifications() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCertifications();
                }
            });
        }, { threshold: 0.2 });

        const certificationsContainer = document.querySelector('.certifications');
        if (certificationsContainer) {
            observer.observe(certificationsContainer);
        }
    }

    animateCertifications() {
        const certificationItems = document.querySelectorAll('.certification__item');
        
        certificationItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
                item.style.transition = 'all 0.5s ease-out';
                
                // Add hover enhancement
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateY(-5px) scale(1.02)';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateY(0) scale(1)';
                });
            }, index * 150);
        });
    }

    setupTeamInteractions() {
        this.teamMembers.forEach(member => {
            this.enhanceTeamMember(member);
        });
    }

    enhanceTeamMember(member) {
        const photo = member.querySelector('.member__photo');
        const overlay = member.querySelector('.member__overlay');
        const socialLinks = member.querySelectorAll('.social__link');

        // Enhanced hover effects
        member.addEventListener('mouseenter', () => {
            photo.style.transform = 'scale(1.05)';
            overlay.style.opacity = '1';
        });

        member.addEventListener('mouseleave', () => {
            photo.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        });

        // Social link interactions
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSocialLinkClick(link);
            });
        });

        // Add intersection observer for entrance animation
        this.observeTeamMember(member);
    }

    observeTeamMember(member) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('fade-in-trust');
                }
            });
        }, { threshold: 0.3 });

        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'all 0.6s ease-out';
        observer.observe(member);
    }

    handleSocialLinkClick(link) {
        const icon = link.querySelector('i');
        if (icon.classList.contains('fa-linkedin-in')) {
            this.showContactModal('LinkedIn', 'Professional networking profile');
        } else if (icon.classList.contains('fa-twitter')) {
            this.showContactModal('Twitter', 'Follow for industry insights');
        } else if (icon.classList.contains('fa-envelope')) {
            this.showContactModal('Email', 'Direct professional contact');
        }
    }

    showContactModal(platform, description) {
        // Create and show contact modal
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="modal__overlay"></div>
            <div class="modal__container">
                <div class="modal__header">
                    <h3>Contact via ${platform}</h3>
                    <button class="modal__close">&times;</button>
                </div>
                <div class="modal__body">
                    <p>${description}</p>
                    <p>This feature will be available soon. Please use our main contact form for inquiries.</p>
                </div>
            </div>
        `;

        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        document.body.appendChild(modal);

        // Close functionality
        modal.querySelector('.modal__close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    setupGalleryAnimations() {
        this.galleryItems.forEach(item => {
            this.enhanceGalleryItem(item);
        });
    }

    enhanceGalleryItem(item) {
        const image = item.querySelector('img');
        const overlay = item.querySelector('.gallery__overlay');

        // Add loading state
        image.addEventListener('load', () => {
            item.classList.add('loaded');
        });

        // Enhanced hover interactions
        item.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)';
            overlay.style.transform = 'translateY(0)';
        });

        item.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
            overlay.style.transform = 'translateY(100%)';
        });

        // Click to view larger image
        item.addEventListener('click', () => {
            this.openProjectLightbox(item);
        });

        // Intersection observer for entrance animation
        this.observeGalleryItem(item);
    }

    observeGalleryItem(item) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('fade-in-trust');
                }
            });
        }, { threshold: 0.2 });

        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.95)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    }

    openProjectLightbox(item) {
        const projectName = item.querySelector('.gallery__project-name')?.textContent || 'Project';
        const projectDetails = item.querySelector('.gallery__project-details')?.textContent || '';
        const imageSrc = item.querySelector('img')?.src || '';

        const lightbox = document.createElement('div');
        lightbox.className = 'project-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox__overlay"></div>
            <div class="lightbox__container">
                <button class="lightbox__close">&times;</button>
                <div class="lightbox__content">
                    <img src="${imageSrc}" alt="${projectName}" class="lightbox__image">
                    <div class="lightbox__info">
                        <h3 class="lightbox__title">${projectName}</h3>
                        <p class="lightbox__details">${projectDetails}</p>
                        <div class="lightbox__actions">
                            <button class="btn btn--primary">View Project Details</button>
                            <button class="btn btn--secondary">Contact Sales Team</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(lightbox);

        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);

        // Close functionality
        lightbox.querySelector('.lightbox__close').addEventListener('click', () => {
            this.closeLightbox(lightbox);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox(lightbox);
            }
        });
    }

    closeLightbox(lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    }

    setupMediaCoverage() {
        this.mediaItems.forEach(item => {
            this.enhanceMediaItem(item);
        });
    }

    enhanceMediaItem(item) {
        // Add click to read functionality
        const readLink = item.querySelector('.media__link');
        if (readLink) {
            readLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showMediaModal(item);
            });
        }

        // Hover effects
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });

        // Intersection observer
        this.observeMediaItem(item);
    }

    observeMediaItem(item) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.classList.add('fade-in-trust');
                }
            });
        }, { threshold: 0.2 });

        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    }

    showMediaModal(item) {
        const headline = item.querySelector('.media__headline')?.textContent || 'Article';
        const excerpt = item.querySelector('.media__excerpt')?.textContent || '';
        const date = item.querySelector('.media__date')?.textContent || '';

        const modal = document.createElement('div');
        modal.className = 'media-modal';
        modal.innerHTML = `
            <div class="modal__overlay"></div>
            <div class="modal__container">
                <div class="modal__header">
                    <h3>${headline}</h3>
                    <button class="modal__close">&times;</button>
                </div>
                <div class="modal__body">
                    <p class="modal__date">${date}</p>
                    <p>${excerpt}</p>
                    <p><strong>Full Article:</strong> This feature will redirect to the original publication. Coming soon!</p>
                    <div class="modal__actions">
                        <button class="btn btn--primary">Subscribe to Updates</button>
                        <button class="btn btn--secondary">Share Article</button>
                    </div>
                </div>
            </div>
        `;

        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        document.body.appendChild(modal);

        modal.querySelector('.modal__close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    setupTrustIndicators() {
        this.trustIndicators.forEach(indicator => {
            this.enhanceTrustIndicator(indicator);
        });
    }

    enhanceTrustIndicator(indicator) {
        // Add pulse animation to badges
        const badge = indicator.querySelector('.indicator__badge');
        if (badge) {
            setInterval(() => {
                badge.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    badge.style.transform = 'scale(1)';
                }, 200);
            }, 3000);
        }

        // Click for more details
        indicator.addEventListener('click', () => {
            this.showTrustDetails(indicator);
        });

        // Intersection observer
        this.observeTrustIndicator(indicator);
    }

    observeTrustIndicator(indicator) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('fade-in-trust');
                }
            });
        }, { threshold: 0.3 });

        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(20px) scale(0.9)';
        indicator.style.transition = 'all 0.5s ease-out';
        observer.observe(indicator);
    }

    showTrustDetails(indicator) {
        const title = indicator.querySelector('.indicator__title')?.textContent || 'Security Feature';
        const description = indicator.querySelector('.indicator__desc')?.textContent || '';

        console.log(`Trust Detail: ${title} - ${description}`);
        // Implementation for detailed trust information modal
    }

    setupAssociationsTooltips() {
        this.associationLogos.forEach(logo => {
            this.enhanceAssociationLogo(logo);
        });
    }

    enhanceAssociationLogo(logo) {
        const tooltip = logo.querySelector('.logo__tooltip');
        
        logo.addEventListener('mouseenter', () => {
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
            }
        });

        logo.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            }
        });

        // Click for association details
        logo.addEventListener('click', () => {
            this.showAssociationDetails(logo);
        });

        // Intersection observer
        this.observeAssociationLogo(logo);
    }

    observeAssociationLogo(logo) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Stagger the animations
                    const index = Array.from(this.associationLogos).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-trust');
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });

        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px) scale(0.9)';
        logo.style.transition = 'all 0.5s ease-out';
        observer.observe(logo);
    }

    showAssociationDetails(logo) {
        const tooltipText = logo.querySelector('.logo__tooltip')?.textContent || 'Professional Association';
        
        console.log(`Association: ${tooltipText}`);
        // Implementation for association details modal
    }

    observeAnimations() {
        // Global intersection observer for all trust elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px 0px'
        });

        // Observe all major trust sections
        const sections = document.querySelectorAll('.testimonials, .company-milestones, .certifications, .team-section, .completion-gallery, .media-coverage, .trust-indicators, .associations');
        sections.forEach(section => observer.observe(section));
    }

    // Cleanup method
    destroy() {
        // Clear testimonial timer
        clearInterval(this.testimonialTimer);
        
        // Clear any other timers
        this.animationTimers.forEach(timer => clearInterval(timer));
        
        // Remove any modals
        const modals = document.querySelectorAll('.contact-modal, .project-lightbox, .media-modal');
        modals.forEach(modal => modal.remove());
    }
}
