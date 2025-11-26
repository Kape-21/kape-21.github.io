document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const path = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const isActive = href === path;

    if (isActive) {
      link.classList.remove("text-slate-600", "text-slate-700");
      link.classList.add(
        "text-sky-700",
        "border-b-2",
        "border-sky-600",
        "pb-1",
        "font-semibold"
      );
    }
  });

  const brandName = document.getElementById("brand-name");
  if (brandName && (path === "" || path === "index.html")) {
    brandName.classList.remove("text-slate-900");
    brandName.classList.add("text-sky-700");
  }
});
