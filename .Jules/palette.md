## 2023-10-18 - Improve icon button accessibility
**Learning:** Icon-only buttons frequently lack ARIA labels, making them inaccessible to screen readers. Relying on visual context alone is insufficient for users with visual impairments.
**Action:** Add descriptive `aria-label` attributes to all icon-only buttons to ensure they are properly announced by screen readers.
