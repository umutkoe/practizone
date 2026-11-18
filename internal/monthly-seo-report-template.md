# Monthly Trend & SEO/Keyword Report Template (PractiZone & PractiOne)

> **INTERNAL OPERATIONAL TEMPLATE (DO NOT PUBLISH)**  
> Aligned with Client Master Brief **Sections 3, 5, and 11**. Keep inside `/internal/` only; excluded from public indexing via `robots.txt` (`Disallow: /internal/`) and omitted from `sitemap.xml`.

---

## Report Metadata

- **Reporting Period:** `YYYY-MM-01` to `YYYY-MM-DD`
- **Prepared By:** `___________________`
- **Date Generated:** `YYYY-MM-DD`
- **Properties Covered:** `practizone.ca` (PractiZone) & `practione.ca` (PractiOne)
- **Data Sources:** Google Analytics 4 (GA4), Google Search Console (GSC), LeadsMagnet CRM, Rank Tracking Tool

---

## 1. Executive Summary (Dual-Business KPIs)

| Metric | PractiZone (`practizone.ca`) | PractiOne (`practione.ca`) | Combined / Notes |
| --- | --- | --- | --- |
| **Total Website Sessions** | | | |
| **Organic Search Clicks (GSC)** | | | |
| **Organic Impressions (GSC)** | | | |
| **Organic CTR (%)** | | | |
| **Qualified Employer / Client Leads** | | | Excludes candidate portal registrations |
| **Candidate Portal Registrations** | | N/A | Tracked separately from employer sales |
| **Consultations / Requests Booked** | | | |
| **Customers / Placements Won** | | | |
| **Cross-Site Referrals Sent** | | | `PractiZone -> PractiOne` / `PractiOne -> PractiZone` |
| **Cross-Site Referrals Won** | | | Verified in LeadsMagnet CRM |

### Month-over-Month Summary Notes
- **Key Wins:**
- **Primary Bottlenecks:**
- **Cross-Referral Performance:**

---

## 2. Ontario Location & Service Keyword Rankings

> **Methodology Rule (Section 11):**  
> Never mix **Google Search Console (GSC) average position** (aggregated across queries, devices, and locations) with **spot-checked location/device rank tracking**. Always record the **Tool**, **Location**, **Device**, and **Date** for every spot check.

### 2A. Google Search Console (GSC) Aggregated Query Performance

| Target Keyword / Query | Business Unit | Target Landing Page | Impressions | Clicks | CTR (%) | GSC Avg. Position | MoM Delta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `dental staffing agency ontario` | PractiZone | `/ontario-dental-recruitment.html` | | | | | |
| `temporary dental hygienist ontario` | PractiZone | `/hygienist-staffing.html` | | | | | |
| `dental assistant staffing ontario` | PractiZone | `/assistant-staffing.html` | | | | | |
| `dental receptionist recruitment ontario` | PractiZone | `/receptionist-recruitment.html` | | | | | |
| `emergency dental temp staffing` | PractiZone | `/temporary-dental-staffing.html` | | | | | |
| `dental staffing agency toronto` | PractiZone | `/dental-staffing-toronto.html` | | | | | |
| `dental staffing mississauga` | PractiZone | `/dental-staffing-mississauga.html` | | | | | |
| `dental staffing brampton vaughan` | PractiZone | `/dental-staffing-brampton-vaughan.html` | | | | | |
| `dental practice consulting ontario` | PractiOne | `/consulting-services.html` / `/dental-practice-consulting.html` | | | | | |
| `dental team professional development ontario` | PractiOne | `/professional-development-training.html` | | | | | |

### 2B. Specific Location & Device Rank Checks (Spot-Check Log)

| Keyword | Target URL | Rank Position | Tool Used | Location (City / Province) | Device | Check Date |
| --- | --- | --- | --- | --- | --- | --- |
| `dental staffing agency toronto` | `/dental-staffing-toronto.html` | | | Toronto, ON | Mobile | `YYYY-MM-DD` |
| `dental staffing agency toronto` | `/dental-staffing-toronto.html` | | | Toronto, ON | Desktop | `YYYY-MM-DD` |
| `dental staffing mississauga` | `/dental-staffing-mississauga.html` | | | Mississauga, ON | Mobile | `YYYY-MM-DD` |
| `dental staffing brampton` | `/dental-staffing-brampton-vaughan.html` | | | Brampton, ON | Mobile | `YYYY-MM-DD` |
| `dental staffing vaughan` | `/dental-staffing-brampton-vaughan.html` | | | Vaughan, ON | Mobile | `YYYY-MM-DD` |
| `dental practice consulting ontario` | `/dental-practice-consulting.html` | | | Toronto, ON | Desktop | `YYYY-MM-DD` |

---

## 3. Top Performing Landing Pages & GEO AI Citation Check

### 3A. Top Performing Landing Pages (GA4 & GSC)

| Landing Page | Sessions | Organic Clicks | `generate_lead` Events | `employer_portal_click` | `candidate_portal_click` | `outbound_referral_click` | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | | | | | | | |
| `/staffing.html` | | | | | | | |
| `/ontario-dental-recruitment.html` | | | | | | | |
| `/hygienist-staffing.html` | | | | | | | |
| `/assistant-staffing.html` | | | | | | | |
| `/temporary-dental-staffing.html` | | | | | | | |
| `/dental-staffing-toronto.html` | | | | | | | |
| `/dental-staffing-mississauga.html` | | | | | | | |
| `/dental-staffing-brampton-vaughan.html` | | | | | | | |
| `/consulting-services.html` | | | | | | | |
| `/dental-practice-consulting.html` | | | | | | | |
| `/professional-development-training.html` | | | | | | | |

### 3B. GEO / AI Search Citation Check

| Prompt Tested | AI Engine | Cited Domain / URL? | Citation Position / Context | Check Date |
| --- | --- | --- | --- | --- |
| "Best dental staffing agency in Ontario for temporary hygienists" | ChatGPT (Search) | | | `YYYY-MM-DD` |
| "Dental temp agency in Toronto and Mississauga" | Perplexity | | | `YYYY-MM-DD` |
| "Ontario dental practice consulting and compliance training" | Google AI Overview | | | `YYYY-MM-DD` |
| "How to hire a certified dental assistant in Ontario" | Claude | | | `YYYY-MM-DD` |

---

## 4. Cybersecurity Partner Outbound Clicks (MylaTraining)

> **Attribution Note:** PractiZone tracks outbound partner clicks separately via GA4 `partner_outbound_click` (`partner_name: 'MylaTraining'`). **Third-party course purchases or completed enrollments cannot be confirmed without affiliate/partner reporting from MylaTraining.**

| Link Type | Destination URL | `data-analytics` Tag | Total Outbound Clicks | Top Referring Page(s) |
| --- | --- | --- | --- | --- |
| **Savings / Referral Portal** | `https://www.mylatraining.com/recommended?ref=6cff00a652fe118b` | `cybersecurity_savings_practizone` | | |
| **Programs / Curriculum** | `https://www.mylatraining.com/programs` | `cybersecurity_programs_practizone` | | |
| **Combined MylaTraining Clicks** | — | — | | |

---

## 5. Prioritized Technical & Content Fixes for Next Month

| Priority | Category | Issue / Opportunity | Target Page(s) | Owner | Target Date | Verification Criteria |
| --- | --- | --- | --- | --- | --- | --- |
| **P0** | Technical / Indexing | | | | | |
| **P1** | On-Page / Schema / CWV | | | | | |
| **P2** | Content / Local SEO / CRO | | | | | |
