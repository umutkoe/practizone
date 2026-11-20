# PractiZone (`practizone.ca`) — Client & Operations Handover Manual

> **INTERNAL HANDOVER DOCUMENT (DO NOT PUBLISH)**  
> Prepared per Client Master Brief **Section 11 (Handover, Page Inventory, Tracking Documentation & Staff Guide)**.  
> Protected from search engine indexing via `robots.txt` (`Disallow: /internal/`) and excluded from `sitemap.xml`.

---

## Section 1: Complete PractiZone Live Page Inventory

PractiZone currently serves **20 live canonical pages** listed in `sitemap.xml` (plus 1 legacy 301 redirect from `/consulting-services.html` to `/dental-practice-consulting.html` configured in `.htaccess`; no custom `/404.html` file is currently deployed).

### 1.1 Core, Role & Regional GTA Pages (20 Live Canonical URLs)

| # | Page / File | Canonical URL | Primary Search Intent / Target Keywords | Structured Data (JSON-LD) Deployed | Primary Conversion CTA & Destination |
| --- | --- | --- | --- | --- | --- |
| 1 | **Homepage** (`index.html`) | `https://practizone.ca/` | Ontario dental staffing agency, temp & permanent dental recruitment | `EmploymentAgency`, `PostalAddress` | **Request Staffing** (`stafstar.com/.../job-posting`), **Explore Staffing / Portal** (`/portal.html`), **Explore PractiOne** (`practione.ca` w/ UTM) |
| 2 | **Staffing Overview** (`staffing.html`) | `https://practizone.ca/staffing.html` | Dental staffing services Ontario, temporary & permanent dental placements | `BreadcrumbList` | **Request Staffing** (`stafstar.com/.../job-posting`), **Register as Candidate** (`/portal.html`) |
| 3 | **Ontario Recruitment Hub** (`ontario-dental-recruitment.html`) | `https://practizone.ca/ontario-dental-recruitment.html` | Dental recruitment agency Ontario, permanent dental recruitment, hire dental team Ontario | `BreadcrumbList`, `EmploymentAgency`, `AdministrativeArea`, `PostalAddress`, `FAQPage` | **Submit Employer Staffing Request** (`stafstar.com/.../job-posting`), **Register as a Dental Candidate** (`/portal.html`) |
| 4 | **Dental Hygienist Staffing** (`hygienist-staffing.html`) | `https://practizone.ca/hygienist-staffing.html` | Temporary dental hygienist Ontario, RDH staffing agency, emergency RDH coverage | `BreadcrumbList`, `Service`, `EmploymentAgency`, `AdministrativeArea` | **Book a Hygienist** (`stafstar.com/.../job-posting`), **Register as RDH** (`/portal.html`) |
| 5 | **Dental Assistant Staffing** (`assistant-staffing.html`) | `https://practizone.ca/assistant-staffing.html` | Dental assistant staffing Ontario, certified dental assistant recruitment, temp CDA | `BreadcrumbList`, `Service`, `EmploymentAgency`, `AdministrativeArea` | **Request Dental Assistant** (`stafstar.com/.../job-posting`), **Register as CDA** (`/portal.html`) |
| 6 | **Receptionist Recruitment** (`receptionist-recruitment.html`) | `https://practizone.ca/receptionist-recruitment.html` | Dental receptionist recruitment Ontario, dental front desk staffing, treatment coordinator | `BreadcrumbList`, `EmploymentAgency`, `PostalAddress` | **Request Front-Desk Staff** (`stafstar.com/.../job-posting`), **Apply as Receptionist** (`/portal.html`) |
| 7 | **Temporary Dental Staffing** (`temporary-dental-staffing.html`) | `https://practizone.ca/temporary-dental-staffing.html` | Temporary dental staffing Ontario, same-day dental temp agency, emergency coverage | `BreadcrumbList`, `EmploymentAgency`, `AdministrativeArea`, `PostalAddress` | **Book Temp Coverage** (`stafstar.com/.../job-posting`), **Join Temp Pool** (`/portal.html`) |
| 8 | **Toronto Local Staffing** (`dental-staffing-toronto.html`) | `https://practizone.ca/dental-staffing-toronto.html` | Dental staffing agency Toronto, temp dental hygienist Toronto, GTA dental recruitment | `BreadcrumbList`, `EmploymentAgency`, `AdministrativeArea`, `PostalAddress` | **Request Toronto Staffing** (`stafstar.com/.../job-posting`), **Apply for Toronto Shifts** (`/portal.html`) |
| 9 | **Mississauga Local Staffing** (`dental-staffing-mississauga.html`) | `https://practizone.ca/dental-staffing-mississauga.html` | Dental staffing Mississauga, Peel Region dental temp agency, CDA recruitment Mississauga | `BreadcrumbList`, `EmploymentAgency`, `City`, `AdministrativeArea`, `PostalAddress` | **Request Mississauga Staffing** (`stafstar.com/.../job-posting`), **Apply for Mississauga Shifts** (`/portal.html`) |
| 10 | **Brampton & Vaughan Staffing** (`dental-staffing-brampton-vaughan.html`) | `https://practizone.ca/dental-staffing-brampton-vaughan.html` | Dental staffing agency Brampton & Vaughan, York Region dental temp agency | `BreadcrumbList`, `EmploymentAgency`, `City`, `AdministrativeArea`, `PostalAddress` | **Request Staffing in Brampton & Vaughan** (`stafstar.com/.../job-posting`), **Apply for Local Shifts** (`/portal.html`) |
| 11 | **Dental Practice Consulting** (`dental-practice-consulting.html`) | `https://practizone.ca/dental-practice-consulting.html` | Dental practice consulting Ontario, PractiOne advisory bridge | `BreadcrumbList` | **Explore PractiOne Dental Consulting** (`practione.ca` w/ UTM), **Request a Complimentary Consultation** (`practione.ca/book-consultancy.html` w/ UTM) |
| 12 | **Professional Development & Training** (`professional-development-training.html`) | `https://practizone.ca/professional-development-training.html` | Dental team privacy, cybersecurity & AI safety training (MylaTraining partner) | `BreadcrumbList` | **Explore the Training Bundle** (`mylatraining.com/recommended?ref=6cff00a652fe118b`), **Explore Staffing Services** (`/staffing.html`) |
| 13 | **Pricing** (`pricing.html`) | `https://practizone.ca/pricing.html` | Dental staffing pricing Ontario, CA$59.99 temporary shift booking fee | — | **Request Staffing** (`stafstar.com/.../job-posting`), **Contact Us** (`/contact.html`) |
| 14 | **Testimonials** (`testimonials.html`) | `https://practizone.ca/testimonials.html` | PractiZone client & candidate reviews Ontario | — | **Request Staffing / Portal** (`/portal.html`) |
| 15 | **About** (`about.html`) | `https://practizone.ca/about.html` | About PractiZone Ontario dental staffing platform | — | **Contact Us** (`/contact.html`), **Portal** (`/portal.html`) |
| 16 | **Contact** (`contact.html`) | `https://practizone.ca/contact.html` | Contact PractiZone, employer staffing inquiry, practice consulting inquiry | `BreadcrumbList` | **Submit Inquiry Form** (FormSubmit `info@practizone.ca` + `buildCrmLeadPayload`) |
| 17 | **Portal** (`portal.html`) | `https://practizone.ca/portal.html` | PractiZone employer & candidate login / registration hub | — | **Employer Login / Job Posting** (`stafstar.com/...`), **Professional Login / App Store** (`stafstar.com/...`) |
| 18 | **Privacy Policy** (`privacy.html`) | `https://practizone.ca/privacy.html` | PIPEDA privacy policy, cookie & affiliate disclosures | — | Legal reference |
| 19 | **Terms of Use** (`terms.html`) | `https://practizone.ca/terms.html` | Website terms of use | — | Legal reference |
| 20 | **Terms and Conditions** (`terms-conditions.html`) | `https://practizone.ca/terms-conditions.html` | Platform & staffing terms and conditions | — | Legal reference |

