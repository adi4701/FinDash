## 2024-10-16 - Accessibility of Icon-Only Action Buttons in Data Tables
**Learning:** Icon-only buttons (like Edit and Delete actions) inside table rows often lack proper context for screen reader users and keyboard navigation. Missing focus styles also make it hard to tell which action is currently selected.
**Action:** Always include `aria-label` and `title` attributes on icon-only buttons to provide context. Ensure focus visibility by adding `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded` classes to improve the keyboard navigation experience.
