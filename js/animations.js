/**
 * Animations.js
 * Visual effects and animations for the Glyph project
 */

// Animation and visual effects controller
const GlyphAnimations = (function() {
    
    // Initialize particles background
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-bg', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#8a2be2"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#8a2be2",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }
    
    // Create spark effect (toned down)
    function createSpark(x, y, count = 5) {
        const container = document.body;
        
        for (let i = 0; i < count; i++) {
            const spark = document.createElement('div');
            spark.classList.add('spark');
            
            // Random properties for each spark (smaller and more subtle)
            const size = Math.random() * 3 + 1; // 1-4px (smaller)
            const angle = Math.random() * Math.PI * 2; // 0-360 degrees
            const distance = Math.random() * 50 + 30; // 30-80px (shorter distance)
            const duration = Math.random() * 0.3 + 0.3; // 0.3-0.6s (faster)
            
            // Calculate end position
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            // Apply styles
            spark.style.width = `${size}px`;
            spark.style.height = `${size}px`;
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.setProperty('--end-x', `${endX}px`);
            spark.style.setProperty('--end-y', `${endY}px`);
            spark.style.opacity = '0.6'; // Lower opacity
            
            // Add to DOM
            container.appendChild(spark);
            
            // Trigger animation
            setTimeout(() => {
                spark.style.animation = `spark-animation ${duration}s ease-out forwards`;
                
                // Clean up after animation
                setTimeout(() => {
                    container.removeChild(spark);
                }, duration * 1000);
            }, 10);
        }
    }
    
    // Create magic wave effect
    function createMagicWave(x, y) {
        const container = document.body;
        const wave = document.createElement('div');
        wave.classList.add('magic-wave');
        
        // Apply styles
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        wave.style.width = '10px';
        wave.style.height = '10px';
        
        // Add to DOM
        container.appendChild(wave);
        
        // Trigger animation
        setTimeout(() => {
            wave.style.animation = 'magic-wave 1s ease-out forwards';
            
            // Clean up after animation
            setTimeout(() => {
                container.removeChild(wave);
            }, 1000);
        }, 10);
    }
    
    // Create beam effect
    function createBeam(element) {
        if (!element) return;
        
        const beam = document.createElement('div');
        beam.classList.add('glyph-beam');
        
        // Get element position
        const rect = element.getBoundingClientRect();
        
        // Apply styles
        beam.style.left = `${rect.left}px`;
        beam.style.top = `${rect.top + rect.height / 2}px`;
        beam.style.width = `${rect.width}px`;
        
        // Add to DOM
        document.body.appendChild(beam);
        
        // Trigger animation
        setTimeout(() => {
            beam.style.animation = 'beam-animation 0.8s ease-out forwards';
            
            // Clean up after animation
            setTimeout(() => {
                document.body.removeChild(beam);
            }, 800);
        }, 10);
    }
    
    // Animate character reveal
    function animateCharacterReveal(container, text, delay = 30, callback) {
        if (!container || !text) return;
        
        // Clear container
        container.innerHTML = '';
        
        // Create span for each character
        for (let i = 0; i < text.length; i++) {
            const char = document.createElement('span');
            char.classList.add('glyph-char');
            char.textContent = text[i];
            
            // Add special class for transformed characters
            if (text[i] !== text[i].normalize('NFKD')) {
                char.classList.add('highlight');
            }
            
            container.appendChild(char);
        }
        
        // Get all character spans
        const chars = container.querySelectorAll('.glyph-char');
        
        // Reveal characters one by one with delay
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.classList.add('reveal');
                
                // Create spark effect for special characters
                if (char.classList.contains('highlight')) {
                    const rect = char.getBoundingClientRect();
                    createSpark(rect.left + rect.width / 2, rect.top + rect.height / 2, 5);
                }
                
                // Call callback when animation is complete
                if (index === chars.length - 1 && typeof callback === 'function') {
                    setTimeout(callback, 300);
                }
            }, index * delay);
        });
    }
    
    // Show loading animation
    function showLoading(show = true) {
        const overlay = document.getElementById('loading-overlay');
        if (!overlay) return;
        
        if (show) {
            overlay.classList.remove('hidden');
            setTimeout(() => {
                overlay.classList.add('visible');
            }, 10);
        } else {
            overlay.classList.remove('visible');
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 300);
        }
    }
    
    // Show toast notification
    function showToast(message, type = 'info') {
        if (typeof Toastify !== 'undefined') {
            Toastify({
                text: message,
                duration: 3000,
                gravity: "bottom",
                position: "right",
                className: `custom-toast toast-${type}`,
                style: {
                    background: type === 'success' ? 'linear-gradient(to right, #00b09b, #96c93d)' :
                                type === 'error' ? 'linear-gradient(to right, #ff5f6d, #ffc371)' :
                                'linear-gradient(to right, #8a2be2, #00ffff)',
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    padding: '12px 20px'
                }
            }).showToast();
        }
    }
    
    // Initialize magic cursor
    function initMagicCursor() {
        const cursor = document.getElementById('magic-cursor');
        if (!cursor) return;
        
        // Track cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            // Show cursor when mouse moves
            if (getComputedStyle(cursor).opacity === '0') {
                cursor.style.animation = 'cursor-appear 0.3s forwards';
            }
        });
        
        // Hide cursor when mouse stops moving
        let timeout;
        document.addEventListener('mousemove', () => {
            clearTimeout(timeout);
            
            timeout = setTimeout(() => {
                cursor.style.animation = 'cursor-disappear 0.3s forwards';
            }, 3000);
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                cursor.style.animation = 'cursor-disappear 0.3s forwards';
            }
        });
        
        // Special effect when clicking
        document.addEventListener('click', (e) => {
            createSpark(e.clientX, e.clientY, 15);
            createMagicWave(e.clientX, e.clientY);
        });
    }
    
    // Create magic trail effect (very subtle)
    function initMagicTrail() {
        let trailElements = [];
        const MAX_TRAILS = 5; // Fewer trails
        let lastTime = 0;
        const THROTTLE = 80; // Only create trail every 80ms
        
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            
            // Throttle trail creation
            if (now - lastTime < THROTTLE) return;
            lastTime = now;
            
            // Create new trail element
            const trail = document.createElement('div');
            trail.classList.add('magic-trail');
            
            // Random properties (much smaller)
            const size = Math.random() * 10 + 5; // 5-15px (smaller)
            
            // Apply styles
            trail.style.width = `${size}px`;
            trail.style.height = `${size}px`;
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            trail.style.opacity = '0.2'; // Much lower opacity
            
            // Add to DOM
            document.body.appendChild(trail);
            trailElements.push(trail);
            
            // Limit number of trails
            if (trailElements.length > MAX_TRAILS) {
                document.body.removeChild(trailElements.shift());
            }
            
            // Animate and remove (faster)
            requestAnimationFrame(() => {
                trail.style.animation = 'trail-fade 0.5s ease-out forwards';
                
                setTimeout(() => {
                    if (document.body.contains(trail)) {
                        document.body.removeChild(trail);
                        trailElements = trailElements.filter(el => el !== trail);
                    }
                }, 500);
            });
        });
    }
    
    // Create magical transformation effect
    function createMagicalTransformEffect(fromElement, toElement, callback) {
        if (!fromElement || !toElement) {
            if (typeof callback === 'function') callback();
            return;
        }
        
        // Get element positions
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();
        
        // Create sparks at source
        createSpark(fromRect.left + fromRect.width / 2, fromRect.top + fromRect.height / 2, 20);
        
        // Create beam effect
        createBeam(fromElement);
        
        // Create sparks at destination after delay
        setTimeout(() => {
            createSpark(toRect.left + toRect.width / 2, toRect.top + toRect.height / 2, 20);
            
            if (typeof callback === 'function') {
                callback();
            }
        }, 500);
    }
    
    // Create floating particles effect
    function createFloatingParticles(element, count = 10) {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('magic-particle');
            
            // Random properties
            const size = Math.random() * 4 + 2; // 2-6px
            const x = rect.left + Math.random() * rect.width;
            const y = rect.bottom;
            const duration = Math.random() * 2 + 2; // 2-4s
            
            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Add to DOM
            document.body.appendChild(particle);
            
            // Animate and remove
            setTimeout(() => {
                particle.style.animation = `particle-float ${duration}s ease-out forwards`;
                
                setTimeout(() => {
                    if (document.body.contains(particle)) {
                        document.body.removeChild(particle);
                    }
                }, duration * 1000);
            }, Math.random() * 1000); // Staggered start
        }
    }
    
    // Add hover animation to elements
    function addHoverAnimations() {
        // Add float effect to buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.classList.add('hover-float');
        });
        
        // Add glow effect to containers
        document.querySelectorAll('.floating-input, .output-container').forEach(container => {
            container.classList.add('hover-glow');
        });
    }
    
    // Create screen transition effect
    function createScreenTransition(callback) {
        const transition = document.createElement('div');
        transition.classList.add('screen-transition');
        document.body.appendChild(transition);
        
        // Animate in
        transition.style.animation = 'screen-in 0.3s forwards';
        
        // Wait then animate out
        setTimeout(() => {
            transition.style.animation = 'screen-out 0.3s forwards';
            
            // Execute callback
            if (typeof callback === 'function') {
                callback();
            }
            
            // Remove element
            setTimeout(() => {
                document.body.removeChild(transition);
            }, 300);
        }, 300);
    }
    
    // Initialize all animations
    function init() {
        initParticles();
        initMagicCursor();
        initMagicTrail();
        addHoverAnimations();
    }
    
    // Public API
    return {
        init,
        createSpark,
        createMagicWave,
        createBeam,
        animateCharacterReveal,
        showLoading,
        showToast,
        createMagicalTransformEffect,
        createFloatingParticles,
        createScreenTransition
    };
})();

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', GlyphAnimations.init);