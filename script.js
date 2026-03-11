document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // =========================================
    // 1. MOUSE GLOW & NAVBAR LOGIC
    // =========================================
    const mouseGlow = document.getElementById('mouse-glow');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // 2. PARALLAX BACKGROUND ENGINE
    // =========================================
    const layer1 = document.querySelector('.layer-1');
    const layer2 = document.querySelector('.layer-2');
    const layer3 = document.querySelector('.layer-3');
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Background Parallax
        if (layer1) layer1.style.transform = `translateY(${scrolled * -0.15}px)`; 
        if (layer2) layer2.style.transform = `translateY(${scrolled * -0.3}px)`; 
        if (layer3) layer3.style.transform = `translateY(${scrolled * -0.6}px)`; 
        
        // Hero Fade
        if (heroContent) {
            const opacity = 1 - (scrolled / 500);
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            
            // Neon title slight parallax if present
            const neonTitle = document.querySelector('.neon-title');
            if(neonTitle) neonTitle.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        if (scrollIndicator) {
            if (scrolled > 100) scrollIndicator.style.opacity = '0';
            else scrollIndicator.style.opacity = '1';
        }
        
        // --- 🌍 PLANET ROTATION LOGIC ---
        // Calculate scroll percentage relative to the whole document
        const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const scrollPercent = (scrolled / maxScroll); // 0 to 1
        
        // Map 0 -> 1 scroll to 0px -> 1000px background position shift
        // This gives the illusion of planet rotation
        document.documentElement.style.setProperty('--scroll-rotation', `-${scrollPercent * 1500}px`);

        // --- 🚀 ROCKET PROGRESS ---
        const rocket = document.getElementById('scroll-rocket');
        if (rocket) {
            // Cap to 100% max
            const p = Math.min(Math.max(scrollPercent, 0), 1);
            rocket.style.top = `${p * 100}%`;
        }
    });

    // =========================================
    // 4. PROJECT & PARCOURS CAROUSELS LOGIC
    // =========================================
    const carousels = document.querySelectorAll('.projects-carousel-container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const dots = carousel.querySelectorAll('.dot');
        const slides = carousel.querySelectorAll('.project-slide'); // Could be projects or parcours
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateCarousel() {
            if(track) {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
            dots.forEach((dot, index) => {
                if(index === currentIndex) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            });

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarousel();
            });
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel();
                });
            });
        }
    });

    // =========================================
    // 5. INTERSECTION OBSERVER (Scroll Animations)
    // =========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -100px 0px" // Trigger slightly before it hits the bottom
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed if you don't want it to hide again when scrolling up
                // observer.unobserve(entry.target); 
            } else {
                // Remove class when scrolling out to allow re-triggering animation (optional based on preference)
                entry.target.classList.remove('is-visible');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Hero and Mars get visible immediately without waiting for scroll
    const hero = document.getElementById('about');
    const mars = document.getElementById('projects');
    if(hero) hero.classList.add('is-visible');
    if(mars) mars.classList.add('is-visible');


    // =========================================
    // 6. PROJECT MODALS LOGIC
    // =========================================
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-body-content');
    const modalCloseBtn = modal.querySelector('.close-modal');
    
    // Exact data preserved from ancien
    const projectsData = {
        psup: {
            title: "EnseignantSup",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
            objectif: "Créer une application permettant d'aider à l'évaluation qualitative des dossiers Parcoursup.",
            description: "EnseignantSup est un outil d'aide à la sélection des dossiers de candidatures. Il permet d'automatiser le scoring et le classement des dossiers pour faciliter le travail des commissions, tout en offrant une interface claire pour la gestion administrative.",
            stack: [{ name: "Electron", icon: "fab fa-js" }, { name: "Node.js", icon: "fab fa-node-js" }, { name: "ONNX", icon: "fas fa-microchip" }, { name: "PDF.js", icon: "far fa-file-pdf" }],
            features: ["Extraction PDF intelligente", "Scoring qualitatif assisté", "Analyse sémantique", "Interface dédiée au staff"]
        },
        cannes: {
            title: "Festival de Cannes",
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
            objectif: "Assurer la gestion globale et centralisée du Festival de Cannes.",
            description: "Cette plateforme permet de centraliser toute la gestion du Festival de Cannes. Elle offre des outils complets pour piloter la billetterie, organiser la logistique des invités et sécuriser les accès VIP, le tout intégré dans un écosystème fluide.",
            stack: [{ name: "Symfony", icon: "fab fa-symfony" }, { name: "PHP", icon: "fab fa-php" }, { name: "MySQL", icon: "fas fa-database" }, { name: "SCSS", icon: "fab fa-sass" }],
            features: ["Gestion CRM VIP", "Planning interactif", "Système de billetterie", "Administration staff"]
        },
        edt: {
            title: "EDT Manager",
            image: "https://images.unsplash.com/photo-1506784919141-935967000e30?q=80&w=1000&auto=format&fit=crop",
            objectif: "Concevoir une application scolaire pour la gestion interactive du temps.",
            description: "EDT Manager permet de consulter et d'administrer des emplois du temps de manière interactive. L'application facilite la planification des ressources et offre une visibilité claire sur les plannings pour tous les utilisateurs.",
            stack: [{ name: "Vue.js", icon: "fab fa-vuejs" }, { name: "TypeScript", icon: "fab fa-js-square" }, { name: "Express", icon: "fas fa-server" }],
            features: ["Vue 3 réactive", "Architecture API REST", "Auth JWT sécurisée", "Gestion CRUD plannings"]
        }
    };

    document.querySelectorAll('.view-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            const project = projectsData[projectId];
            if(!project) return;
            
            modalContent.innerHTML = `
                <div class="modal-header">
                    <h2>${project.title}</h2>
                </div>
                <div class="modal-body enhanced-layout">
                    <div class="modal-main">
                        <div class="modal-objectif-section">
                            <h4>// OBJECTIF</h4>
                            <p class="objectif-text">${project.objectif}</p>
                        </div>
                        <div class="modal-img-container">
                            <img src="${project.image}" alt="${project.title}" class="modal-img">
                        </div>
                        <div class="modal-text">
                            <p>${project.description}</p>
                        </div>
                    </div>
                    <div class="modal-side">
                        <div class="modal-tech-bar">
                            <h4>// TECHNOLOGIES</h4>
                            <div class="tech-icons">
                                ${project.stack.map(s => `
                                    <div class="tech-icon-item" title="${s.name}">
                                        <i class="${s.icon}"></i>
                                        <span>${s.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="modal-features-list">
                            <h4>// MISSIONS</h4>
                            <ul>
                                ${project.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    modalCloseBtn.onclick = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    
    modal.onclick = (e) => { 
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
});
