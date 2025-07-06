// script.js
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (href && href.length > 1 && href.startsWith("#")) {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
            if (window.innerWidth < 768) {
                const mobileMenu =
                    document.getElementById("mobile-menu");
                if (
                    mobileMenu &&
                    !mobileMenu.classList.contains("hidden")
                ) {
                    mobileMenu.classList.add("hidden");
                }
            }
        });
    }
});

// Mobile menu toggle
const mobileMenuButton =
    document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// Animate on Scroll Effect
const animatedElements =
    document.querySelectorAll(".animate-on-scroll");
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach((element) => {
    observer.observe(element);
});

// Simple message box (replaces alert)
function showMessageBox(message, type = "info") {
    const messageBox = document.createElement("div");
    messageBox.classList.add(
        "fixed",
        "bottom-4",
        "right-4",
        "p-4",
        "rounded-lg",
        "shadow-xl",
        "text-white",
        "z-[1000]",
        "flex",
        "items-center"
    );

    if (type === "success") {
        messageBox.classList.add("bg-green-600");
        messageBox.innerHTML =
            '<i class="fas fa-check-circle mr-2"></i>' + message;
    } else if (type === "error") {
        messageBox.classList.add("bg-red-600");
        messageBox.innerHTML =
            '<i class="fas fa-times-circle mr-2"></i>' + message;
    } else {
        // info
        messageBox.classList.add("bg-blue-600");
        messageBox.innerHTML =
            '<i class="fas fa-info-circle mr-2"></i>' + message;
    }

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 5000);
}

