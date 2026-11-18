# Technical Attribution, UTM Convention & CRM Integration Specification

> **INTERNAL TECHNICAL SPECIFICATION (DO NOT PUBLISH)**  
> Aligned with Client Master Brief **Sections 2, 3, and 11**. Stored in `/internal/` and blocked from crawlers via `robots.txt` (`Disallow: /internal/`).

---

## 1. Standardized Cross-Domain UTM & Attribution Convention

All cross-site referral links between **PractiZone** (`practizone.ca`) and **PractiOne** (`practione.ca`), as well as campaign links and hidden form fields on `/contact.html`, must adhere to the following standardized parameters.

### 1.1 Required Attribution Parameters

| Parameter | Description | Allowed / Standard Values |
| --- | --- | --- |
| `utm_source` | Origin platform or referring brand | `practizone`, `practione`, `google`, `linkedin`, `instagram`, `direct` |
| `utm_medium` | Marketing or referral channel | `referral`, `organic`, `cpc`, `social`, `email`, `none` |
| `utm_campaign` | Specific initiative, bridge, or placement | `consulting_bridge`, `staffing_bridge`, `ontario_rdh_2026`, `gta_local_seo`, `cybersecurity_partner` |
| `referring_site` | `document.referrer` captured at landing or `direct` | Full referrer URL or `direct` |
| `landing_page` | First page URL visited in the session (`window.location.href`) | e.g., `https://practizone.ca/hygienist-staffing.html` |
| `submission_date` | ISO-8601 UTC timestamp at form submission | e.g., `2026-11-18T15:30:00.000Z` |

### 1.2 Cross-Domain Link Formatting

- **PractiZone -> PractiOne (`practione.ca`):**
  ```text
  https://practione.ca/contact?utm_source=practizone&utm_medium=referral&utm_campaign=consulting_bridge
  ```
- **PractiOne -> PractiZone (`practizone.ca`):**
  ```text
  https://practizone.ca/contact.html?utm_source=practione&utm_medium=referral&utm_campaign=staffing_bridge
  ```
- **Hidden Form Persistence (`assets/js/main.js`):**
  - On page load, `assets/js/main.js` parses `window.location.search` for `utm_source`, `utm_medium`, `utm_campaign` (persisting defaults when absent) and populates hidden form inputs alongside `referring_site`, `landing_page`, and `submission_date`.

---

## 2. GA4 Event Map

All events are pushed to `window.dataLayer` (for GTM) and dispatched via `window.gtag('event', ...)` in `assets/js/main.js` (when GA4 is loaded).

| GA4 Event Name | Trigger Condition | Key Event Parameters | Implementation Status |
| --- | --- | --- | --- |
| `generate_lead` | `/contact.html` form submission where `inquiry_type` starts with `Employer` | `event_category: 'Employer Lead'`, `inquiry_type`, `source_site: 'PractiZone'` | **Live** (`assets/js/main.js`) |
| `outbound_referral_click` | Click on any `a[href*="practione.ca"]` link | `link_url`, `link_domain: 'practione.ca'`, `link_text`, `placement`, `outbound: true`, `transport_type: 'beacon'` | **Live** (`assets/js/main.js`) |
| `employer_portal_click` | Click on employer job-posting CTA (`stafstar.com/.../job-posting` or employer portal link) | `event_category: 'Employer Portal'`, `destination`, `link_text`, `source_site: 'PractiZone'` | **Live** (`assets/js/main.js`) |
| `candidate_portal_click` | Click on candidate registration / `/portal.html` CTA | `event_category: 'Candidate Portal'`, `destination`, `link_text`, `source_site: 'PractiZone'` | **Live** (`assets/js/main.js`) |
| `partner_outbound_click` | Click on any `a[href*="mylatraining.com"]` link (Programs vs. Savings distinguished by `link_url`) | `event_category: 'Partner'`, `partner_name: 'MylaTraining'`, `source_site: 'PractiZone'`, `page_path`, `placement`, `link_text`, `link_url`, `outbound: true` | **Live** (`assets/js/main.js`) |
| `lead_magnet_download` | Click/download of gated or ungated PDF checklists, SOP templates, or hiring guides | `event_category: 'Lead Magnet'`, `asset_name`, `asset_type`, `page_path`, `source_site: 'PractiZone'` | **Spec Ready** (attach to future downloadable assets) |

### Supplementary Non-Sales Form Events (Excluded from Employer `generate_lead`)
- `candidate_registration_form`: Fired on `/contact.html` when `inquiry_type` includes `candidate`.
- `contact_inquiry`: Fired on `/contact.html` for general or consulting inquiries that do not start with `Employer`.

---

## 3. Employer vs. Candidate Lead Separation Rules

To prevent job-seeker traffic from inflating B2B clinic sales metrics in GA4, weekly dashboards, and LeadsMagnet CRM:

1. **Form Selector Classification (`/contact.html` `#inquiry_type`):**
   - `Employer: Temporary Staffing Request` -> `lead_category: "employer_staffing_lead"` -> fires GA4 `generate_lead`.
   - `Employer: Permanent Recruitment Request` -> `lead_category: "employer_staffing_lead"` -> fires GA4 `generate_lead`.
   - `Dental Professional: Candidate Registration` -> `lead_category: "candidate_registration"` -> displays `#candidate-portal-notice` redirect helper and fires `candidate_registration_form` (never `generate_lead`).
   - `Practice Consulting / Compliance Inquiry` -> `lead_category: "consulting_inquiry"` -> fires `contact_inquiry` and routes to PractiOne consulting workflow.
