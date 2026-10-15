## 2024-05-24 - Accessibility improvements for icon-only buttons
**Learning:** Found an accessibility issue pattern in the table action columns where icon-only buttons (such as Edit and Delete actions) lacked aria-labels and keyboard focus indicators, which makes navigation difficult for screen readers and keyboard users.
**Action:** Applied standard `aria-label`s, `title`s, and custom `focus-visible` ring classes to these buttons, establishing a pattern that should be reused for all similar icon-only interactive elements across the application to ensure an accessible baseline.
