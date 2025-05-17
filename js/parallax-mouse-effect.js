/**
 * Enhanced Parallax Effect for Words
 * Features: continuous sliding, mouse tracking, and letter explosion effect
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all parallax words
    const parallaxWords = document.querySelectorAll('.parallax-word');
    
    // Get the container for reference
    const container = document.querySelector('.parallax-words-container');
    const containerWidth = container.offsetWidth;
    
    // Store word information
    const wordInfo = [];
    
    // Velocidade aumentada em 2x (valores reduzidos para 1/2 do original)
    // Original: entre 30s e 60s para um ciclo completo
    // Novo: entre 15s e 30s para um ciclo completo
    const getSlidingSpeed = () => (30000 + Math.random() * 30000) / 2;
    
    // Function to create letter elements from a word, preserving spaces between words
    function createLetterElements(word, wordText) {
        const letters = [];
        // Split the phrase into words
        const words = wordText.split(' ');
        
        // Process each word
        for (let w = 0; w < words.length; w++) {
            const currentWord = words[w];
            
            // Cria um span para cada letra da palavra
            for (let i = 0; i < currentWord.length; i++) {
                const letter = document.createElement('span');
                letter.className = 'letter';
                letter.textContent = currentWord[i];
                letter.style.position = 'relative';
                letter.style.display = 'inline-block';
                letter.style.transition = 'transform 0.3s ease-out';
                word.appendChild(letter);
                letters.push(letter);
            }
            
            // Adiciona espaço entre palavras (exceto após a última palavra)
            if (w < words.length - 1) {
                const space = document.createElement('span');
                space.className = 'letter space';
                space.innerHTML = '&nbsp;';
                space.style.position = 'relative';
                space.style.display = 'inline-block';
                space.style.transition = 'transform 0.3s ease-out';
                space.style.width = '8px'; // Garantir que o espaço entre palavras seja visível
                word.appendChild(space);
                letters.push(space);
            }
        }
        
        return letters;
    }
    
    // Initialize word positions and animations
    parallaxWords.forEach((word) => {
        // Get the computed style to get the actual left/top values
        const style = window.getComputedStyle(word);
        
        // Prepare for animations
        word.style.animation = 'none'; // Remove any existing animations
        
        // Store the original text
        const originalText = word.textContent;
        word.setAttribute('data-text', originalText);
        word.innerHTML = ''; // Clear the word
        
        // Create letter elements
        const letters = createLetterElements(word, originalText);
        
        // Setup initial positions
        // Instead of starting/ending outside viewport, we track absolute position
        // for continuous movement
        const initialPosition = Math.random() * containerWidth * 2; // Random start
        
        // Setup sliding animation
        const slidingSpeed = getSlidingSpeed();
        
        // Store information about this word
        wordInfo.push({
            element: word,
            letters: letters,
            originalText: originalText,
            left: parseFloat(style.left),
            top: parseFloat(style.top),
            position: initialPosition,
            speed: (containerWidth / slidingSpeed * 1000) * 2, // pixels per second (2x mais rápido)
            exploded: false,
            mouseOffsetX: 0,
            mouseOffsetY: 0
        });
    });
    
    // Function to update positions of all words with continuous movement
    function updatePositions() {
        const now = performance.now();
        const deltaTime = (now - (lastTime || now)) / 1000; // in seconds
        lastTime = now;
        
        wordInfo.forEach(info => {
            // Update position based on speed (continuous movement)
            info.position -= info.speed * deltaTime;
            
            // If the word has moved completely off screen to the left
            if (info.position < -info.element.offsetWidth) {
                // Reset to the right side of screen (continuous cycle)
                info.position = containerWidth;
            }
            
            // Calculate total position with mouse offset
            const totalX = info.position + (info.mouseOffsetX || 0);
            const totalY = (info.mouseOffsetY || 0);
            
            // Apply transform to the word
            info.element.style.transform = `translate(${totalX}px, ${totalY}px)`;
        });
        
        // Continue animation
        requestAnimationFrame(updatePositions);
    }
    
    // Track time for smooth animation
    let lastTime = null;
    
    // Start the animation loop
    updatePositions();
    
    // Function to explode a word's letters
    function explodeLetters(wordInfo) {
        if (wordInfo.exploded) return;
        
        wordInfo.exploded = true;
        wordInfo.letters.forEach(letter => {
            // Random direction for explosion
            const angle = Math.random() * Math.PI * 2;
            // Aumentando MUITO a distância de explosão (3x mais)
            const distance = 90 + Math.random() * 240;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            // Store original positions for restoration
            letter.originalX = letter.originalX || 0;
            letter.originalY = letter.originalY || 0;
            
            // Animate the letter moving outward with much more dramatic effect
            letter.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            letter.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 135 - 67.5}deg) scale(${1 + Math.random() * 1.5})`;
        });
    }
    
    // Function to restore exploded letters
    function restoreLetters(wordInfo) {
        if (!wordInfo.exploded) return;
        
        wordInfo.exploded = false;
        wordInfo.letters.forEach(letter => {
            letter.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            letter.style.transform = 'translate(0, 0) rotate(0deg)';
        });
    }
    
    // Add mousemove event listener for parallax effect
    document.addEventListener('mousemove', function(e) {
        // Get container bounds
        const rect = container.getBoundingClientRect();
        
        // Check if mouse is within the container
        if (
            e.clientX >= rect.left && 
            e.clientX <= rect.right && 
            e.clientY >= rect.top && 
            e.clientY <= rect.bottom
        ) {
            // Calculate mouse position relative to container (0 to 1)
            const relativeX = (e.clientX - rect.left) / rect.width;
            const relativeY = (e.clientY - rect.top) / rect.height;
            
            // Update each word's mouse offset
            wordInfo.forEach(info => {
                // Calculate offset based on mouse position
                const offsetX = (relativeX - 0.5) * 60;
                const offsetY = (relativeY - 0.5) * 30;
                
                // Apply offset with different intensity per word
                const parallaxFactor = 0.5 + (Math.sin(info.left) * 0.5);
                
                // Store mouse offset
                info.mouseOffsetX = offsetX * parallaxFactor;
                info.mouseOffsetY = offsetY * parallaxFactor;
                
                // Check if mouse is over this word
                const wordRect = info.element.getBoundingClientRect();
                if (
                    e.clientX >= wordRect.left && 
                    e.clientX <= wordRect.right && 
                    e.clientY >= wordRect.top && 
                    e.clientY <= wordRect.bottom
                ) {
                    // Explode the letters of this word
                    explodeLetters(info);
                } else {
                    // Restore letters if mouse is not over this word
                    restoreLetters(info);
                }
            });
        }
    });

    // Add a mouseleave event to reset effects when mouse leaves container
    container.addEventListener('mouseleave', function() {
        wordInfo.forEach(info => {
            // Restore all letters
            restoreLetters(info);
            
            // Gradually reduce mouse offset to zero
            const reduceOffset = () => {
                if (Math.abs(info.mouseOffsetX) < 0.1 && Math.abs(info.mouseOffsetY) < 0.1) {
                    info.mouseOffsetX = 0;
                    info.mouseOffsetY = 0;
                    return;
                }
                
                info.mouseOffsetX *= 0.9;
                info.mouseOffsetY *= 0.9;
                
                requestAnimationFrame(reduceOffset);
            };
            
            reduceOffset();
        });
    });
});
