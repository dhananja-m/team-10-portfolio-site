// MEMBER 3: all JavaScript interactivity
// ==========================================
// MEMBER 3: Navigation & Theme Interactivity
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. MOBILE MENU TOGGLE
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      navigation.classList.toggle("show");
    });

    navigation.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("show");
      });
    });
  }

  // 2. DARK-MODE TOGGLE
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
      }
    });
  }

  // 3. ACTIVE-LINK HIGHLIGHT ON SCROLL
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
  // 4. TYPING EFFECT
  const typingElement = document.querySelector(".typing-text");
  const words = ["passion", "purpose", "code", "creativity"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // 5. FORM VALIDATION
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("name").value.trim();
      const emailInput = document.getElementById("email").value.trim();
      const messageInput = document.getElementById("message").value.trim();

      if (nameInput === "" || emailInput === "" || messageInput === "") {
        alert("Please fill in all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (formMessage) {
        formMessage.style.display = "block";
        formMessage.textContent = `Thanks ${nameInput}! Your message was sent successfully.`;
      }

      contactForm.reset();

      setTimeout(() => {
        if (formMessage) formMessage.style.display = "none";
      }, 5000);
    });
  }
});