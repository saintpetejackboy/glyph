/**
 * Main.js
 * Main functionality for the Glyph project
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const inputText = document.getElementById('input-text');
    const charCount = document.getElementById('char-count');
    const glyphBtn = document.getElementById('glyph-btn');
    const outputSection = document.getElementById('output-section');
    const outputText = document.getElementById('output-text');
    const copyBtn = document.getElementById('copy-btn');
    const newBtn = document.getElementById('new-btn');
    
    // State
    let lastConversionResult = null;
    
    // Initialize
    init();
    
    /**
     * Initialize the application
     */
    function init() {
        // Setup event listeners
        setupEventListeners();
        
        // Initial character count
        updateCharCount();
        
        // Add auto-resize to textarea
        makeTextareaAutoResize();
        
        // Initialize animations
        if (GlyphAnimations) {
            // Any specific initialization for animations can go here
        }
    }
    
    /**
     * Set up all event listeners
     */
    function setupEventListeners() {
        // Update character count when typing
        inputText.addEventListener('input', updateCharCount);
        
        // Convert text when button is clicked
        glyphBtn.addEventListener('click', handleConversion);
        
        // Copy converted text
        copyBtn.addEventListener('click', copyToClipboard);
        
        // Reset for new conversion
        newBtn.addEventListener('click', resetConversion);
        
        // Allow Enter key to trigger conversion
        inputText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                handleConversion();
            }
        });
        
        // Create sparks on button hover
        glyphBtn.addEventListener('mouseenter', () => {
            const rect = glyphBtn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            if (GlyphAnimations) {
                GlyphAnimations.createSpark(x, y, 5);
            }
        });
    }
    
    /**
     * Update the character count display
     */
    function updateCharCount() {
        const count = inputText.value.length;
        charCount.textContent = count;
        
        // Add warning class when approaching limit
        if (count > 1800) {
            charCount.classList.add('char-warn');
        } else {
            charCount.classList.remove('char-warn');
        }
    }
    
    /**
     * Make the textarea auto-resize
     */
    function makeTextareaAutoResize() {
        inputText.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    /**
     * Handle the conversion process
     */
	function handleConversion() {
		const text = inputText.value.trim();
		
		// Clear previous conversion output and any info elements
		if (outputText) {
			outputText.innerHTML = '';
		}
		const infoElements = document.querySelectorAll('.conversion-info');
		infoElements.forEach(el => el.remove());
		
		if (!text) {
			if (GlyphAnimations) {
				GlyphAnimations.showToast('Please enter some text to convert', 'error');
			}
			return;
		}
		
		// Add button press animation
		glyphBtn.classList.add('btn-press');
		setTimeout(() => {
			glyphBtn.classList.remove('btn-press');
		}, 200);
		
		// Show loading animation
		if (GlyphAnimations) {
			GlyphAnimations.showLoading(true);
		}
		
		// Simulate processing time for effect (can be removed in production)
		setTimeout(() => {
			// Convert text to homoglyphs
			convertText(text);
		}, 1000);
	}

    
    /**
     * Convert text to homoglyphs
     * @param {string} text - The text to convert
     */
    function convertText(text) {
        // Use the GlyphConverter from homoglyphs.js
        if (window.GlyphConverter) {
            const result = window.GlyphConverter.convertToHomoglyphs(text);
            lastConversionResult = result;
            
            // Create magical transformation effect
            if (GlyphAnimations) {
                GlyphAnimations.createMagicalTransformEffect(
                    inputText, 
                    outputSection, 
                    () => {
                        // Hide loading
                        GlyphAnimations.showLoading(false);
                        
                        // Show output section
                        showOutput(result);
                    }
                );
            } else {
                // Fallback if animations not available
                showOutput(result);
            }
        } else {
            console.error('GlyphConverter not found');
            
            // Hide loading
            if (GlyphAnimations) {
                GlyphAnimations.showLoading(false);
            }
            
            // Show error toast
            if (GlyphAnimations) {
                GlyphAnimations.showToast('Error: Conversion library not loaded', 'error');
            }
        }
    }
    
    /**
     * Show the output section with the conversion result
     * @param {Object} result - The conversion result object
     */
    function showOutput(result) {
        // Show output section
        outputSection.classList.remove('hidden');
        outputSection.classList.add('visible');
        
        // Animate character reveal
        if (GlyphAnimations) {
            GlyphAnimations.animateCharacterReveal(outputText, result.converted, 20, () => {
                // Create floating particles after reveal (reduce number)
                GlyphAnimations.createFloatingParticles(outputText, 8);
                
                // Add a subtle info about conversion statistics
                if (result.changedChars > 0) {
                    const infoElement = document.createElement('div');
                    infoElement.classList.add('conversion-info');
                    infoElement.textContent = `${result.changedChars} of ${result.totalChars} characters transformed (${result.percentChanged}%)`;
                    
                    // Find the output container and append info
                    const container = outputText.closest('.output-text-container');
                    if (container) {
                        container.appendChild(infoElement);
                        
                        // Fade in the info text
                        setTimeout(() => {
                            infoElement.style.opacity = '1';
                        }, 500);
                    }
                }
            });
        } else {
            // Fallback if animations not available
            outputText.textContent = result.converted;
        }
        
        // Scroll to output if needed
        setTimeout(() => {
            outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
    
    /**
     * Copy the converted text to clipboard
     */
    function copyToClipboard() {
        if (!lastConversionResult) return;
        
        // Add copy animation
        copyBtn.classList.add('copy-success');
        
        // Create copy effect
        if (GlyphAnimations) {
            const rect = copyBtn.getBoundingClientRect();
            GlyphAnimations.createSpark(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
        }
        
        // Copy to clipboard
        navigator.clipboard.writeText(lastConversionResult.converted)
            .then(() => {
                // Show success message
                if (GlyphAnimations) {
                    GlyphAnimations.showToast('Copied to clipboard! ✨', 'success');
                }
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                
                // Show error message
                if (GlyphAnimations) {
                    GlyphAnimations.showToast('Failed to copy text', 'error');
                }
            })
            .finally(() => {
                // Remove animation class
                setTimeout(() => {
                    copyBtn.classList.remove('copy-success');
                }, 500);
            });
    }
    
    /**
     * Reset for a new conversion
     */
    function resetConversion() {
        // Create screen transition effect
        if (GlyphAnimations) {
            GlyphAnimations.createScreenTransition(() => {
                // Hide output section
                outputSection.classList.remove('visible');
                setTimeout(() => {
                    outputSection.classList.add('hidden');
                    
                    // Remove any existing conversion-info elements
                    const infoElements = document.querySelectorAll('.conversion-info');
                    infoElements.forEach(el => {
                        if (el && el.parentNode) {
                            el.parentNode.removeChild(el);
                        }
                    });
                    
                    // Clear output text
                    if (outputText) {
                        outputText.innerHTML = '';
                    }
                    
                    // Clear input
                    inputText.value = '';
                    updateCharCount();
                    inputText.style.height = 'auto';
                    
                    // Focus input
                    inputText.focus();
                }, 300);
            });
        } else {
            // Fallback if animations not available
            outputSection.classList.remove('visible');
            outputSection.classList.add('hidden');
            
            // Remove any existing conversion-info elements
            const infoElements = document.querySelectorAll('.conversion-info');
            infoElements.forEach(el => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
            
            // Clear output text
            if (outputText) {
                outputText.innerHTML = '';
            }
            
            inputText.value = '';
            updateCharCount();
            inputText.focus();
        }
    }
});