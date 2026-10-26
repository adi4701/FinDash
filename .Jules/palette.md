## 2024-05-24 - Table Action Buttons Accessibility
**Learning:** Table action buttons that use only Lucide icons (e.g., Edit, Delete) completely lack screen-reader context and keyboard focus indicators, making them inaccessible for keyboard and screen-reader users.
**Action:** Ensure all future icon-only action buttons get `aria-label`, `title` (for sighted tooltips), and `focus-visible:ring` utilities to make them accessible and clearly visible during keyboard navigation.
