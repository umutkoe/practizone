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
  const linkPath = (link.getAttribute("href") || "").replace(/^\//, "");
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

// Outbound referral tracking for PractiOne links
function trackOutboundReferral(targetUrl, linkText, placement) {
  const eventPayload = {
    event: 'outbound_referral_click',
    link_url: targetUrl,
    link_domain: 'practione.ca',
    link_text: linkText,
    placement: placement || 'referral_button',
    outbound: true,
    timestamp: new Date().toISOString()
  };

  // Push to dataLayer (Google Tag Manager)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);

  // Send event via gtag if present (Google Analytics 4)
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'outbound_referral_click', {
      link_url: targetUrl,
      link_domain: 'practione.ca',
      link_text: linkText,
      placement: placement,
      outbound: true,
      transport_type: 'beacon'
    });
  }

  // Dispatch CustomEvent on window for custom analytics listeners
  window.dispatchEvent(new CustomEvent('outbound_referral_click', { detail: eventPayload }));

  console.info('[Analytics] outbound_referral_click dispatched:', eventPayload);
}

// Global delegated listener: Zero DOM overhead, resilient to timing and dynamic nodes
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href*="practione.ca"]');
  if (!link) return;

  const targetUrl = link.href;
  const linkText = (link.textContent || '').trim().replace(/\s+/g, ' ');
  const placement =
    link.dataset.placement ||
    (link.closest('.consulting-teaser') ? 'homepage_teaser' :
     link.closest('.hero-actions') ? 'hero_cta' :
     link.closest('.window-actions') ? 'middle_cta' :
     link.closest('.site-footer') ? 'footer' : 'page_link');

  trackOutboundReferral(targetUrl, linkText, placement);
});
