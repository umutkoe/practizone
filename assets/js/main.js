const menuButton = document.querySelector("[data-mobile-toggle]");
const navWrap = document.querySelector("[data-nav-wrap]");

if (menuButton && navWrap) {
  menuButton.addEventListener("click", () => {
    const isOpen = navWrap.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentPath = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  const linkPath = link.getAttribute("href");
  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});

const portalToggle = document.querySelector("[data-portal-toggle]");
const portalControl = document.querySelector("[data-portal-control]");
const portalMenu = document.querySelector("[data-portal-menu]");
const portalLink = portalToggle ? portalToggle.dataset.portalLink : "";

if (portalToggle && portalControl && portalMenu) {
  const setPortalState = (isOpen) => {
    portalControl.classList.toggle("is-open", isOpen);
    portalToggle.setAttribute("aria-expanded", String(isOpen));
    portalMenu.setAttribute("aria-hidden", String(!isOpen));
  };

  portalToggle.addEventListener("click", (event) => {
    const isOpen = portalControl.classList.contains("is-open");

    if (isOpen && portalLink) {
      window.location.href = portalLink;
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setPortalState(!isOpen);
  });

  const closePortal = () => setPortalState(false);

  portalControl.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  portalMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (!portalControl.contains(event.target)) {
      closePortal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePortal();
    }
  });
  if (currentPath === "portal.html") {
    setPortalState(true);
  }
}

const staggerParents = document.querySelectorAll(".stagger-parent");
staggerParents.forEach((parent) => {
  Array.from(parent.children).forEach((child, index) => {
    child.style.setProperty("--stagger-index", String(index));
  });
});

const revealItems = document.querySelectorAll(".reveal, .reveal-up, .soft-scale");

if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Reading progress bar
const readingProgressBar = document.querySelector(".reading-progress-bar");
if (readingProgressBar) {
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / totalHeight) * 100;
    readingProgressBar.style.width = scrolled + "%";
  });
}

// Set current year in footer elements with class "current-year"
document.addEventListener("DOMContentLoaded", () => {
  const yearEls = document.querySelectorAll('.current-year');
  const y = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = String(y);
  });
});
