# Training Management System

A training management system with two main portals:

- **Coach Portal**: Manage athletes, training programs, and schedules
- **Athlete Portal**: View plans, log training sessions, and track reminders

## 🛠 Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Utilities**:
  - `clsx` - Conditional classnames
  - `tailwind-merge` - Merge Tailwind classes
  - `class-variance-authority` - Component variants

## 📋 Requirements

### Node.js Version

**⚠️ IMPORTANT**: This project requires **Node.js 18.18.0 or higher**. It is recommended to use **Node.js 20.x** or higher.

Check your current Node.js version:

```bash
node --version
```

### Package Manager

Use npm, yarn, or pnpm:

```bash
# npm (comes with Node.js)
npm --version

# or yarn
yarn --version

# or pnpm
pnpm --version
```

## 🚀 How to Run the Project

### 1. Clone Repository

```bash
git clone git@gitlab.com:tranhainamm2304/fe-training-management.git
cd fe-training-management
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# or yarn
yarn install

# or pnpm
pnpm install
```

### 3. Run Development Server

```bash
# Using npm
npm run dev

# or yarn
yarn dev

# or pnpm
pnpm dev
```

Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm run start
```

### 5. Run Linter

```bash
npm run lint
```

## 📁 Project Structure

```
training-management/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (signin, signup)
│   ├── (portal)/          # Portal routes
│   │   ├── athlete/       # Athlete portal
│   │   └── coach/         # Coach portal
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── shared/                # Shared resources
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utilities (API client, etc.)
│   ├── service/           # Services, hooks, types
│   └── providers/         # React providers
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🔧 Notes for Backend Developers Working on Frontend

### ⚠️ Version Requirements

**YOU MUST UPGRADE YOUR NODE VERSION** if you're using Node.js < 18.18.0:

1. **Check your current version**:

   ```bash
   node --version
   ```

2. **Upgrade Node.js**:

   - **Windows/Mac**: Download from [nodejs.org](https://nodejs.org/) (recommended: LTS 20.x)
   - **Or use nvm** (Node Version Manager):

     ```bash
     # Install nvm (Windows)
     # Download from: https://github.com/coreybutler/nvm-windows/releases

     # After installing nvm:
     nvm install 20
     nvm use 20
     ```

3. **Verify the new version**:
   ```bash
   node --version  # Must be >= 18.18.0
   npm --version
   ```

### 🎯 Key Differences from Backend

1. **Package Manager**:

   - FE uses npm/yarn/pnpm instead of pip/composer
   - Dependencies are managed in `package.json`
   - `node_modules/` is equivalent to `vendor/` in PHP or `venv/` in Python

2. **Development Server**:

   - Run `npm run dev` to start the dev server (auto-reloads on code changes)
   - Default port: 3000
   - Hot Module Replacement (HMR) - no need to restart the server

3. **TypeScript**:

   - The project uses TypeScript, requires basic type understanding
   - IDE will show type errors if code is incorrect
   - `.tsx` extension = TypeScript + JSX (React components)

4. **File Structure**:

   - `app/` directory = routes (Next.js App Router)
   - Components are located in `shared/components/`
   - No `.env` files are committed (check `.gitignore`)

5. **Build Process**:
   - `npm run build` creates an optimized production build
   - Output is in `.next/` (git ignored)
   - Build output can be deployed to any static host

### 📝 Suggested Workflow

1. **Before coding**:

   ```bash
   git pull origin main
   npm install  # Update dependencies if any
   ```

2. **While coding**:

   - Run `npm run dev` in a separate terminal
   - Code will automatically reload in the browser
   - Use TypeScript types to avoid errors

3. **Before committing**:

   ```bash
   npm run lint  # Check for code style errors
   # Fix any linting errors if found
   ```

4. **Commit & Push**:
   ```bash
   git add .
   git commit -m "feat: describe changes"
   git push origin main
   ```

### 🐛 Troubleshooting

**Error: `npm: command not found`**

- Node.js installation is incorrect
- Check PATH environment variable

**Error: `Module not found`**

- Run `npm install` again
- Delete `node_modules/` and `package-lock.json`, then run `npm install` again

**Error: Port 3000 is already in use**

- Change port: `npm run dev -- -p 3001`
- Or kill the process using port 3000

**Error: TypeScript errors**

- Make sure IDE has TypeScript extension installed
- Restart TypeScript server in IDE (VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")

**Build fails**

- Check Node version: `node --version` (must be >= 18.18.0)
- Delete `.next/` folder and build again
- Delete `node_modules/` and `package-lock.json`, then run `npm install` again

## 🔌 API Integration

Currently, forms are placeholders. The API client is located in `shared/lib/api.ts` and is ready for backend integration.

## 📚 Documentation References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 👥 Contributors

- Frontend Team

---

**Note**: If you're a backend developer and encounter setup issues, please contact the FE team or create an issue on GitLab.
