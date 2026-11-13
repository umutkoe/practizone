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
    const parentDropdown = link.closest(".nav-item-dropdown");
    if (parentDropdown) {
      const toggle = parentDropdown.querySelector(".nav-dropdown-toggle");
      if (toggle) toggle.classList.add("active");
    }
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

// Outbound partner click tracking for MylaTraining external links
document.querySelectorAll('a[href*="mylatraining.com"]').forEach(link => {
  link.addEventListener('click', function(e) {
    if (typeof gtag === 'function') {
      gtag('event', 'partner_outbound_click', {
        'event_category': 'Partner',
        'partner_name': 'MylaTraining',
        'source_site': 'PractiZone',
        'link_url': this.href
      });
    }
  });
});

/**
 * Builds a structured JSON lead payload ready for LeadsMagnet CRM / webhook ingestion.
 * Serializes standard form inputs, categorization, and full UTM / attribution metadata.
 * @param {HTMLFormElement} formElement
 * @returns {Object} Structured CRM payload
 */
function buildCrmLeadPayload(formElement) {
  if (!formElement) return null;
  const formData = new FormData(formElement);
  const inquiryType = (formData.get("inquiry_type") || "").toString().trim();

  let leadCategory = "general";
  if (inquiryType.toLowerCase().startsWith("employer")) {
    leadCategory = "employer_staffing_lead";
  } else if (inquiryType.toLowerCase().includes("candidate")) {
    leadCategory = "candidate_registration";
  } else if (inquiryType.toLowerCase().includes("consulting")) {
    leadCategory = "consulting_inquiry";
  }

  const payload = {
    source_site: "PractiZone",
    lead_category: leadCategory,
    inquiry_type: inquiryType || "General Inquiry",
    contact_details: {
      name: (formData.get("name") || "").toString().trim(),
      practice_name: (formData.get("practice_name") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      phone: (formData.get("phone") || "").toString().trim(),
      subject: (formData.get("subject") || "").toString().trim(),
      message: (formData.get("message") || "").toString().trim(),
      privacy_consent: formData.get("privacy_consent") === "on" || formData.get("privacy_consent") === "true"
    },
    attribution: {
      utm_source: (formData.get("utm_source") || "direct").toString(),
      utm_medium: (formData.get("utm_medium") || "none").toString(),
      utm_campaign: (formData.get("utm_campaign") || "").toString(),
      referring_site: (formData.get("referring_site") || (typeof document !== "undefined" ? document.referrer || "direct" : "direct")).toString(),
      landing_page: (formData.get("landing_page") || (typeof window !== "undefined" ? window.location.href : "")).toString(),
      submission_date: (formData.get("submission_date") || new Date().toISOString()).toString()
    },
    crm_integration: {
      target: "LeadsMagnet",
      ready_for_dispatch: true,
      schema_version: "1.0",
      created_at: new Date().toISOString()
    }
  };

  return payload;
}

if (typeof window !== "undefined") {
  window.buildCrmLeadPayload = buildCrmLeadPayload;
}

// Distinct GA4 Portal Tracking for Employer vs. Candidate Clicks
document.addEventListener("click", (event) => {
  const portalLink = event.target.closest('a[href*="portal.html"], a[href*="stafstar.com"]');
  if (!portalLink) return;

  const href = portalLink.getAttribute("href") || "";
  const linkText = (portalLink.textContent || "").trim().toLowerCase();

  let direction = null;

  if (href.includes("login/professional")) {
    direction = "candidate";
  } else if (href.includes("login/employer") || href.includes("job-posting")) {
    direction = "employer";
  } else {
    // Discriminate based on button text / context
    const candidateKeywords = [
      "apply",
      "shift",
      "candidate",
      "professional",
      "register",
      "pick up",
      "job seeker",
      "schedule",
      "log in as a professional"
    ];
    const employerKeywords = [
      "employer",
      "request staffing",
      "find a candidate",
      "hire",
      "post",
      "clinic",
      "manage staffing",
      "manage"
    ];

    if (candidateKeywords.some((kw) => linkText.includes(kw))) {
      direction = "candidate";
    } else if (employerKeywords.some((kw) => linkText.includes(kw))) {
      direction = "employer";
    }
  }

  const cleanText = (portalLink.textContent || "").trim().replace(/\s+/g, " ");

  if (direction === "candidate") {
    if (typeof gtag === "function") {
      gtag("event", "candidate_portal_click", {
        event_category: "Candidate Portal",
        destination: href,
        link_text: cleanText,
        source_site: "PractiZone"
      });
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "candidate_portal_click",
      event_category: "Candidate Portal",
      destination: href,
      link_text: cleanText
    });
    console.info("[Analytics] candidate_portal_click dispatched:", cleanText, href);
  } else if (direction === "employer") {
    if (typeof gtag === "function") {
      gtag("event", "employer_portal_click", {
        event_category: "Employer Portal",
        destination: href,
        link_text: cleanText,
        source_site: "PractiZone"
      });
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "employer_portal_click",
      event_category: "Employer Portal",
      destination: href,
      link_text: cleanText
    });
    console.info("[Analytics] employer_portal_click dispatched:", cleanText, href);
  }
});

