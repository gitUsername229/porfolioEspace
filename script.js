document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();

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

    const layer1 = document.querySelector('.layer-1');
    const layer2 = document.querySelector('.layer-2');
    const layer3 = document.querySelector('.layer-3');
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        if (layer1) layer1.style.transform = `translateY(${scrolled * -0.15}px)`; 
        if (layer2) layer2.style.transform = `translateY(${scrolled * -0.3}px)`; 
        if (layer3) layer3.style.transform = `translateY(${scrolled * -0.6}px)`; 

        if (heroContent) {
            const opacity = 1 - (scrolled / 500);
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;

            const neonTitle = document.querySelector('.neon-title');
            if(neonTitle) neonTitle.style.transform = `translateY(${scrolled * 0.2}px)`;
        }

        if (scrollIndicator) {
            if (scrolled > 100) scrollIndicator.style.opacity = '0';
            else scrollIndicator.style.opacity = '1';
        }

        const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const scrollPercent = (scrolled / maxScroll); 

        document.documentElement.style.setProperty('--scroll-rotation', `-${scrollPercent * 800}px`);

        const rocket = document.getElementById('scroll-rocket');
        if (rocket) {

            const p = Math.min(Math.max(scrollPercent, 0), 1);
            rocket.style.top = `${p * 100}%`;
        }
    });

    const carousels = document.querySelectorAll('.projects-carousel-container');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const dots = carousel.querySelectorAll('.dot');
        const slides = carousel.querySelectorAll('.project-slide'); 
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

    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.2, 
        rootMargin: "0px 0px -100px 0px" 
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

            } else {

                entry.target.classList.remove('is-visible');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    const hero = document.getElementById('about');
    const mars = document.getElementById('projects');
    if(hero) hero.classList.add('is-visible');
    if(mars) mars.classList.add('is-visible');

    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-body-content');
    const modalCloseBtn = modal.querySelector('.close-modal');

    const projectsData = {
        psup: {
            title: "EnseignantSup",
            images: ["step1Parcoursup.png", "step2Parcoursup.png", "pdfParcoursup.png"],
            team: "4 personnes",
            objectif: "Automatiser l'analyse et le tri des dossiers Parcoursup.",
            description: "Outil desktop qui parse en masse les dossiers PDF des lycéens. Il extrait les notes, calcule des moyennes pondérées par matière et génère un classement brut. L'objectif est d'éliminer le triage basique pour laisser les enseignants juger de la pertinence des profils.",
            stack: [{ name: "Electron", icon: "fab fa-js" }, { name: "Node.js", icon: "fab fa-node-js" }, { name: "ONNX", icon: "fas fa-microchip" }, { name: "PDF.js", icon: "far fa-file-pdf" }],
            features: [
                "Création d'un parseur PDF asynchrone capable de lire 500+ dossiers par minute.", 
                "Mise en place d'un modèle ONNX local pour analyser les appréciations textuelles. Gain de temps estimé : 60%.", 
                "Développement de l'interface Electron et intégration de la logique Node.js."
            ]
        },
        cannes: {
            title: "Festival de Cannes",
            images: ["festivalAccueil.png", "festivalPlanning.png", "festivalChatbot.png"],
            team: "2 personnes",
            objectif: "Coder la plateforme web de gestion principale du Festival.",
            description: "Application critique développée sur mesure. Elle centralise les données du festival : plannings des projections, accréditations, tickets et sécurisation des zones VIP.",
            stack: [{ name: "Symfony", icon: "fab fa-symfony" }, { name: "PHP", icon: "fab fa-php" }, { name: "MySQL", icon: "fas fa-database" }, { name: "SCSS", icon: "fab fa-sass" }],
            features: [
                "Développement back-end sous Symfony pour gérer les pics de charge (2000+ utilisateurs locaux simultanés).", 
                "Refonte du schéma de base de données MySQL. Ajout d'index pour lisser les temps de réponse sur les tables lourdes.", 
                "Création d'un module de billetterie et d'un dashboard admin pour le suivi live.",
                "Développement d'un chatbot qui parse la BDD pour répondre rapidement aux questions d'emploi du temps."
            ]
        },
        edt: {
            title: "EDT Manager",
            images: ["edtPlanning.png", "edtProfil.png"],
            team: "Projet solo",
            objectif: "Créer un gestionnaire d'emploi du temps drag-and-drop.",
            description: "L'application évite d'utiliser un tableur complexe pour gérer les emplois du temps de l'école. Les professeurs s'y connectent pour poser, décaler ou supprimer leurs créneaux de cours facilement.",
            stack: [{ name: "Vue.js", icon: "fab fa-vuejs" }, { name: "TypeScript", icon: "fab fa-js-square" }, { name: "Express", icon: "fas fa-server" }],
            features: [
                "Développement du front-end en Vue.js avec un focus sur la réutilisation des composants UI.", 
                "Codage de l'API REST en Node.js/TypeScript. Implémentation de la session via JWT basique.", 
                "Mise en place de routes CRUD complètes sur la gestion des salles et des enseignants."
            ]
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
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
                            <span class="tag" style="font-size: 0.9rem; padding: 0.4rem 0.8rem;"><i class="fas fa-users" style="margin-right: 5px;"></i> ${project.team}</span>
                        </div>
                        <div class="modal-objectif-section">
                            <h4>
                            <p class="objectif-text">${project.objectif}</p>
                        </div>
                        <div class="modal-carousel-wrapper" style="margin-bottom: 1.5rem;">
                            <div class="modal-img-container" style="margin-bottom: 0.5rem; overflow: hidden; position: relative;">
                                <div class="modal-carousel-track" style="display: flex; transition: transform 0.4s ease; width: 100%;">
                                    ${project.images.map(img => `<img src="${img}" alt="${project.title}" class="modal-img" style="min-width: 100%; height: auto; object-fit: cover;">`).join('')}
                                </div>
                            </div>
                            ${project.images.length > 1 ? `
                            <div class="carousel-controls">
                                <button class="carousel-arrow modal-prev-btn"><i class="fas fa-chevron-left"></i></button>
                                <div class="carousel-dots modal-dots">
                                    ${project.images.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
                                </div>
                                <button class="carousel-arrow modal-next-btn"><i class="fas fa-chevron-right"></i></button>
                            </div>
                            ` : ''}
                        </div>
                        <div class="modal-text">
                            <p>${project.description}</p>
                        </div>
                    </div>
                    <div class="modal-side">
                        <div class="modal-tech-bar">
                            <h4>
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
                            <h4>
                            <ul>
                                ${project.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;

            const modalTrack = modalContent.querySelector('.modal-carousel-track');
            const modalPrevBtn = modalContent.querySelector('.modal-prev-btn');
            const modalNextBtn = modalContent.querySelector('.modal-next-btn');
            const modalDots = modalContent.querySelectorAll('.modal-dots .dot');

            if (modalTrack && project.images.length > 1) {
                let currentModalIndex = 0;
                const totalModalSlides = project.images.length;

                const updateModalCarousel = () => {
                    modalTrack.style.transform = `translateX(-${currentModalIndex * 100}%)`;
                    modalDots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentModalIndex);
                    });
                };

                if (modalNextBtn) {
                    modalNextBtn.addEventListener('click', () => {
                        currentModalIndex = (currentModalIndex + 1) % totalModalSlides;
                        updateModalCarousel();
                    });
                }

                if (modalPrevBtn) {
                    modalPrevBtn.addEventListener('click', () => {
                        currentModalIndex = (currentModalIndex - 1 + totalModalSlides) % totalModalSlides;
                        updateModalCarousel();
                    });
                }

                modalDots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        currentModalIndex = index;
                        updateModalCarousel();
                    });
                });
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    const closeLightbox = () => {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');

            if (!modal.classList.contains('active')) {
                document.body.style.overflow = 'auto';
            }
        }
    }

    modalCloseBtn.onclick = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        closeLightbox();
    };

    modal.onclick = (e) => { 
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            closeLightbox();
        }
    };

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Fermer la vue plein écran"><i class="fas fa-times"></i></button>
        <img class="lightbox-img" src="" alt="Image plein écran">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    const setupLightboxTriggers = () => {
        const modalImages = document.querySelectorAll('.modal-img');
        modalImages.forEach(img => {
            img.style.cursor = 'zoom-in'; 

            const newImg = img.cloneNode(true);
            img.parentNode.replaceChild(newImg, img);

            newImg.addEventListener('click', () => {
                lightboxImg.src = newImg.src;
                lightbox.classList.add('active');
            });
        });
    };

    const viewMoreBtns = document.querySelectorAll('.view-more-btn');
    viewMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            setTimeout(setupLightboxTriggers, 50); 
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

});
