---
name: component-scaffolder
description: Scaffolds modern React + TypeScript presentational components with Vitest tests.
---
# Component Scaffolding Workflow
When requested to create a UI component:
1. Generate the component in `src/components/{ComponentName}/{ComponentName}.tsx`.
2. Generate typed interfaces in `src/components/{ComponentName}/{ComponentName}.types.ts`.
3. Generate a Vitest test suite in `src/components/{ComponentName}/{ComponentName}.test.tsx` checking for accessibility attributes (ARIA roles) and render states.
4. Export the component cleanly through `src/components/{ComponentName}/index.ts`.
