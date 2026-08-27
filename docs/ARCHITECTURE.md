# 1. Refactor principle

The AdofLabs website should evolve incrementally.

Every refactor must:

1. change one responsibility at a time,
2. preserve visual behavior unless the task explicitly requests a design change,
3. preserve URLs,
4. preserve SEO output,
5. preserve responsive behavior,
6. pass lint,
7. pass build,
8. produce a small reviewable Git diff.

No whole-site rewrites.

---

# 2. Responsibility model

Use this conceptual separation:

```text
Route
  ↓
Feature / Section
  ↓
Component
  ↓
Content/Data
  ↓
Styles
```

Responsibilities:

### Routes

`src/app/**/page.tsx`

Routes should primarily compose page sections/features.

They should not contain:

* huge article bodies,
* large SVG diagrams,
* repeated styling definitions,
* large datasets,
* complex reusable UI.

### Components

Components own:

* markup,
* behavior specific to the component,
* presentation structure.

They should not own large amounts of editorial content when that content can reasonably be separated.

### Content

Content/data owns:

* titles,
* descriptions,
* article/report text,
* LAB metadata,
* statuses,
* links,
* metrics,
* references,
* future CMS-editable values.

### Styles

Visual styling belongs outside large TSX markup where practical.

For newly refactored components, prefer:

```text
component-name/
├── component-name.tsx
└── component-name.module.css
```

Do not convert the entire repository to CSS Modules at once.

Existing Tailwind can remain until the relevant component is deliberately refactored.

### Design remains code

The future CMS may change content.

It must NOT control arbitrary:

* spacing,
* layout,
* typography system,
* animation implementation,
* component composition,
* responsive design.

---

# 3. File-size policy

Do not enforce a hard automated max-lines ESLint rule.

Use these review thresholds instead.

### Target

Most TSX files:

`50–180 lines`

Most component CSS files:

`50–200 lines`

### Review threshold

At approximately:

`200 lines`

ask whether the file contains more than one responsibility.

### Soft ceiling

Ordinary handwritten component/logic files should usually remain below:

`250 lines`

A file may exceed this when there is a real reason, such as:

* static content/data,
* generated code,
* complex technical SVG,
* schemas,
* unusual technical-report material.

Never split a cohesive component merely to satisfy a line count.

The goal is:

> one clear responsibility per file

not artificially tiny files.

---

# 4. Route-file policy

Route files should become intentionally boring.

Ideal pattern:

```tsx
export default function Page() {
  return (
    <>
      <SectionA />
      <SectionB />
      <SectionC />
    </>
  );
}
```

Large hard-coded content should not remain inside route files.

The existing `src/app/lab/001/page.tsx` is a known future refactor target because it currently combines multiple responsibilities.

Do NOT refactor it during this task.

---

# 5. Global shell

There should ultimately be one clear ownership boundary for:

* site header/navigation,
* site footer,
* global page shell,
* global fonts,
* global metadata,
* global theme.

Header and footer must not be duplicated across routes.

Do not implement this restructuring yet.

---

# 6. Server/client boundary

Default to React Server Components.

Use `"use client"` only where browser state, events or browser APIs actually require it.

Do not make an entire large section client-side merely because one small child:

* animates,
* tracks scroll,
* opens a menu,
* reacts to pointer events.

Preferred pattern:

```text
Server component
├── static content
├── static layout
└── small Client component
```

Do not remove Framer Motion globally.

Refactor client boundaries incrementally.

---

# 7. Styling rules

The site remains visually consistent with the existing AdofLabs design.

Do not introduce another styling framework.

Current Tailwind usage may remain.

As components are deliberately refactored:

* move large component-specific styling out of TSX when useful,
* use CSS Modules for component-owned complex styling,
* retain Tailwind where it keeps markup simpler,
* avoid mixing multiple styling approaches arbitrarily inside one component.

Repeated global values should eventually become semantic tokens.

Examples:

```css
--background
--foreground
--text-primary
--text-secondary
--border-subtle
--surface
--page-width
--content-width
```

Do NOT perform token extraction in this task.

---

# 8. Content / CMS boundary

The future Adof Studio CMS should be able to provide structured content without forcing components to change.

Preferred direction:

```tsx
<LabCard lab={lab} />
```

instead of:

```tsx
<LabCard
  title="..."
  description="..."
  status="..."
  ...
/>
```

with large hard-coded content buried in JSX.

But do not over-generalize prematurely.

Only introduce structured content models when an actual content type requires them.

---

# 9. LAB model principle

LAB entries and LAB reports are different concepts.

A LAB may exist without a published report.

Conceptually:

```ts
type LabEntry = {
  id: string;
  title: string;
  status: LabStatus;
  report?: LabReport | null;
};
```

Therefore:

```text
LAB / 001
report published
→ show report CTA

LAB / 002
no report
→ no report CTA
```

No route should be created solely to satisfy a card CTA when there is no meaningful report.

Do not implement this model yet.

---

# 10. Research content principle

Research/Insights should eventually separate:

```text
content metadata
article body
rendering
SEO
```

Adding a new article should eventually not require copying an entire route implementation.

Do not build this architecture yet.

---

# 11. Technical-report principle

Technical reports may use specialized rendering primitives such as:

```text
ReportSection
Equation
Figure
MetricTable
ExperimentTable
Reference
Callout
CodeBlock
```

Only create a primitive after real repeated usage justifies it.

Do not build a generic design system for hypothetical future reports.

---

# 12. SEO ownership

SEO should ultimately be generated from structured content wherever possible.

Examples:

```text
title
description
canonical
Open Graph
publication date
updated date
author
Article / TechArticle structured data
breadcrumbs
```

Avoid manually duplicating the same metadata across unrelated page implementations.

Do not restructure SEO during this task.

---

# 13. Accessibility

Refactoring must preserve or improve:

* semantic HTML,
* heading hierarchy,
* keyboard navigation,
* focus behavior,
* labels,
* alt text,
* reduced-motion behavior.

A refactor must not remove accessibility solely to simplify component code.

---

# 14. No premature abstraction

Do not create things such as:

```text
UniversalSection
GenericContentRenderer
MegaCard
GlobalComponentFactory
DynamicEverything
```

simply because two pieces of markup look slightly similar.

Prefer small duplication over the wrong abstraction.

Extract shared behavior only after there is a clear repeated responsibility.

---

# 15. Per-task verification

Every source-code refactor task must end with:

```powershell
npm run lint
npm run build
git diff --check
git status --short
```

The final task report must include:

```text
files modified
files created
behavior preserved
lint result
build result
git diff --check
commit: NO unless explicitly requested
push: NO unless explicitly requested
```

---

# 16. Execution rule

The refactor sequence is always:

```text
ONE TASK
   ↓
SMALL DIFF
   ↓
VERIFY
   ↓
REPORT
   ↓
STOP
```

Never continue automatically into the next architectural task.
