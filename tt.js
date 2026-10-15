"use strict";

    // Atualiza automaticamente o ano do rodapé.
    document.getElementById("year").textContent =
      new Date().getFullYear();

    // Controla a aparência do cabeçalho durante a navegação.
    const header = document.getElementById("header");

    function updateHeader() {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    // Abre e fecha o menu em dispositivos móveis.
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Fecha o menu depois de selecionar uma secção.
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      });
    });

    // Revela os elementos quando entram no campo de visão.
    const revealElements = document.querySelectorAll(".reveal");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      });

      revealElements.forEach((element) => observer.observe(element));
    } else {
      revealElements.forEach((element) => {
        element.classList.add("visible");
      });
    }

    // Anima as barras de competências apenas quando são visíveis.
    const skillCards = document.querySelectorAll(".skill");

    if ("IntersectionObserver" in window && !reduceMotion) {
      const skillObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      skillCards.forEach((card) => skillObserver.observe(card));
    } else {
      skillCards.forEach((card) => card.classList.add("visible"));
    }

    // Permite fechar o menu com a tecla Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      }
    });