### 1.2 Redirects & Operational Notes
- **Legacy Consulting URL:** `/consulting-services.html` permanently 301-redirects to `https://practizone.ca/dental-practice-consulting.html` via `.htaccess`.
- **Canonical Domain Enforcement:** `www.practizone.ca`, `http://`, and `/index.html` all 301-redirect to `https://practizone.ca/` via `.htaccess`.
- **404 Handling:** No custom `404.html` page exists in the repository; unmatched routes currently fall back to the web server default 404 response.

---

## Section 2: Lead Routing & LeadsMagnet CRM Integration Playbook

### 2.1 Employer vs. Candidate Lead Separation
To ensure job-seeker sign-ups never inflate employer B2B sales metrics:
- **Employer Inquiries (`/contact.html`):** Selecting `Employer: Temporary Staffing Request` or `Employer: Permanent Recruitment Request` in `#inquiry_type` sets `lead_category: "employer_staffing_lead"` and fires the GA4 `generate_lead` conversion event.
- **Candidate Registrations (`/contact.html` & `/portal.html`):** Selecting `Dental Professional: Candidate Registration` displays the `#candidate-portal-notice` helper directing professionals to `/portal.html` (StafStar Professional Login / App Store), sets `lead_category: "candidate_registration"`, and fires `candidate_registration_form` (never `generate_lead`).
- **Portal CTA Clicks:** Employer links (`stafstar.com/agency/practizone/job-posting` and employer login) fire `employer_portal_click`; candidate links (`/portal.html` and professional login) fire `candidate_portal_click`.