// Dynamic background elements (stars, asteroids, comets, nebulae, ships)
document.addEventListener("DOMContentLoaded", () => {
    const galaxyBackground =
        document.querySelector(".galaxy-background");
    if (galaxyBackground) {
        const numberOfStars = 200;
        const numberOfAsteroids = 15;
        const numberOfComets = 5;
        const numberOfNebulae = 8;
        const numberOfShips = 4;

        // Create Stars
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${Math.random() * 3 + 2
                }s`;
            galaxyBackground.appendChild(star);
        }

        // Create Asteroids
        for (let i = 0; i < numberOfAsteroids; i++) {
            const asteroid = document.createElement("div");
            asteroid.classList.add("asteroid");
            const size = Math.random() * 50 + 20;
            asteroid.style.width = `${size}px`;
            asteroid.style.height = `${size}px`;
            const startLeft = Math.random() * 100;
            const endLeft = Math.random() * 100;
            asteroid.style.setProperty(
                "--start-left",
                `${startLeft}%`
            );
            asteroid.style.setProperty("--end-left", `${endLeft}%`);
            const scale = Math.random() * 0.5 + 0.8;
            asteroid.style.setProperty("--scale", scale);
            asteroid.style.animationDelay = `${Math.random() * 10
                }s`;
            asteroid.style.animationDuration = `${Math.random() * 8 + 7
                }s`;
            galaxyBackground.appendChild(asteroid);
        }

        // Create Comets
        for (let i = 0; i < numberOfComets; i++) {
            const comet = document.createElement("div");
            comet.classList.add("comet");
            const size = Math.random() * 3 + 2;
            comet.style.width = `${size}px`;
            comet.style.height = `${size}px`;
            const startX = Math.random() * 50;
            const startY = Math.random() * 50;
            comet.style.setProperty("--start-x", `${startX}vw`);
            comet.style.setProperty("--start-y", `${startY}vh`);
            const endX = Math.random() * 50 + 50;
            const endY = Math.random() * 50 + 50;
            comet.style.setProperty(
                "--travel-x",
                `${endX - startX}vw`
            );
            comet.style.setProperty(
                "--travel-y",
                `${endY - startY}vh`
            );
            comet.style.animationDuration = `${Math.random() * 4 + 3
                }s`;
            comet.style.animationDelay = `${Math.random() * 10}s`;
            galaxyBackground.appendChild(comet);
        }

        // Create Nebulae
        for (let i = 0; i < numberOfNebulae; i++) {
            const nebula = document.createElement("div");
            nebula.classList.add("nebula");
            const size = Math.random() * 200 + 100;
            nebula.style.width = `${size}px`;
            nebula.style.height = `${size}px`;
            nebula.style.left = `${Math.random() * 100}%`;
            nebula.style.top = `${Math.random() * 100}%`;
            nebula.style.animationDelay = `${Math.random() * 20}s`;
            nebula.style.animationDuration = `${Math.random() * 10 + 15
                }s`;
            galaxyBackground.appendChild(nebula);
        }

        // Create Space Ships
        // Using generic space-themed placeholder images without specific text on them
        const shipImages = [];

        for (let i = 0; i < 0; i++) {
            const shipDiv = document.createElement("div");
            shipDiv.classList.add("space-ship");

            const img = document.createElement("img");
            img.src =
                shipImages[
                Math.floor(Math.random() * shipImages.length)
                ];
            img.alt = `Generic Space Ship ${i + 1}`; // Alt text for accessibility
            shipDiv.appendChild(img);

            const size = Math.random() * 80 + 70; // Ships from 70px to 150px
            shipDiv.style.width = `${size}px`;
            shipDiv.style.height = `${size * 0.7}px`; // Maintain aspect ratio

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const driftX = (Math.random() - 0.5) * 50; // Drift +/- 25vw
            const driftY = (Math.random() - 0.5) * 50; // Drift +/- 25vh
            const initialRotation = Math.random() * 360;
            const finalRotation =
                initialRotation + (Math.random() - 0.5) * 180; // Drift rotation

            shipDiv.style.setProperty("--start-x", `${startX}vw`);
            shipDiv.style.setProperty("--start-y", `${startY}vh`);
            shipDiv.style.setProperty(
                "--end-x",
                `${startX + driftX}vw`
            );
            shipDiv.style.setProperty(
                "--end-y",
                `${startY + driftY}vh`
            );
            shipDiv.style.setProperty("--drift-x", `${driftX}vw`);
            shipDiv.style.setProperty("--drift-y", `${driftY}vh`);
            shipDiv.style.setProperty(
                "--initial-rotation",
                `${initialRotation}deg`
            );
            shipDiv.style.setProperty(
                "--final-rotation",
                `${finalRotation}deg`
            );

            shipDiv.style.animationDuration = `${Math.random() * 20 + 15
                }s`; // Slow drift: 15s-35s
            shipDiv.style.animationDelay = `${Math.random() * 15}s`; // Stagger animation

            galaxyBackground.appendChild(shipDiv);
        }
    }

    // Multilingual "Hello, I am" animation on Hero H1
    const heroMainGreetingContainer = document.getElementById(
        "hero-main-greeting-container"
    );

    const greetings = [
        "Hello", // English (start and final base)
        "नमस्ते", // Hindi
        "வணக்கம்", // Tamil
        "నమస్కారం", // Telugu
        "Hola", // Spanish
        "Bonjour", // French
    ];

    const fixedPart = ", I'm Sai Tejaswi"; // This part remains constant

    let languageCycleActive = false;
    let currentCycleIndex = 0; // Starts with English

    const flashDuration = 700; // milliseconds for each flash
    const flashTransition = 200; // milliseconds for the transition

    function startGreetingFlash() {
        if (languageCycleActive) return;
        languageCycleActive = true;

        // Set initial greeting (English)
        heroMainGreetingContainer.textContent =
            greetings[0] + fixedPart;
        heroMainGreetingContainer.style.opacity = "1";
        heroMainGreetingContainer.style.transform =
            "translateY(0px)";

        // Start the flashing sequence after a brief pause
        setTimeout(() => {
            currentCycleIndex = 1; // Start from the second language (Hindi)
            flashNextGreeting();
        }, 1500); // Display English for a bit before flashing
    }

    function flashNextGreeting() {
        // Temporarily disable transitions for immediate hide
        heroMainGreetingContainer.style.transition = "none";
        heroMainGreetingContainer.style.opacity = "0";
        heroMainGreetingContainer.style.transform = `translateY(${Math.random() * 20 - 10
            }px)`; // Random slight vertical shift

        // Check if we've cycled through all non-English greetings
        if (currentCycleIndex >= greetings.length) {
            // Reset to final English version
            heroMainGreetingContainer.textContent =
                greetings[0] + fixedPart;
            heroMainGreetingContainer.style.opacity = "1";
            heroMainGreetingContainer.style.transform =
                "translateY(0px)";
            languageCycleActive = false; // Stop the animation
            currentCycleIndex = 0; // Reset index for next time hero section is visible
        } else {
            // Set new content
            heroMainGreetingContainer.textContent =
                greetings[currentCycleIndex] + fixedPart;

            // Force reflow for transition to apply
            void heroMainGreetingContainer.offsetWidth;

            // Apply transition and show the new content
            heroMainGreetingContainer.style.transition = `opacity ${flashTransition}ms ease-out, transform ${flashTransition}ms ease-out`;
            heroMainGreetingContainer.style.opacity = "1";
            heroMainGreetingContainer.style.transform =
                "translateY(0px)";

            currentCycleIndex++; // Move to the next language
            setTimeout(flashNextGreeting, flashDuration); // Continue flashing
        }
    }

    const heroSection = document.getElementById("hero");
    if (heroSection) {
        const heroObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (
                        entry.isIntersecting &&
                        !languageCycleActive
                    ) {
                        startGreetingFlash();
                        heroObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        heroObserver.observe(heroSection);
    }

    // Modal functionality
    const detailModal = document.getElementById("detailModal");
    const closeModalButton =
        document.getElementById("closeModalButton");
    const modalTitle = document.getElementById("modalTitle");
    const modalBriefDescription = document.getElementById(
        "modalBriefDescription"
    );
    const techTagsContainer = document.getElementById("techTags");
    const certList = document.getElementById("certList");
    const modalLiveLink = document.getElementById("modalLiveLink");
    const modalGithubLink =
        document.getElementById("modalGithubLink");
    const modalTechnologiesSection =
        document.getElementById("modalTechnologies");
    const modalCertificationsSection = document.getElementById(
        "modalCertifications"
    );

    if (
        detailModal &&
        closeModalButton &&
        modalTitle &&
        modalBriefDescription &&
        certList &&
        modalLiveLink &&
        modalGithubLink &&
        modalCertificationsSection
    ) {
        function openModal(data) {
            console.log('data: ', data);
            modalTitle.textContent =
                data.title || "Untitled Project/Skill";
            modalBriefDescription.innerHTML =
                data.fullDescription || data.briefDescription ||
                "No brief description available.";

            techTagsContainer.innerHTML = "";
            if (data.technologies) {
                modalTechnologiesSection.classList.remove("hidden");
                data.technologies
                    .split(",")
                    .map((tech) => tech.trim())
                    .forEach((tech) => {
                        const span = document.createElement("span");
                        span.classList.add("modal-tech-tag");
                        span.textContent = tech;
                        techTagsContainer.appendChild(span);
                    });
            } else {
                modalTechnologiesSection.classList.add("hidden");
            }

            certList.innerHTML = "";
            if (
                data.certifications &&
                data.certifications.toLowerCase() !== "nil"
            ) {
                modalCertificationsSection.classList.remove(
                    "hidden"
                );
                data.certifications
                    .split(",")
                    .map((cert) => cert.trim())
                    .forEach((cert) => {
                        const li = document.createElement("li");
                        li.classList.add("modal-cert-item");
                        li.innerHTML = `<i class="fas fa-check-circle"></i> ${cert}`;
                        certList.appendChild(li);
                    });
            } else {
                modalCertificationsSection.classList.add("hidden");
            }

            if (data.liveLink && data.liveLink !== "#") {
                modalLiveLink.href = data.liveLink;
                modalLiveLink.classList.remove("hidden");
            } else {
                modalLiveLink.classList.add("hidden");
            }

            if (data.githubLink && data.githubLink !== "#") {
                modalGithubLink.href = data.githubLink;
                modalGithubLink.classList.remove("hidden");
            } else {
                modalGithubLink.classList.add("hidden");
            }

            detailModal.classList.add("is-open");
            document.body.style.overflow = "hidden";
        }

        function closeModal() {
            detailModal.classList.remove("is-open");
            document.body.style.overflow = "";
        }

        closeModalButton.addEventListener("click", closeModal);
        detailModal.addEventListener("click", (e) => {
            if (e.target === detailModal) {
                closeModal();
            }
        });
    }

    // Attach click listeners to Project Cards and Skill Cards for 3D tilt effect and modal opening
    document
        .querySelectorAll(".project-card, .skill-card")
        .forEach((card) => {
            const initialTransform = card.style.transform;

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;

                const rotateY = (mouseX / (rect.width / 2)) * 10;
                const rotateX = (mouseY / (rect.height / 2)) * -10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${initialTransform}`;
                card.style.transition = "none";
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = initialTransform;
                card.style.transition =
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out";
            });

            card.addEventListener("click", () => {
                const isProject =
                    card.classList.contains("project-card");
                let data;
                if (isProject) {
                    data = {
                        title: card.dataset.title,
                        briefDescription:
                            card.dataset.briefDescription,
                        fullDescription:
                            card.dataset.fullDescription,
                        technologies: card.dataset.technologies,
                        certifications: card.dataset.certifications,
                        liveLink: card.dataset.liveLink,
                        githubLink: card.dataset.githubLink,
                    };
                } else {
                    data = {
                        title: card.dataset.title,
                        briefDescription: card.dataset.description,
                        fullDescription: card.dataset.description, // Skills use 'description' as full for simplicity
                        technologies: card.dataset.technologies,
                        certifications: card.dataset.certifications,
                        liveLink: null,
                        githubLink: null,
                    };
                }
                if (detailModal) {
                    openModal(data);
                }
            });
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const copyButton = document.querySelector('.copy-button');
    const emailAddressSpan = document.getElementById('email-address');

    if (copyButton && emailAddressSpan) {
        copyButton.addEventListener('click', function () {
            const email = emailAddressSpan.textContent;

            navigator.clipboard.writeText(email).then(() => {
                const originalIcon = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = originalIcon;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                textArea.remove();

                const originalIcon = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = originalIcon;
                }, 2000);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');
    const skillCards = document.querySelectorAll('.skill-card');
    const detailModal = document.getElementById('detailModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const modalTitle = document.getElementById('modalTitle');
    const modalBriefDescription = document.getElementById('modalBriefDescription');
    const techTags = document.getElementById('techTags');
    const modalTechnologies = document.getElementById('modalTechnologies');
    const modalCertifications = document.getElementById('modalCertifications');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalGithubLink = document.getElementById('modalGithubLink');

    [...skillCards, ...projectCards].forEach(card => {
        card.addEventListener('click', function () {
            const title = card.dataset.title;
            const fullDescription = card.dataset.fullDescription || card.dataset.description;
            const technologies = card.dataset.technologies;
            const githubLink = card.dataset.githubLink;

            modalTitle.textContent = title;

            modalBriefDescription.innerHTML = '';

            if (card.dataset.type === 'project' && fullDescription) {
                const descriptionPoints = fullDescription.split('$$').filter(point => point.trim() !== '');

                if (descriptionPoints.length > 0) {
                    const ul = document.createElement('ul');
                    ul.classList.add('list-disc', 'list-inside', 'space-y-2', 'ml-[15px]', 'text-gray-300');

                    descriptionPoints.forEach(pointText => {
                        const li = document.createElement('li');
                        li.textContent = pointText.trim();
                        ul.appendChild(li);
                    });
                    modalBriefDescription.appendChild(ul);
                } else {
                    const p = document.createElement('p');
                    p.textContent = fullDescription.trim();
                    p.classList.add('text-gray-300', 'mb-6');
                    modalBriefDescription.appendChild(p);
                }
            } else {

                const p = document.createElement('p');
                p.textContent = fullDescription ? fullDescription : "No detailed description available for this project.";
                p.classList.add('text-gray-300', 'mb-6');
                modalBriefDescription.appendChild(p);
            }

            techTags.innerHTML = '';
            if (technologies) {
                modalTechnologies.classList.remove('hidden');
                technologies.split(',').forEach(tech => {
                    const span = document.createElement('span');
                    span.classList.add('bg-gray-600', 'text-gray-300', 'px-3', 'py-1', 'rounded-full');
                    span.textContent = tech.trim();
                    techTags.appendChild(span);
                });
            } else {
                modalTechnologies.classList.add('hidden');
            }

            // Populate Links section
            if (githubLink) {
                modalGithubLink.href = githubLink;
                modalGithubLink.classList.remove('hidden');
            } else {
                modalGithubLink.classList.add('hidden');
            }
            modalLiveLink.classList.add('hidden');
            modalCertifications.classList.add('hidden');
            detailModal.classList.remove('hidden');
        });
    });

    // Close modal event listeners
    closeModalButton.addEventListener('click', function () {
        detailModal.classList.add('hidden');
    });

    detailModal.addEventListener('click', function (event) {
        if (event.target === detailModal) {
            detailModal.classList.add('hidden');
        }
    });
});
