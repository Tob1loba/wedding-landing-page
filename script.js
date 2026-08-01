const weddingDate = new Date("December 5, 2026 16:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

const sections = document.querySelectorAll("section");
const navlinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    sections.forEach((section) => {
        const headerHeight = document.querySelector("header").offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 20;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {
            const currentSection = section.id;

            navlinks.forEach((link) => {
                link.classList.remove("active");
                if (link.dataset.section === currentSection) {
                    link.classList.add("active");
                }
            });
        }
    });
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove("hidden");
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px"
});
sections.forEach((section, index) => {
    if (index !== 0) {
        section.classList.add("hidden");
    }
    observer.observe(section);
});

// ==========================
// Gallery Lightbox
// ==========================

const galleryImages = document.querySelectorAll(".gallery-grid img");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const closeLightbox = document.querySelector(".close-lightbox");

galleryImages.forEach(image => {
    image.addEventListener("click", () => {
        lightbox.classList.add("show");
        lightboxImage.src = image.src;
    });
});

closeLightbox.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

lightbox.addEventListener("click", e => {
    if(e.target === lightbox){
        lightbox.classList.remove("show");
    }
});

// ===============================
// FAQ Accordion
// ===============================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
        const currentItem = question.parentElement;

        // Close every other FAQ
        document.querySelectorAll(".faq-item").forEach(item => {
            if (item !== currentItem) {
                item.classList.remove("active");
            }
        });
        // Toggle the clicked FAQ
        currentItem.classList.toggle("active");
    });
});

// ===============================
// RSVP Form Submission
// ===============================

const rsvpForm = document.querySelector(".rsvp-form");
const successMessage = document.querySelector(".success-message");
const submitBtn = document.getElementById("submit-btn");

rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    const formData = new FormData(rsvpForm);

    try {
        await fetch(
            "https://script.google.com/macros/s/AKfycbyAj8cB3ta3No4lCP6_VPJhF-16KcJV5nlb7JMeyNsSGd7K5fj14PgDLSU4N9aygEIs/exec",
            {
                method: "POST",
                body: formData
            }
        );

        successMessage.classList.add("show");
        submitBtn.textContent = "✓ RSVP Sent";
        rsvpForm.reset();

        setTimeout(() => {
            successMessage.classList.remove("show");
            submitBtn.disabled = false;
            submitBtn.textContent = "Send RSVP";
        }, 2000);

    } catch (error) {
        console.error(error);
        alert("Unable to send RSVP.");
    }
});

updateCountdown(); // Initial call to display the countdown immediately

setInterval(updateCountdown, 1000);