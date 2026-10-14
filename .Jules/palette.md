## 2024-05-15 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Icon-only action buttons in tables (like Edit/Delete) often lack both visible focus states and ARIA labels, making them inaccessible to keyboard and screen reader users. Tailwind's reset removes default focus rings.
**Action:** Always add `aria-label`, `title` (for mouse users), and explicit `focus-visible:ring-2` classes to icon-only interactive elements.
