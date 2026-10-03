/* ============================================================
   JPress UI v2 — vanilla JS (no jQuery / Bootstrap required)
   Features: theme toggle, mobile nav, dropdown, scroll state,
             reveal-on-scroll animations, TOC scroll-spy.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Theme toggle (persisted) ---------- */
  const root = document.documentElement;
  const saved = localStorage.getItem("jpress-theme");
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.setAttribute("data-theme", "light");
  }
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("jpress-theme", next);
    });
  });

  /* ---------- Mobile navigation ---------- */
  const burger = document.querySelector("[data-burger]");
  const navLinks = document.querySelector("[data-nav-links]");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Dropdown menus (click + keyboard) ---------- */
  document.querySelectorAll(".dropdown").forEach((dd) => {
    const toggle = dd.querySelector(".dropdown-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = dd.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (e) => {
      if (!dd.contains(e.target)) {
        dd.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dd.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ---------- Navbar scrolled state ---------- */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      }),
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- TOC scroll-spy ---------- */
  const tocLinks = Array.from(document.querySelectorAll(".toc a[href^='#']"));
  if ("IntersectionObserver" in window && tocLinks.length) {
    const map = new Map();
    tocLinks.forEach((a) => {
      const t = document.getElementById(a.hash.slice(1));
      if (t) map.set(t, a);
    });
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          tocLinks.forEach((a) => a.classList.remove("active"));
          const link = map.get(en.target);
          if (link) link.classList.add("active");
        }
      }),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    map.forEach((_, section) => spy.observe(section));
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
