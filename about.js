// About Section JavaScript - Aldi Wijaya

// Modal functions
function awOpen() {
    const modal = document.querySelector(".aw-modal");
    modal.style.display = "block";
    setTimeout(() => modal.classList.add("aw-show"), 10);
}

function awClose() {
    const modal = document.querySelector(".aw-modal");
    modal.classList.remove("aw-show");
    setTimeout(() => modal.style.display = "none", 400);
}

// Typewriter effect
(function() {
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    const phrases = ["Videographer", "Video Editor", "Social Media Specialist", "Digital Marketing"];
    
    function typeWriter() {
        const element = document.getElementById("awType");
        const phrase = phrases[currentPhrase];
        
        if (element) {
            if (isDeleting) {
                element.textContent = phrase.substring(0, currentChar - 1);
                currentChar--;
            } else {
                element.textContent = phrase.substring(0, currentChar + 1);
                currentChar++;
            }
            
            let speed = isDeleting ? 40 : 80;
            
            if (!isDeleting && currentChar === phrase.length) {
                speed = 1500;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
            }
            
            setTimeout(typeWriter, speed);
        }
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(typeWriter, 1000);
    });
    
    // Counter animation
    function animateCounter(element, target) {
        const start = 0;
        const duration = 2000;
        const startTime = performance.now();
        const suffix = element.parentElement.querySelector(".aw-label").textContent.includes("HAPPY CLIENTS") ? "%" : "+";
        
        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 2.5);
            const current = Math.floor(start + (target - start) * easeOutQuart);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target + suffix;
            }
        }
        
        requestAnimationFrame(updateCount);
    }
    
    // Intersection Observer for metrics
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const numElement = entry.target.querySelector(".aw-num");
            const targetValue = parseInt(numElement.dataset.count);
            
            if (entry.isIntersecting) {
                animateCounter(numElement, targetValue);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px"
    });
    
    document.querySelectorAll(".aw-metric").forEach(metric => observer.observe(metric));
    
    // Ripple effect
    document.querySelectorAll(".aw-link, .aw-metric, .aw-social-link, .aw-photo").forEach(element => {
        element.addEventListener("click", function(e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: aw-ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
})();