// Contact Form Activation & Lead Attribution Tracking
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("form.form-grid");
  if (!contactForm) return;

  // 1. Lead Attribution: Extract UTM parameters, landing page, and referring URL
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");

  const utmSourceInput = document.getElementById("utm_source");
  const utmMediumInput = document.getElementById("utm_medium");
  const utmCampaignInput = document.getElementById("utm_campaign");
  const referringSiteInput = document.getElementById("referring_site");
  const landingPageInput = document.getElementById("landing_page");
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
  if (landingPageInput) {
    landingPageInput.value = window.location.href;
  }

  // Inquiry type, dynamic subject updater, and candidate inline notice
  const inquiryTypeSelect = document.getElementById("inquiry_type");
  const candidateNotice = document.getElementById("candidate-portal-notice");
  const practiceNameInput = document.getElementById("practice_name");
  const nameInput = document.getElementById("name");
  const subjectHiddenInput = document.getElementById("_subject");

  const updateDynamicSubject = () => {
    if (!subjectHiddenInput) return;
    const inquiryType = inquiryTypeSelect ? inquiryTypeSelect.value.trim() : "";
    const practiceName = practiceNameInput ? practiceNameInput.value.trim() : "";
    const contactName = nameInput ? nameInput.value.trim() : "";
    const identifier = practiceName || contactName || "New Lead";

    if (inquiryType.startsWith("Employer: Temporary Staffing")) {
      subjectHiddenInput.value = `[PractiZone Lead] Employer Staffing Request - ${identifier}`;
    } else if (inquiryType.startsWith("Employer: Permanent Recruitment")) {
      subjectHiddenInput.value = `[PractiZone Lead] Employer Permanent Recruitment - ${identifier}`;
    } else if (inquiryType.startsWith("Dental Professional: Candidate Registration")) {
      subjectHiddenInput.value = `[PractiZone Candidate] Registration - ${identifier}`;
    } else if (inquiryType.startsWith("Practice Consulting")) {
      subjectHiddenInput.value = `[PractiZone Consulting] Practice Assessment - ${identifier}`;
    } else if (inquiryType) {
      subjectHiddenInput.value = `[PractiZone Lead] ${inquiryType} - ${identifier}`;
    } else {
      subjectHiddenInput.value = `[PractiZone Lead] General Inquiry - ${identifier}`;
    }
  };

  if (inquiryTypeSelect) {
    inquiryTypeSelect.addEventListener("change", () => {
      const selected = inquiryTypeSelect.value;
      if (candidateNotice) {
        if (selected === "Dental Professional: Candidate Registration") {
          candidateNotice.style.display = "block";
        } else {
          candidateNotice.style.display = "none";
        }
      }
      updateDynamicSubject();
    });
  }

  if (practiceNameInput) {
    practiceNameInput.addEventListener("input", updateDynamicSubject);
  }
  if (nameInput) {
    nameInput.addEventListener("input", updateDynamicSubject);
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

  // 2. Submit Handler: Honeypot check, timestamp population, GA4 conversion, and AJAX submission
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
    if (landingPageInput && !landingPageInput.value) {
      landingPageInput.value = window.location.href;
    }

    // Ensure subject line is fresh
    updateDynamicSubject();

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

    // Build structured CRM lead payload ready for LeadsMagnet integration
    const crmPayload = buildCrmLeadPayload(contactForm);
    console.info("[LeadsMagnet CRM Payload Prepared]:", crmPayload);
    window.dispatchEvent(new CustomEvent("crm_lead_payload_ready", { detail: crmPayload }));

    // Distinct GA4 Conversion Tracking per Section 2 & 3 Client Brief
    const selectedType = inquiryTypeSelect ? inquiryTypeSelect.value.trim() : "";
    const isEmployerLead = selectedType.toLowerCase().startsWith("employer");

    if (typeof gtag === "function") {
      if (isEmployerLead) {
        // Strictly employer sales lead conversion event
        gtag('event', 'generate_lead', {
          'event_category': 'Employer Lead',
          'inquiry_type': selectedType,
          'source_site': 'PractiZone'
        });
      } else if (selectedType.toLowerCase().includes("candidate")) {
        // Candidate inquiry event (separate from employer sales leads)
        gtag('event', 'candidate_registration_form', {
          'event_category': 'Candidate Registration',
          'inquiry_type': selectedType,
          'source_site': 'PractiZone'
        });
      } else {
        gtag('event', 'contact_inquiry', {
          'event_category': 'General Inquiry',
          'inquiry_type': selectedType,
          'source_site': 'PractiZone'
        });
      }
    }

    // Push to dataLayer for Google Tag Manager
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: isEmployerLead ? 'generate_lead' : 'contact_form_submission',
      event_category: isEmployerLead ? 'Employer Lead' : 'General/Candidate Inquiry',
      inquiry_type: selectedType,
      source_site: 'PractiZone',
      crm_ready: true
    });

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
