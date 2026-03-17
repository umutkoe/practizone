# Practizone Premium UI Upgrade Plan

## 1. Vision
Build a premium, high-trust, medical-corporate website that feels custom-crafted.
No trendy gimmicks: keep it clean, intentional, and conversion-focused.

## 2. Core Principles
- Keep existing clean style (no glassmorphism, no noisy visuals).
- Increase perceived value through detail quality, not visual overload.
- Make motion meaningful and brand-consistent.
- Improve polish across desktop and mobile equally.

## 3. Priority Roadmap (Single Phase)

### Phase 1: Full Premium Upgrade
Goal: deliver the full "10,000$ design" perception in one unified execution pass.

Tasks:
- Hero premium layer:
  - Add an animated frame behind hero image (subtle, elegant motion).
  - Use one thin geometric ring + one soft edge shape.
  - Apply slow drift/rotate loop (12-18s) with low opacity.
  - Keep image stable, readable, and properly cropped.
  - Add depth layering: foreground image card, mid-layer frame, ambient background shape.
- Custom icon system:
  - Create a small custom SVG set for staffing quality, speed, trust, 24/7 support, pricing transparency, candidate matching.
  - Standardize icon rules: 1.75px stroke, rounded joins, brand color pairs, 24x24 base grid.
  - Use icons in Why Choose, metrics row, and About value cards.
- Signature motion system:
  - Build `reveal-up`, `soft-scale`, `stagger-fade`, `line-draw` animations.
  - Apply timing standards (220ms, 360ms, 520ms) and custom cubic-bezier easing.
  - Use scroll-based reveals and selective hover motion for key interactive elements.
- Luxury polish pass:
  - Refine typography scale, line length, and spacing rhythm.
  - Standardize CTA hierarchy and hover/focus states.
  - Add custom section dividers aligned with hero frame geometry.
  - Enhance footer structure for a compact premium brand block.

Deliverables:
- Hero frame component and motion-safe behavior for reduced-motion users.
- `/assets/icons/` SVG pack and icon utility classes.
- Motion tokens and reusable animation classes in CSS.
- JS reveal/stagger updates in `assets/js/main.js`.
- Final spacing, typography, and CTA refinements across all pages.

## 4. Technical Implementation Notes
- Use CSS custom properties for all motion and color tokens.
- Keep animation GPU-friendly (transform/opacity only).
- Avoid heavy JS animation libraries.
- Maintain Lighthouse-friendly performance.
- Ensure accessibility (focus styles, contrast, reduced motion).

## 5. Suggested Execution Order (By File)
1. `assets/css/styles.css`
2. `index.html` (hero + key sections)
3. `assets/js/main.js` (stagger and advanced reveals)
4. `staffing.html`, `pricing.html`, `testimonials.html`, `about.html`, `contact.html`
5. `assets/icons/*.svg`

## 6. Acceptance Checklist
- Hero feels distinctly premium at first glance.
- No visual clutter, no trendy over-design.
- Icons are custom and consistent.
- Motion feels intentional, not generic.
- Mobile experience preserves premium feel.
- Performance and accessibility remain strong.

## 7. Time Estimate
- Phase 1 (Full Premium Upgrade): 7-12 hours
- Total: 7-12 hours for a full premium pass
