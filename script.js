document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();

    window.currentLang = 'fr';
    const langFrBtn = document.getElementById('lang-fr');
    const langEnBtn = document.getElementById('lang-en');

    if (langFrBtn && langEnBtn) {
        langFrBtn.addEventListener('click', () => {
            document.documentElement.setAttribute('lang', 'fr');
            window.currentLang = 'fr';
            langFrBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        });

        langEnBtn.addEventListener('click', () => {
            document.documentElement.setAttribute('lang', 'en');
            window.currentLang = 'en';
            langEnBtn.classList.add('active');
            langFrBtn.classList.remove('active');
        });
    }
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

    window.currentLang = 'fr';

    const projectsData = {
        sisid: {
            title: "Système d'inscription SIS ID",
            title_en: "SIS ID Registration System",
            images: ["sisid.png", "sisid2.png", "sisid3.png"],
            team: "Projet professionnel - 175h",
            team_en: "Professional Project - 175h",
            time: "175 heures",
            objectif: "Refaire le parcours d'inscription pour le rendre plus simple et fluide.",
            objectif_en: "Redesign the registration process to make it simpler and seamless.",
            description: "J'ai travaillé sur la nouvelle page d'inscription de la plateforme SIS ID pour faciliter l'enregistrement des nouveaux utilisateurs.",
            description_en: "I worked on the new registration page of the SIS ID platform to facilitate the onboarding of new users.",
            stack: [{ name: "Angular", icon: "fab fa-angular" }, { name: "RxJS", icon: "fas fa-project-diagram" }],
            github: "",
            live: "https://auth.sis-id.com/auth/realms/my-sis-id/protocol/openid-connect/auth?client_id=my-sis-id-app&redirect_uri=https%3A%2F%2Fmy.sis-id.com%2F%23%2Fdashboard&state=4df3ea7e-4f47-446d-87ce-f9ef9eb80c02&response_mode=query&response_type=code&scope=openid&nonce=00bed2e5-6075-45fc-8f11-a738a8521e33&code_challenge=9awpoTQS-DrXf3Krov6yUcAenMvAUpTvTIFwKRV5vLI&code_challenge_method=S256",
            features: [
                "Développement des formulaires avec validation des données en direct.",
                "Utilisation de RxJS pour gérer les flux de données de manière asynchrone.",
                "Affichage de messages d'erreurs clairs pour guider l'utilisateur."
            ],
            features_en: [
                "Developed forms with real-time data validation.",
                "Used RxJS to handle asynchronous data streams.",
                "Displayed clear error messages to guide the user."
            ],
            growth: "L’architecture complexe de SIS ID m’a permis de maîtriser les observables avec RxJS pour traiter des flux de données asynchrones sans bugs. J’ai également développé ma capacité à analyser les retours métiers du Product Owner pour itérer rapidement sur l’expérience utilisateur en Angular.",
            growth_en: "The complex architecture of SIS ID allowed me to master observables with RxJS to handle asynchronous data streams without bugs. I also developed my ability to analyze business feedback from the Product Owner to quickly iterate on the user experience in Angular."
        },
        psup: {
            title: "EnseignantSup",
            title_en: "EnseignantSup",
            images: ["step1Parcoursup.png", "step2Parcoursup.png", "pdfParcoursup.png"],
            team: "SAE BUT 2 - 130h",
            team_en: "SAE BUT 2 - 130h",
            time: "130 heures",
            objectif: "Trier et classer automatiquement les dossiers Parcoursup. Projet réalisé en équipe de 4 personnes.",
            objectif_en: "Automatically sort and classify Parcoursup application files. Project carried out in a team of 4 people.",
            description: "Cet outil de bureau permet de lire des centaines de dossiers PDF en même temps pour aider les enseignants à faire un premier classement rapide.",
            description_en: "This desktop tool can read hundreds of PDF files simultaneously to help teachers make a quick initial ranking.",
            stack: [{ name: "Electron", icon: "fab fa-js" }, { name: "Node.js", icon: "fab fa-node-js" }, { name: "ONNX", icon: "fas fa-microchip" }, { name: "PDF.js", icon: "far fa-file-pdf" }],
            github: "https://github.com/gitUsername229/enseignantSup",
            live: "",
            features: [
                "Création du script pour extraire rapidement les données des PDF.",
                "Intégration d'une IA (ONNX) pour analyser et classer les commentaires des professeurs.",
                "Lien entre l'interface utilisateur et le moteur de calcul en Node.js."
            ],
            features_en: [
                "Created the script to quickly extract data from PDFs.",
                "Integrated an AI (ONNX) to analyze and classify teachers' comments.",
                "Linked the user interface with the Node.js processing engine."
            ],
            growth: "Ce projet m’a appris à interfacer un modèle d’Intelligence Artificielle de traitement de langage (NLP) avec une interface Electron via Node.js. J’ai développé une forte rigueur dans la gestion de la mémoire, car analyser des centaines de PDF génère des pics de consommation qu’il a fallu optimiser.",
            growth_en: "This project taught me how to interface an AI Natural Language Processing (NLP) model with an Electron interface via Node.js. I developed strict memory management practices, as parsing hundreds of PDFs generates consumption spikes that needed optimization."
        },
        cannes: {
            title: "Festival de Cannes",
            title_en: "Cannes Festival",
            images: ["festivalAccueil.png", "festivalPlanning.png", "festivalChatbot.png"],
            team: "SAE BUT 3 - 110h",
            team_en: "SAE BUT 3 - 110h",
            time: "110 heures",
            objectif: "Créer une plateforme de gestion pour l'organisation du festival. Projet réalisé en équipe de 4 personnes.",
            objectif_en: "Create a management platform for organizing the festival. Project carried out in a team of 4 people.",
            description: "Ce site permet de gérer la billetterie, les plannings de projection et les accès VIP de l'événement.",
            description_en: "This site manages ticketing, screening schedules, and VIP access to the event.",
            stack: [{ name: "Symfony", icon: "fab fa-symfony" }, { name: "PHP", icon: "fab fa-php" }, { name: "MySQL", icon: "fas fa-database" }, { name: "SCSS", icon: "fab fa-sass" }],
            github: "https://github.com/didierdelaferme-ui/SAES5",
            live: "",
            features: [
                "Développement du back-end avec Symfony pour supporter de nombreuses connexions.",
                "Optimisation de la base de données MySQL pour un affichage plus rapide.",
                "Création du module de billetterie et de l'espace administration.",
                "Ajout d'un chatbot pour aider à trouver les horaires des films."
            ],
            features_en: [
                "Developed the back-end with Symfony to handle a large number of connections.",
                "Optimized the MySQL database for faster display.",
                "Created the ticketing module and the administration area.",
                "Added a chatbot to help users find movie schedules."
            ],
            growth: "J'ai consolidé ma maîtrise du modèle MVC abstrait sous Symfony 7 en concevant une base de données MySQL robuste capable de gérer simultanément billetterie et rôles VIP. Humainement, j'ai appris à coordonner les API avec les vues développées par le reste de mon équipe pour respecter les délais.",
            growth_en: "I consolidated my mastery of the abstract MVC pattern in Symfony 7 by designing a robust MySQL database capable of simultaneously managing ticketing and VIP roles. On a soft-skills level, I learned to coordinate APIs with views developed by the rest of my team to meet deadlines."
        },
        edt: {
            title: "EDT Manager",
            title_en: "EDT Manager",
            images: ["edtPlanning.png", "edtProfil.png"],
            team: "Projet solo - 45h",
            team_en: "Solo Project - 45h",
            time: "45 heures",
            objectif: "Proposer un outil pour gérer les emplois du temps et l'inscription aux cours.",
            objectif_en: "Provide a tool to manage schedules and course registrations.",
            description: "Cette application permet aux professeurs d'organiser leurs cours et aux étudiants de sélectionner les créneaux proposés selon leurs besoins.",
            description_en: "This application allows teachers to organize their courses and students to select the slots that fit their needs.",
            stack: [{ name: "Vue.js", icon: "fab fa-vuejs" }, { name: "TypeScript", icon: "fab fa-js-square" }, { name: "Express", icon: "fas fa-server" }],
            github: "https://github.com/gitUsername229/edt",
            live: "",
            features: [
                "Développement du front-end en Vue.js avec des composants réutilisables.",
                "Création d'une API avec Node.js et sécurisation de la connexion utilisateur.",
                "Mise en place d'un module d'inscription pour les étudiants selon les choix des professeurs."
            ],
            features_en: [
                "Developed the front-end in Vue.js with reusable components.",
                "Created an API with Node.js and secured user authentication.",
                "Implemented a registration module for students based on teachers' choices."
            ],
            growth: "J'ai structuré ce projet en adoptant une architecture orientée composants sous Vue 3. J'ai surtout progressé sur le typage strict avec TypeScript côté back-end sous Express.js, ce qui m'a fait réaliser l'importance de sécuriser les interfaces de données entre le client et le serveur.",
            growth_en: "I structured this project by adopting a component-oriented architecture in Vue 3. I significantly progressed in strict typing with TypeScript on the back-end using Express.js, which made me realize the importance of securing data interfaces between client and server."
        }
    };

    document.querySelectorAll('.view-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            const project = projectsData[projectId];
            if(!project) return;

            const isEn = window.currentLang === 'en';

            modalContent.innerHTML = `
                <div class="modal-header">
                    <h2>${isEn && project.title_en ? project.title_en : project.title}</h2>
                    <div class="modal-meta">
                        <span class="tag"><i class="fas fa-users"></i> ${isEn && project.team_en ? project.team_en : project.team}</span>
                        <div class="project-tags">
                            ${project.stack.map(s => `<span class="tag"><i class="${s.icon}"></i> ${s.name}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="modal-body enhanced-layout">
                    <!-- Colonne Gauche -->
                    <div class="modal-main">
                        <div class="info-group" style="padding: 1.5rem; margin-bottom: 2rem; background: rgba(0, 229, 255, 0.05); border-left: 3px solid var(--primary); border-radius: 0 8px 8px 0;">
                            <h3 style="color: var(--primary); font-family: var(--mono-font); font-size: 1.1rem; border-bottom: 1px solid rgba(0, 229, 255, 0.3); padding-bottom: 0.5rem; margin-bottom: 1rem; text-transform: uppercase;"><i class="fas fa-bullseye" style="margin-right: 0.5rem;"></i> ${isEn ? 'Objective' : 'Objectif'}</h3>
                            <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-white); margin: 0;">${isEn && project.objectif_en ? project.objectif_en : project.objectif}</p>
                        </div>
                        <div class="info-group" style="margin-bottom: 2rem;">
                            <h3 style="color: var(--primary); font-family: var(--mono-font); font-size: 1.1rem; border-bottom: 1px solid rgba(0, 229, 255, 0.3); padding-bottom: 0.5rem; margin-bottom: 1rem; text-transform: uppercase;"><i class="fas fa-align-left" style="margin-right: 0.5rem;"></i> Description</h3>
                            <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-muted);">${isEn && project.description_en ? project.description_en : project.description}</p>
                        </div>

                        ${project.images && project.images.length > 0 ? `
                        <div class="modal-carousel-wrapper" style="margin-top: 1rem;">
                            <div class="modal-img-container" style="border-radius: 8px; overflow: hidden; border: 1px solid rgba(0, 229, 255, 0.2); box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
                                <div class="modal-carousel-track">
                                    ${project.images.map(img => `<img src="${img}" alt="${project.title}" class="modal-img">`).join('')}
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
                        ` : ''}
                    </div>

                    <!-- Colonne Droite -->
                    <div class="modal-side">
                        <div class="modal-features-list" style="margin-bottom: 2.5rem;">
                            <h3 style="color: var(--primary); font-family: var(--mono-font); font-size: 1.1rem; border-bottom: 1px solid rgba(0, 229, 255, 0.3); padding-bottom: 0.5rem; margin-bottom: 1.5rem; text-transform: uppercase;"><i class="fas fa-star" style="margin-right: 0.5rem;"></i> ${isEn ? 'My contributions' : 'Mes contributions'}</h3>
                            <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem; color: var(--text-muted); font-size: 1rem;">
                                ${(isEn && project.features_en ? project.features_en : project.features).map(f => `<li style="display: flex; gap: 1rem; align-items: flex-start;"><i class="fas fa-check-circle" style="color: var(--primary); margin-top: 0.3rem;"></i> <span>${f}</span></li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="info-group" style="background: rgba(0, 229, 255, 0.05); border-left: 4px solid var(--primary); padding: 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem;">
                            <h3 style="color: var(--primary); font-family: var(--mono-font); font-size: 1.1rem; border-bottom: 1px solid rgba(0, 229, 255, 0.3); padding-bottom: 0.5rem; margin-bottom: 1rem; text-transform: uppercase;"><i class="fas fa-chart-line" style="margin-right: 0.5rem;"></i> ${isEn ? 'Personal Growth' : 'Retour sur mon évolution'}</h3>
                            <p style="color: #fff; line-height: 1.7; margin-bottom: 0;">${isEn && project.growth_en ? project.growth_en : project.growth}</p>
                        </div>

                        <div class="modal-actions" style="margin-top: 2rem;">
                            ${project.github ? `<a href="${project.github}" target="_blank" class="cta-button"><i class="fab fa-github"></i> ${isEn ? 'Source Code' : 'Code Source'}</a>` : ''}
                            ${project.live ? `<a href="${project.live}" target="_blank" class="cta-button glow-btn"><i class="fas fa-external-link-alt"></i> ${isEn ? 'Live Demo' : 'Voir le site'}</a>` : ''}
                            ${!project.github && !project.live ? `<span class="cta-button" style="opacity: 0.5; cursor: not-allowed; border-color: rgba(255,255,255,0.2) !important; color: #888 !important;"><i class="fas fa-lock"></i> ${isEn ? 'Private Repo' : 'Dépôt Privé'}</span>` : ''}
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
