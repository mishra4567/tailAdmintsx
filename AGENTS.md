# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project
TailAdmin (free React template) converted to **Laravel + Inertia.js + React + TypeScript (.tsx)**,
with Tailwind CSS v4 and Vite. There is no Blade UI: Blade only provides the root view.

## Commands
```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build; must pass with no errors
php artisan serve
php artisan optimize:clear
```
Run `npm run build` after changes to confirm the project compiles.

## Structure
- `resources/js/app.tsx`: Inertia entry. Lazy-loads pages and applies `AdminLayout` to all of them.
- `resources/js/Pages/Admin/*.tsx`: Inertia pages (one file = one route).
- `resources/js/Pages/Admin/layouts/`: `AdminLayout`, `AppSidebar`, `AppHeader`, `Backdrop`.
- `resources/js/Pages/Admin/Back/NavItems/`: `Navigation.tsx` (menu data) and `NavItem.tsx` (renderer).
- `resources/js/Pages/Admin/tailadmin-source/`: converted TailAdmin components, contexts, icons, CSS.
- `resources/views/app.blade.php`: root view (`@viteReactRefresh`, `@vite`, `@inertiaHead`, `@inertia`).
- `public/admin/images/`: static images.
- `routes/web.php`: every route returns `Inertia::render(...)`.

## Rules
**Routing and pages**
- Always return pages with `Inertia::render('Admin/Name')`. Never `view('app')`: it fails with "Undefined variable $page".
- The component name must match the file path: `Admin/Reports` is `resources/js/Pages/Admin/Reports.tsx`.
- Page files must **not** wrap themselves in `AdminLayout`. `app.tsx` already does. Wrapping twice duplicates the header.
- Only real Inertia pages belong under `Pages/`. Components, layouts and helpers live in the excluded folders (`tailadmin-source`, `layouts`, `Back`) so they are not treated as routes.

**Navigation**
- Use `Link` from `@inertiajs/react`. Never `next/link` or `<a href>` for internal links.
- Get the current path with the `usePathname` hook in `tailadmin-source/hooks/usePathname`, not `usePage()` inside shared layout components.
- Menu items go in `Navigation.tsx`. Build admin URLs with `adminPath("x")` (prefix `/d`). Don't pass a leading slash to it.
- Labels come from i18n keys: `t("sidebar.items.<key>")`. Add the key to the locale files.

**Head and titles**
- Use Inertia's `<Head>` or the `PageMeta` component. **Never add `react-helmet-async`**: it conflicts with Inertia and throws `removeChild of null` on navigation.

**Images and assets**
- Reference static images with a leading slash: `/admin/images/...`. A relative `src` resolves against the current URL and breaks on nested routes.
- Use plain `<img>`. There is no `next/image`.

**Imports and bundle size**
- Use the `@/` alias (maps to `resources/js`).
- Layout files (`AdminLayout`, `AppHeader`, `AppSidebar`, `NavItem`, `Backdrop`) must import from specific files, **not** from the `tailadmin-source/index.ts` barrel. The barrel pulls charts and the calendar into the main bundle.
- Do not set `{ eager: true }` on `import.meta.glob` in `app.tsx`.

**Next.js leftovers to avoid**
`"use client"`, `next/*` imports, `usePathname`/`useRouter` from `next/navigation`, `next/dynamic`.

**Styling**
- Tailwind v4. TailAdmin's CSS is imported once in `app.tsx` (`tailadmin-source/css/index.css`). Do not add a second Tailwind entry file.
- Sidebar classes (`menu-item`, `menu-item-active`, etc.) are custom utilities defined in that CSS. Don't rename them.
- Support dark mode with the `dark:` variant on every new component.

**Vite**
- `vite.config.js` `input` is only `resources/js/app.tsx`. Whatever `@vite([...])` lists in `app.blade.php` must be in `input`, or the build fails with "Unable to locate file in Vite manifest".
- Delete `public/hot` if the site shows a blank page after `npm run build`.

## Adding a page
1. Create `resources/js/Pages/Admin/Reports.tsx` (return content only; use `<Head title="Reports" />`).
2. Add `Route::get('/d/reports', fn () => Inertia::render('Admin/Reports'));` to `routes/web.php`.
3. Add an entry to `Back/NavItems/Navigation.tsx`.
4. Add the `sidebar.items.reports` translation.
5. Run `npm run build`.

## Don't
- Don't commit `.env`, `node_modules`, `vendor`, `public/build` or `public/hot`.
- Don't add dependencies without a clear need. Check `package.json` first.
- Don't reintroduce Pro-only TailAdmin files. Only free (MIT) components are allowed in this repo.
- Don't hardcode names or URLs (for example "Musharof" or "pomosWeb").

## Verify before finishing
- [ ] `npm run build` succeeds
- [ ] Sidebar links navigate without console errors
- [ ] Images load on both `/dashboard` and `/d/*` routes
- [ ] Dark mode looks correct
