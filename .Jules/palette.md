## 2023-11-20 - Icon-only Buttons Missing Accessibility
**Learning:** Found multiple icon-only buttons (Edit, Delete) in the `Records.jsx` table that are completely missing ARIA labels and focus indicators, rendering them invisible to screen readers and keyboard users.
**Action:** Adding `aria-label`, `title`, and `focus-visible` utility classes to these buttons to fix the accessibility gap, prioritizing a single micro-UX enhancement that hits both usability and accessibility.
