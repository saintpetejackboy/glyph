<?php
// Start a session for potential future use
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>✨ GLYPH ✨ | Text Transformation</title>
    
    <!-- Meta tags for better SEO and sharing -->
    <meta name="description" content="Transform your text into magical glyphs with our powerful converter">
    <meta property="og:title" content="GLYPH | Text Transformation">
    <meta property="og:description" content="Transform your text into magical glyphs with our powerful converter">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://esdbooking.us/glyph">
    
    <!-- Favicons and App Icons -->
    <link rel="icon" href="assets/icons/icons8-glyph-gradient-32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="assets/icons/icons8-glyph-gradient-16.png" sizes="16x16" type="image/png">
    <link rel="apple-touch-icon" href="assets/icons/icons8-glyph-gradient-180.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/icons/icons8-glyph-gradient-152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/icons8-glyph-gradient-180.png">
    <link rel="apple-touch-icon" sizes="167x167" href="assets/icons/icons8-glyph-gradient-152.png">
    <meta name="msapplication-TileImage" content="assets/icons/icons8-glyph-gradient-144.png">
    <meta name="msapplication-TileColor" content="#8a2be2">
    <meta name="theme-color" content="#121212">
    <link rel="manifest" href="manifest.json">
    
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/animations.css">
    
    <!-- Preload JS -->
    <link rel="preload" href="js/homoglyphs.js" as="script">
    <link rel="preload" href="js/animations.js" as="script">
</head>
<body>
    <!-- Background particles -->
    <div id="particles-bg"></div>
    
    <!-- Main container -->
    <div class="container">
        <header class="animate__animated animate__fadeInDown">
           <img src="assets/logo.png" title="Glyph - Transform your text!	" alt="Glyph - Transform your text!">
        </header>
        
        <main>
            <!-- Input section -->
            <section class="input-section animate__animated animate__fadeIn">
                <div class="floating-input">
                    <textarea id="input-text" placeholder="Enter your text here (up to 2000 characters)..." maxlength="2000"></textarea>
                    <div class="char-counter">
                        <span id="char-count">0</span>/2000
                    </div>
                </div>
                
                <button id="glyph-btn" class="glyph-btn">
                    <span class="btn-text">Transform</span>
                    <span class="btn-emoji">✨🔮✍️</span>
                    <div class="btn-bg"></div>
                </button>
            </section>
            
            <!-- Output section (initially hidden) -->
            <section id="output-section" class="output-section hidden">
                <div class="output-container">
                    <h2 class="animate__animated animate__fadeIn">Your Glyph ✨</h2>
                    
                    <div class="output-text-container">
                        <div id="output-text" class="output-text"></div>
                        
                        <div class="output-actions">
                            <button id="copy-btn" class="action-btn">
                                <i class="fas fa-copy"></i> Copy
                            </button>
                            <button id="new-btn" class="action-btn">
                                <i class="fas fa-redo-alt"></i> New Glyph
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <footer class="animate__animated animate__fadeInUp">
            <p><img src="assets/logo.png" height="50" title="Glyph - Transform your text!	" alt="Glyph - Transform your text!">
			<br>
			2025 v0.1.2</p>
        </footer>
    </div>
    
    <!-- Magic wand cursor -->
    <div id="magic-cursor"></div>
    
    <!-- Loading overlay -->
    <div id="loading-overlay" class="hidden">
        <div class="magic-circle">
            <div class="magic-circle-inner">
                <div class="magic-rune"></div>
                <div class="magic-rune"></div>
                <div class="magic-rune"></div>
            </div>
        </div>
        <p class="loading-text">Crafting your glyphs...</p>
    </div>
    
    <!-- Toast container -->
    <div id="toast-container"></div>
    
    <!-- JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    
    <!-- Custom JavaScript -->
    <script src="js/homoglyphs.js"></script>
    <script src="js/animations.js"></script>
    <script src="js/main.js"></script>
</body>
</html>