### 2.2 Step-by-Step LeadsMagnet CRM Webhook Integration (`assets/js/main.js`)
`buildCrmLeadPayload(formElement)` in `assets/js/main.js` already serializes form inputs, `lead_category`, and UTM/attribution metadata (`utm_source`, `utm_medium`, `utm_campaign`, `referring_site`, `landing_page`, `submission_date`) into a LeadsMagnet-ready JSON object and dispatches the `crm_lead_payload_ready` CustomEvent.

When LeadsMagnet API credentials are issued, IT/Admin should complete these steps:

1. **Locate the submission handler** in `assets/js/main.js` (inside the `contactForm.addEventListener("submit", ...)` block, right after `const crmPayload = buildCrmLeadPayload(contactForm);`).
2. **Add the non-blocking webhook `fetch` call** (using the LeadsMagnet Webhook Endpoint URL and API/Bearer token, or preferably routing through a lightweight server-side proxy/endpoint so the API key is not exposed in client-side JS):
   ```javascript
   // Optional: forward crmPayload to your server-side LeadsMagnet proxy or webhook endpoint
   fetch("https://YOUR_WEBHOOK_OR_PROXY_ENDPOINT", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Authorization": "Bearer YOUR_LEADSMAGNET_API_TOKEN"
     },
     body: JSON.stringify(crmPayload),
     keepalive: true
   }).catch((err) => console.warn("[LeadsMagnet Webhook] Dispatch error:", err));
   ```
   > **Security Tip:** If LeadsMagnet requires a private API key rather than a public inbound webhook URL, deploy a small PHP/serverless relay on Hostinger that holds the `Bearer` token server-side and forwards `crmPayload` to LeadsMagnet.
3. **Verify in Browser DevTools:** Submit a test inquiry on `/contact.html`, check Console for `[LeadsMagnet CRM Payload Prepared]`, and confirm `200 OK` in the Network tab.

### 2.3 PractiZone 5-Stage CRM Pipeline Mapping
Map incoming `employer_staffing_lead` payloads into the **PractiZone Staffing Pipeline**:

1. `New Request` — Auto-created when `crmPayload` arrives (`lead_category: "employer_staffing_lead"`).
2. `Contacted` — Initial outreach logged by Staffing Coordinator (target SLA: `< 2 business hours`).
3. `Qualified Position` — Role (RDH/CDA/Reception), shift dates/hours, and clinic rate confirmed.
4. `Recruiting` — Vetted candidates shortlisted and presented to the dental practice.
5. `Filled / Closed` — Placement/shift confirmed (`Customers_Or_Placements_Won`) or request closed.

*(Consulting inquiries with `lead_category: "consulting_inquiry"` or `utm_source=practizone` referrals on `practione.ca` map to the PractiOne Pipeline: `New Lead -> Contacted -> Assessment / Consultation -> Proposal Sent -> Won / Lost`. See `internal/tracking-and-crm-spec.md` for deduplication and multi-opportunity rules.)*

---

## Section 3: Staff Guide — How to View Leads & Search Rankings

### 3.1 Reading Incoming Email Notifications & UTM Source Tags
All `/contact.html` submissions are delivered via FormSubmit to **`info@practizone.ca`**. Each email includes the visitor's contact fields plus hidden attribution fields:
- **`inquiry_type`**: Confirms whether the sender is an **Employer** (Temporary/Permanent Staffing), **Candidate**, or **Consulting** lead.
- **`utm_source`**: Shows where the lead originated:
  - `practione` — Referred from PractiOne (`practione.ca`)
  - `google` — Paid or tagged Google campaign
  - `direct` — Typed URL directly or untagged organic visit (check `referring_site` to see if it came from `google.ca` / `google.com`)
