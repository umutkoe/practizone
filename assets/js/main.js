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

// Contact Form Activation & Lead Attribution Tracking
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("form.form-grid");
  if (!contactForm) return;

  // 1. Lead Attribution: Extract UTM parameters and referring URL
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");

  const utmSourceInput = document.getElementById("utm_source");
  const utmMediumInput = document.getElementById("utm_medium");
  const utmCampaignInput = document.getElementById("utm_campaign");
  const referringSiteInput = document.getElementById("referring_site");
  const submissionDateInput = document.getElementById("submission_date");

  if (utmSourceInput && utmSource) {
    utmSourceInput.value = utmSource;
  }
  if (utmMediumInput && utmMedium) {
    utmMediumInput.value = utmMedium;
  }
  if (utmCampaignInput && utmCampaign) {
    utmCampaignInput.value = utmCampaign;
  }
  if (referringSiteInput) {
    referringSiteInput.value = document.referrer || "direct";
  }

  // Helper for displaying form status alerts
  const alertBox = document.getElementById("form-alert");
  const displayStatus = (type, htmlMessage) => {
    if (alertBox) {
      alertBox.className = `form-status is-${type}`;
      alertBox.innerHTML = htmlMessage;
      alertBox.style.display = "block";
      alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // Check URL query parameters for redirect return (?submitted=true or ?success=true)
  if (urlParams.get("submitted") === "true" || urlParams.get("success") === "true") {
    displayStatus(
      "success",
      '<i class="fas fa-check-circle"></i> <strong>Thank you!</strong> Your message has been sent successfully. A PractiZone representative will contact you shortly.'
    );
    contactForm.style.display = "none";
  }

  // 2. Submit Handler: Honeypot check, timestamp population, and AJAX submission
  contactForm.addEventListener("submit", async (e) => {
    // Honeypot spam verification
    const honeypot = contactForm.querySelector('input[name="_hp_check"]');
    if (honeypot && honeypot.value.trim() !== "") {
      e.preventDefault();
      console.warn("[Anti-Spam] Submission blocked: Honeypot trap triggered.");
      return;
    }

    // Populate submission timestamp (ISO string)
    if (submissionDateInput) {
      submissionDateInput.value = new Date().toISOString();
    }

    // Client-side privacy compliance consent check
    const consentCheckbox = document.getElementById("privacy_consent");
    if (consentCheckbox && !consentCheckbox.checked) {
      e.preventDefault();
      displayStatus(
        "error",
        '<i class="fas fa-exclamation-circle"></i> Please accept the Privacy Policy to proceed with your submission.'
      );
      return;
    }

    // AJAX Form Submission
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : "Submit";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    }

    try {
      const formData = new FormData(contactForm);
      const response = await fetch("https://formsubmit.co/ajax/info@practizone.ca", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData
      });

      if (response.ok) {
        displayStatus(
          "success",
          '<i class="fas fa-check-circle"></i> <strong>Thank you!</strong> Your message has been received. Our team will contact you shortly.'
        );
        contactForm.reset();
        contactForm.style.display = "none";
      } else {
        // Fallback to standard form submission if AJAX response is not ok
        console.warn("[FormSubmit] AJAX non-200 response, falling back to standard submit:", response.status);
        contactForm.submit();
      }
    } catch (err) {
      console.warn("[FormSubmit] Fetch error, falling back to standard submit:", err);
      // Fallback to standard submit
      contactForm.submit();
    }
  });
});
