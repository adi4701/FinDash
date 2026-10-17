## 2024-03-24 - Accessibility for Icon-Only Actions
**Learning:** Icon-only buttons used in data tables (like Edit/Delete actions) are completely inaccessible to screen readers without ARIA labels, and often lack keyboard focus states, making them difficult for keyboard-only users to navigate and understand.
**Action:** Always add descriptive `aria-label`s, `title`s (for hover tooltips), and explicit focus styles (e.g., `focus-visible:ring-2`, `focus:outline-none`) to icon-only buttons to ensure they are accessible and intuitive for all users.
