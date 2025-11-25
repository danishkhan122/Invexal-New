// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card, .metric-card, .testimonial-card, .case-study-card, .advantage-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.metric-card, .service-card, .testimonial-card, .case-study-card, .advantage-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Testimonial card animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        // Add alternating slide directions
        if (index % 2 === 0) {
            card.classList.add('slide-in-left');
        } else {
            card.classList.add('slide-in-right');
        }
        
        // Animate cards on scroll
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100); // Stagger animation
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });

    // Dismiss functionality for testimonial cards
    const dismissIcons = document.querySelectorAll('.dismiss-icon');
    
    dismissIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const card = this.closest('.testimonial-card');
            card.style.transform = 'translateX(-100%)';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.form-submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Team card flip functionality
    window.flipCard = function(card) {
        card.classList.toggle('flipped');
    };

    // Animated numbers functionality
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.metric-number[data-target]');
        
        numberElements.forEach((element, index) => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            // Add a slight delay for each element to create a staggered effect
            setTimeout(() => {
                element.classList.add('animating');
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                        // Add final animation effect
                        element.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            element.style.transform = 'scale(1)';
                            element.classList.remove('animating');
                        }, 200);
                    }
                    
                    // Add + or % based on the target
                    if (target === 100) {
                        element.textContent = Math.floor(current) + '%';
                    } else {
                        element.textContent = Math.floor(current) + '+';
                    }
                }, 16);
            }, index * 200); // Stagger each animation by 200ms
        });
    }

    // Intersection Observer for animated numbers
    const numbersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                numbersObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    // Observe the results section
    const resultsSection = document.querySelector('.results-section');
    const keyMetricsSection = document.querySelector('.key-metrics-section');
    
    if (resultsSection) {
        numbersObserver.observe(resultsSection);
    }
    
    if (keyMetricsSection) {
        numbersObserver.observe(keyMetricsSection);
    }

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // FAQ search functionality
    const faqSearch = document.getElementById('faq-search');
    if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3, .faq-question h4').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // FAQ category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide categories
            faqCategories.forEach(cat => {
                if (category === 'all' || cat.getAttribute('data-category') === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });

    // Pricing toggle functionality
    const billingToggle = document.getElementById('billing-toggle');
    const priceAmounts = document.querySelectorAll('.price-amount');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', (e) => {
            const isAnnual = e.target.checked;
            
            priceAmounts.forEach(amount => {
                const monthlyPrice = amount.getAttribute('data-monthly');
                const annualPrice = amount.getAttribute('data-annual');
                
                if (isAnnual) {
                    amount.textContent = annualPrice;
                } else {
                    amount.textContent = monthlyPrice;
                }
            });
        });
    }

    // ROI Calculator functionality
    const roiInputs = document.querySelectorAll('#employees, #current-efficiency, #hourly-rate');
    const savingsAmount = document.getElementById('savings-amount');
    const efficiencyGain = document.getElementById('efficiency-gain');
    const roiTimeline = document.getElementById('roi-timeline');
    
    function calculateROI() {
        const employees = parseInt(document.getElementById('employees').value) || 0;
        const currentEfficiency = parseInt(document.getElementById('current-efficiency').value) || 0;
        const hourlyRate = parseInt(document.getElementById('hourly-rate').value) || 0;
        
        if (employees > 0 && currentEfficiency > 0 && hourlyRate > 0) {
            // Calculate projected efficiency improvement (30% average)
            const efficiencyImprovement = 30;
            const newEfficiency = Math.min(100, currentEfficiency + efficiencyImprovement);
            
            // Calculate hours saved per employee per year
            const hoursPerYear = 2080; // 40 hours * 52 weeks
            const hoursSavedPerEmployee = hoursPerYear * (efficiencyImprovement / 100);
            const totalHoursSaved = hoursSavedPerEmployee * employees;
            
            // Calculate annual savings
            const annualSavings = totalHoursSaved * hourlyRate;
            
            // Calculate ROI timeline (assuming $50,000 average implementation cost)
            const implementationCost = 50000;
            const roiMonths = Math.ceil((implementationCost / annualSavings) * 12);
            
            // Update display
            savingsAmount.textContent = '$' + annualSavings.toLocaleString();
            efficiencyGain.textContent = efficiencyImprovement + '%';
            roiTimeline.textContent = roiMonths + ' months';
        }
    }
    
    roiInputs.forEach(input => {
        input.addEventListener('input', calculateROI);
    });

    // WhatsApp Button functionality
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        // Add click tracking
        whatsappButton.addEventListener('click', function() {
            // Optional: Add analytics tracking here
            console.log('WhatsApp button clicked');
        });

        // Add scroll-based visibility
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                whatsappButton.style.transform = 'translateY(0)';
            } else {
                // Scrolling up
                whatsappButton.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
});

// Smooth scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav && menuBtn) {
        mobileNav.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav && menuBtn) {
        mobileNav.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav && menuBtn && 
        !mobileNav.contains(event.target) && 
        !menuBtn.contains(event.target) && 
        mobileNav.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize (if resized to desktop)
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        closeMobileMenu();
    }
});

// Scroll Animation Functionality
function initScrollAnimations() {
    // Create intersection observer for scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add delay based on data-delay attribute
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('animate');
                }, delay);
                
                // Unobserve after animation to prevent re-triggering
                scrollObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all scroll animation elements
    const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-card');
    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});

// Custom Cursor Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only create custom cursor on desktop
    if (window.innerWidth > 768) {
        // Create cursor elements
        const cursor = document.createElement('div');
        const cursorFollower = document.createElement('div');
        
        cursor.className = 'cursor';
        cursorFollower.className = 'cursor-follower';
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);
        
        // Mouse move event
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add slight delay to follower
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .team-card, .testimonial-card, .metric-card, .case-study-card, .pricing-card, .faq-item, .whatsapp-button, .cta-button, .btn-primary, .btn-secondary');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
        
        // Click effects
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
