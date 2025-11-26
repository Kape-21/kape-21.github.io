document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const toggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden");
    });
  }

  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // AOS init (if library is loaded)
  if (window.AOS) {
    AOS.init({
      duration: 700,
      offset: 80,
      easing: "ease-out",
      once: true,
    });
  }
});
