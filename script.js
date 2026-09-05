/* =========================================================
   BJMAHAR.COM
   Main interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     CURRENT YEAR
  --------------------------------------------------------- */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* ---------------------------------------------------------
     HEADER ON SCROLL
  --------------------------------------------------------- */

  const header = document.querySelector(".site-header");

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* ---------------------------------------------------------
     MOBILE MENU
  --------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");

  function closeMenu() {
    if (!menuToggle || !siteNav) return;

    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = siteNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      document.body.classList.toggle("menu-open", isOpen);
    });

  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });


  /* ---------------------------------------------------------
     ESCAPE KEY CLOSES MOBILE MENU
  --------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  /* ---------------------------------------------------------
     SCROLL REVEALS
  --------------------------------------------------------- */

  const revealTargets = document.querySelectorAll(
    [
      ".intro-section .section-inner",
      ".story-content",
      ".feature-content",
      ".neighborhood-section .section-inner",
      ".favorites-section .section-inner",
      ".resources-section .section-inner",
      ".about-section .story-content",
      ".real-estate-cta .section-inner",
      ".contact-section .section-inner"
    ].join(",")
  );

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
  });

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {

    revealTargets.forEach((element) => {
      element.classList.add("visible");
    });

  } else {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealTargets.forEach((element) => {
      revealObserver.observe(element);
    });

  }


  /* ---------------------------------------------------------
     SUBTLE HERO MOVEMENT
     This is temporary.

     Later this section can be replaced by the full cinematic
     sequence:

     1. Pikes Peak establishes the scene.
     2. BJ walks into frame.
     3. BJ MAHAR animates into position.
     4. COLORADO SPRINGS locks underneath.
     5. Intro copy + navigation appear.
  --------------------------------------------------------- */

  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  function updateHero() {

    if (!hero || !heroContent || reducedMotion) return;

    const heroHeight = hero.offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition <= heroHeight) {

      const progress = Math.min(
        scrollPosition / heroHeight,
        1
      );

      heroContent.style.transform =
        `translateY(${progress * 45}px)`;

      heroContent.style.opacity =
        `${1 - progress * 0.65}`;
    }

  }

  updateHero();

  window.addEventListener("scroll", updateHero, {
    passive: true
  });


  /* ---------------------------------------------------------
     PLACEHOLDER CONTACT FORM

     The form does NOT send anywhere yet.

     Later we'll connect this to a form service or another
     backend so messages actually reach BJ.
  --------------------------------------------------------- */

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const button = contactForm.querySelector(
        'button[type="submit"]'
      );

      if (!button) return;

      const originalText = button.textContent;

      button.textContent = "Coming soon";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1800);

    });

  }

});