- **`utm_medium`** & **`utm_campaign`**: Identifies the campaign or cross-site bridge (e.g., `referral` / `consulting_bridge`).
- **`landing_page`**: Shows the exact page the visitor first landed on (e.g., `/dental-staffing-toronto.html`).

### 3.2 Viewing Conversions & Outbound Clicks in Google Analytics 4 (GA4)
1. Sign in to **Google Analytics** (`analytics.google.com`) and select the **PractiZone (`practizone.ca`)** GA4 property.
2. In the left sidebar, go to **Reports -> Engagement -> Events**.
3. Key events to monitor:
   - **`generate_lead`**: Total **Employer** staffing inquiries submitted on `/contact.html` (excludes candidate registrations).
   - **`employer_portal_click`**: Clicks on "Request Staffing" / Employer Login buttons going to StafStar.
   - **`candidate_portal_click`**: Clicks on Candidate / Professional Login buttons (keep separate from employer sales).
   - **`outbound_referral_click`**: Cross-site clicks from PractiZone to **PractiOne** (`practione.ca`).
   - **`partner_outbound_click`**: Outbound clicks to **MylaTraining** (check `link_url` parameter to separate `/recommended?ref=...` savings clicks from `/programs` clicks).
4. To see which landing pages drove each event, go to **Reports -> Engagement -> Landing page** and filter or add `Event name` as a secondary dimension.

### 3.3 Checking Weekly Search Performance & Ontario Rankings in Google Search Console (GSC)
1. Sign in to **Google Search Console** (`search.google.com/search-console`) and select **`https://practizone.ca/`**.
2. Go to **Performance -> Search results**.
3. Set the date range (e.g., **Last 7 days** or **Last 28 days**, optionally comparing to the previous period).
4. Review the four top KPIs: **Total Clicks**, **Total Impressions**, **Average CTR**, and **Average Position**.
5. Scroll to the **Queries** and **Pages** tabs to monitor Ontario-specific terms (e.g., `dental staffing agency ontario`, `temporary dental hygienist toronto`, `dental staffing mississauga`, `dental staffing brampton vaughan`).
   - **Important:** GSC **Average Position** is an aggregated average across all locations and devices. Do not mix GSC averages with manual/tool-based city rank checks; log both separately in `internal/monthly-seo-report-template.md`.

---

## Section 4: Administrator Access & Quarterly Maintenance Checklist

### 4.1 Platform Ownership & Credentials Checklist

| System / Asset | Account / Endpoint | Owner / Admin | Status / Notes |
| --- | --- | --- | --- |
| **Google Search Console (GSC)** | `https://practizone.ca/` property | Client / SEO Admin | Verify `sitemap.xml` submitted & zero indexing errors |
| **Google Analytics 4 (GA4)** | PractiZone GA4 Property | Client / Marketing Admin | Confirm `generate_lead` marked as a Key Event |
| **Domain, DNS & Hosting** | Hostinger (`u546487744` / `practizone.ca`) | Client / Web Admin | SSL active; `.htaccess` 301s & Git deploy (`site_repo`) |
| **GitHub Repository** | `github.com/umutkoe/practizone` (`main`) | Dev / SEO Team | Connected to Hostinger deployment |
| **Form Backend** | FormSubmit (`info@practizone.ca`) | Operations / Admin | Receives `/contact.html` AJAX submissions |
| **Staffing Portal** | StafStar (`stafstar.com/agency/practizone`) | Operations Team | Employer job postings & candidate registrations |
| **LeadsMagnet CRM** | Webhook URL + API Token | Client IT / Admin | Pending credential insertion into `assets/js/main.js` |

### 4.2 Weekly & Quarterly Maintenance Cadence
- **Weekly:** Populate `internal/weekly-lead-dashboard-template.csv` for both `PractiZone` and `PractiOne` using GA4, GSC, FormSubmit/CRM, and StafStar data.
- **Monthly:** Complete `internal/monthly-seo-report-template.md` (separating GSC average position from location/device spot checks and MylaTraining clicks).
- **Quarterly (Next Due: `2027-01-31`):**
  - Audit and update `internal/competitor-pricing-tracker.csv` and `internal/competitor-pricing-notes.md`.
  - Confirm `robots.txt` still contains `Disallow: /internal/` and `sitemap.xml` contains zero `/internal/` URLs.