2. **Portal CTA Separation:**
   - Employer links (`https://www.stafstar.com/agency/practizone/job-posting`) fire `employer_portal_click`.
   - Candidate links (`/portal.html` or candidate sign-up links) fire `candidate_portal_click`.
3. **Reporting Exclusion:**
   - `Qualified_Leads`, `Consultations_Booked`, `Proposals_Sent`, and `Customers_Or_Placements_Won` in `internal/weekly-lead-dashboard-template.csv` count **Employer / Clinic** opportunities only. Candidate sign-ups are tracked separately.

---

## 4. LeadsMagnet CRM Webhook & Pipeline Specification

### 4.1 Ready-to-Dispatch JSON Payload (`buildCrmLeadPayload` in `assets/js/main.js`)

When a form is submitted, `window.buildCrmLeadPayload(formElement)` outputs the following structure and dispatches the `crm_lead_payload_ready` CustomEvent, ready to POST to the LeadsMagnet webhook endpoint once API credentials are provisioned:

```json
{
  "source_site": "PractiZone",
  "lead_category": "employer_staffing_lead",
  "inquiry_type": "Employer: Temporary Staffing Request",
  "contact_details": {
    "name": "Dr. Jane Doe",
    "practice_name": "Harbour Dental Care",
    "email": "clinic@example.ca",
    "phone": "+1-416-555-0199",
    "subject": "Temp RDH Needed",
    "message": "Need RDH coverage for Thursday and Friday.",
    "privacy_consent": true
  },
  "attribution": {
    "utm_source": "google",
    "utm_medium": "organic",
    "utm_campaign": "gta_local_seo",
    "referring_site": "https://www.google.com/",
    "landing_page": "https://practizone.ca/dental-staffing-toronto.html",
    "submission_date": "2026-11-18T15:30:00.000Z"
  },
  "crm_integration": {
    "target": "LeadsMagnet",
    "ready_for_dispatch": true,
    "schema_version": "1.0",
    "created_at": "2026-11-18T15:30:00.000Z"
  }
}
```

### 4.2 Pipeline Stage Mapping

#### PractiZone Staffing Pipeline (Employer Leads)
`New Request` -> `Contacted` -> `Qualified Position` -> `Recruiting` -> `Filled / Closed`

| Stage | Entry Criteria | SLA / Owner |
| --- | --- | --- |
| `New Request` | Inbound `employer_staffing_lead` webhook or StafStar job posting | Auto-created on submission |
| `Contacted` | Initial phone/email outreach logged | Within 2 business hours |
| `Qualified Position` | Role (RDH/CDA/Reception), dates, hours, and rate confirmed | Staffing Coordinator |
| `Recruiting` | Shortlisting and presenting vetted candidates to clinic | Staffing Coordinator |
| `Filled / Closed` | Shift/placement confirmed (`Customers_Or_Placements_Won`) or closed | Staffing Coordinator |

#### PractiOne Consulting Pipeline (Practice Advisory & Training Leads)
`New Lead` -> `Contacted` -> `Assessment / Consultation` -> `Proposal Sent` -> `Won / Lost`

| Stage | Entry Criteria | SLA / Owner |
| --- | --- | --- |
| `New Lead` | Inbound `consulting_inquiry` or `PractiZone -> PractiOne` referral | Auto-created on submission |
| `Contacted` | Discovery outreach logged | Within 1 business day |
| `Assessment / Consultation` | Practice assessment or compliance consultation booked | PractiOne Consultant |
| `Proposal Sent` | Formal consulting/training scope & fee proposal delivered | PractiOne Consultant |
| `Won / Lost` | Engagement signed (`Customers_Or_Placements_Won`) or lost with reason code | PractiOne Consultant |

### 4.3 Deduplication & Multi-Opportunity Rules

1. **Contact-Level Deduplication:**
   - Match incoming leads against existing LeadsMagnet Contacts using normalized `email` (primary key) and `phone` (secondary key).
   - **Never overwrite original first-touch attribution** (`original_utm_source`, `original_utm_medium`, `original_utm_campaign`, `original_referring_site`, `original_landing_page`) on an existing Contact record.
2. **Multi-Opportunity Support Across Businesses:**
   - A single Contact (e.g., a clinic owner or practice manager) **may hold separate active Opportunities simultaneously** in both the **PractiZone Staffing Pipeline** and the **PractiOne Consulting Pipeline**.
   - Each new Opportunity records its own **opportunity-level attribution** (`opp_source_site`, `opp_utm_source`, `opp_utm_medium`, `opp_utm_campaign`, `opp_referring_site`) so cross-referrals (`PractiZone -> PractiOne` or `PractiOne -> PractiZone`) are accurately credited in `Referrals_Won_By_Destination` without losing the Contact's original acquisition source.
3. **Candidate Exclusion Rule:**
   - Payloads with `lead_category: "candidate_registration"` must be routed to a separate Candidate Pool / Talent Tag and **must not** create Opportunities in the PractiZone Employer Staffing Pipeline.
