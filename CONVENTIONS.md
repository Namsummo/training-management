# Coding Conventions

## Code Style

- Code convention should follow best practices and be consistent. The project has a linter tool to check the code style to ensure consistency.
- Each file should not have excessive lines of code. If a file has too many lines, consider splitting it into multiple files. Preferably, no more than **500** lines of code per file.
- Do not use `any` type in TypeScript since it defeats the purpose of using TypeScript. Instead, use `unknown` type and type assertion when necessary. If you want to use `any` type for a specific reason, add a comment explaining why you need to use it.
- Each file and function should respect the Single Responsibility Principle (SRP). If a file has multiple responsibilities, consider splitting it into multiple files.
- Do not nest functions more than 3 levels. If you need more, consider refactoring the code to split the logic into multiple functions. This includes `if, else, for, while`, etc.

## Folder Structure

- If a component is used exclusively by a single page, place it in a `(components)` subfolder within that page's folder.
- Components intended for reuse across multiple pages should be placed in the `shared/components/` directory.
- Components in the `shared/components/` directory should be pure, meaning they must not depend on any global state or context (e.g., avoid using `useContext`). Instead, use props for data passing.

## Coding Guidelines

- Use function declaration instead of arrow function assigned to a variable. For example, instead of:

```ts
const handleClick = () => { ... }
```

use:

```ts
function handleClick() { ... }
```

## Naming Conventions

- Enum, Enum value should be in PascalCase.
- Type, Interface, Class should be in PascalCase.
- Function, Variable should be in camelCase.
- App Router page folder should be in kebab-case.
- File name should be in camelCase, except for React component files which should be in PascalCase.
- Asset files should be in kebab-case.

## Common Errors to Avoid

### Linting Errors

Before committing, make sure to fix all linting errors. Common issues include:

1. **Missing newline at end of file**

   - Ensure all files end with a newline character.
   - Most editors can auto-format this.

2. **Trailing whitespace or unnecessary spaces**

   - Remove trailing spaces at the end of lines.
   - Ensure proper spacing and indentation.

3. **Unused variables, functions, or imports**

   - Remove all unused variables, functions, and imports.
   - If a variable or function is intentionally unused (e.g., for future use), prefix it with an underscore or add a comment explaining why it's kept.

   ```ts
   //  Bad - unused variable
   const unusedVariable = 123;

   //  Good - prefix with underscore if intentionally unused
   const _unusedVariable = 123;

   // Good - remove if truly not needed
   ```

4. **Unused imports**

   ```ts
   //  Bad - unused import
   import { useState, useEffect } from "react";

   // Good - only import what you use
   import { useState } from "react";
   ```

### How Linter Works

The project is configured with ESLint to automatically detect and highlight errors in your IDE. Linter will show errors in red squiggly lines for violations such as:

- Missing newline at end of file
- Trailing whitespace
- Unused variables, functions, and imports
- Other code style violations

#### In VS Code (Recommended)

1. **Install ESLint Extension** (if not already installed):

   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "ESLint" by Microsoft (dbaeumer.vscode-eslint)
   - Click Install

2. **Automatic Error Detection**:

   - Once the ESLint extension is installed, errors will appear **automatically as red squiggly lines** in your code
   - Hover over the red line to see the error message
   - VS Code will auto-fix some issues on save (configured in `.vscode/settings.json`)

3. **Quick Fix**:
   - Right-click on the error → "Quick Fix" or press `Ctrl+.` (Cmd+. on Mac)
   - Select "Fix all auto-fixable problems" to fix multiple issues at once

#### Running Linter Manually

You can also run the linter manually from the terminal:

```bash
# Check for linting errors
npm run lint
# or
pnpm lint

# Auto-fix fixable errors
npm run lint:fix
# or
pnpm lint:fix
```

**Important**: Always fix all linting errors before committing and pushing your code.
