## How it works

### Request flow
1. A Laravel route returns `Inertia::render('Admin/Dashboard')`.
2. Laravel renders `resources/views/app.blade.php`, which loads `resources/js/app.tsx` through `@vite`.
3. `app.tsx` finds the matching file in `resources/js/Pages/` and wraps it in `AdminLayout`.
4. Clicking a sidebar link uses Inertia's `<Link>`, so only the page changes. The sidebar and header stay mounted.

> Always return pages with `Inertia::render()`. Returning `view('app')` directly fails with "Undefined variable $page".

### Layout
`app.tsx` applies `AdminLayout` to every page automatically, so **page files must not wrap themselves in a layout.**

```tsx
// Pages/Admin/Dashboard.tsx
export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <Ecommerce />
        </>
    );
}
```

To give one page a different layout (for example, a sign-in page without the sidebar), set it on the page:

```tsx
SignIn.layout = (page: ReactNode) => <AuthPageLayout>{page}</AuthPageLayout>;
```

### Adding a new page
1. Create `resources/js/Pages/Admin/Reports.tsx`.
2. Add a route in `routes/web.php`:
   ```php
   Route::get('/d/reports', fn () => Inertia::render('Admin/Reports'));
   ```
3. Add a menu entry in `resources/js/Pages/Admin/Back/NavItems/Navigation.tsx`:
   ```tsx
   { name: "Reports", key: "reports", icon: <PageIcon fontSize={24} />, path: adminPath("reports") }
   ```
4. Add the label to your translation files under `sidebar.items.reports`.

### Sidebar and active links
- Menu data lives in `Back/NavItems/Navigation.tsx`. The rendering lives in `NavItem.tsx`.
- `adminPath("x")` builds `/d/x`. Change `ADMIN_PREFIX` to use a different prefix.
- The active item is found by comparing the current URL path to each item's `path`. A submenu opens automatically when one of its children is active.

### Images
Static images go in `public/admin/images/` and are referenced with a **leading slash**:

```tsx
<img src="/admin/images/user/owner.png" alt="User" />
```

Without the leading `/`, the browser resolves the path relative to the current URL (for example `/d/admin/images/...`) and the image 404s.

### Page titles
Use Inertia's `<Head title="..." />` or the `PageMeta` component, which wraps it. Don't add `react-helmet-async`: it and Inertia both edit `<head>`, which causes `Cannot read properties of null (reading 'removeChild')` on navigation.

### Theme, sidebar state and language
- `ThemeProvider` toggles dark mode through the `dark` class.
- `SidebarProvider` holds expanded, hovered and mobile-open state.
- `LanguageProvider` and `react-i18next` handle translations. Locale files are in `resources/js/Pages/`.

All three providers are mounted once inside `AdminLayout`.

### Import alias
`@` points to `resources/js` (set in `vite.config.js` and `tsconfig.json`):

```tsx
import AppHeader from "@/Pages/Admin/layouts/AppHeader";
```

### Bundle size tips
- Pages are lazy-loaded (`import.meta.glob` without `eager`), so each page is its own chunk.
- Layout files should import from specific files, not from the `tailadmin-source/index.ts` barrel. The barrel re-exports every component, so it pulls charts and the calendar into the main bundle.
- `app.tsx` excludes non-page folders from the glob, so only real pages are routable.

### Common problems
| Symptom | Cause and fix |
|---|---|
| `Undefined variable $page` | A route returns `view('app')`. Use `Inertia::render()`. |
| `usePage must be used within the Inertia component` | A component calling `usePage` is rendered outside Inertia's `<App>`. Render it only inside pages or the layout. |
| Sidebar text and icons missing | The `menu-item-*` utilities are missing from TailAdmin's CSS, or `app.tsx` isn't importing `tailadmin-source/css/index.css`. |
| Header and content appear twice | A page wraps itself in `AdminLayout` as well as `app.tsx` doing it. Remove the page-level wrapper. |
| Blank page after `npm run build` | A stale `public/hot` file exists. Delete it. |
| "Unable to locate file in Vite manifest" | `@vite` in `app.blade.php` lists a file that isn't in `vite.config.js` `input`. |

### Development
```bash
npm run dev        # Vite dev server with hot reload
npm run build      # production build into public/build
php artisan serve  # or Laravel Herd
```
```bash
# recommended version Laravel 12+
composer run dev # all included (npm run dev & php artisan serve) 
```
