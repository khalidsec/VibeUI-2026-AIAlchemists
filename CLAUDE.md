# CLAUDE.md — Vibe UI Challenge 2026

## Competition Overview

This is a UI competition (15 June 2026, 8AM–3PM) at UTM SOC, Level 2, Block N28A.
Theme: **Frozen Dumpling Ordering & Student Seller Management Platform**

### Sponsor: Hot Meal Bar (好米巴)
- **Chinese Muslim restaurant** located at KTF, UTM Alumni area
- Expanding digital services — wants a modern web application
- Platform purpose: students browse frozen dumplings, place orders, AND register as sellers under Hot Meal Bar
- Brand identity must reflect Chinese Muslim fusion dining
- **ONLY use sponsor logo** (`./assets/sponsor/HoteMeal_logo.jpeg`) in header/footer on all pages
- Do NOT use sponsor food photos — use high-quality Unsplash images for products instead

## Technical Rules

- **Frameworks ALLOWED**: React / Vue / other frameworks are officially permitted
- **AI tools allowed**: Claude Code, Copilot, Gemini, Cursor — all officially permitted
- **No red, yellow, green anywhere in the UI** — cliché food app colors, will lose marks
- All submissions via GitHub. Commit frequently with clear messages — judges review commit history
- Application must be **fully functional during demonstration**

## Tech Stack (Our Choice)

- **React 18** + **Vite** — fast dev server, component-based architecture
- **Tailwind CSS v3** — utility-first styling, custom theme with sponsor colors
- **Framer Motion** — page transitions, hover animations, scroll reveals, micro-interactions (this is our edge for "signature design element" worth 5 marks)
- **Lucide React** — clean, consistent icon set
- **React Router** (if needed) or simple state-based routing
- JSON data files from code pack copied into `/public/data/` or imported directly

### Project Setup
```bash
npx create-vite@latest hotmealbar --template react
cd hotmealbar
npm install
npm install framer-motion lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

### Architecture Pattern
```
src/
├── components/          # Reusable UI components
│   ├── layout/          # Header, Footer, MobileNav, Sidebar
│   ├── ui/              # Button, Card, Badge, Input, Modal
│   └── features/        # Cart, ProductCard, OrderTracker, DeliveryTable
├── pages/               # One component per page/route
│   ├── Landing.jsx
│   ├── Catalog.jsx
│   ├── Checkout.jsx
│   ├── OrderConfirmation.jsx
│   ├── TrackOrder.jsx
│   ├── SellerApplication.jsx
│   └── admin/
│       ├── Dashboard.jsx
│       └── OrderManagement.jsx
├── context/             # React Context for global state
│   ├── CartContext.jsx
│   └── AppContext.jsx
├── data/                # JSON data files from code pack
│   ├── products.js      # Hardcoded 5-10 frozen dumpling products with Unsplash images
│   ├── customers.json
│   ├── orders.json
│   ├── delivery.json    # 200+ records — USE THIS for admin table
│   └── ratings.json
├── hooks/               # Custom hooks (useCart, useOrders, useResponsive)
├── utils/               # Helpers (formatCurrency, filterOrders, etc.)
├── App.jsx              # Root component with routing
├── main.jsx             # Entry point
└── index.css            # Tailwind directives + custom styles
```

### Framer Motion Usage (for signature design element + polish)
- Page transitions: `AnimatePresence` + `motion.div` with fade/slide
- Product cards: hover scale + shadow lift
- Cart drawer: slide-in from right with spring physics
- Order tracking steps: staggered reveal animation
- Landing hero: entrance animation sequence
- Scroll-triggered reveals for sections below fold
- Modal/overlay: backdrop fade + content scale-up
- Numbers/stats: count-up animation on landing page

## Color Palette (from code pack + sponsor identity)

- **Primary / Brand Dark**: Navy `#1b263b`
- **Accent**: Warm Copper `#c97c5d`
- **Secondary**: Slate Blue `#415a77`
- **Background**: Soft Ivory `#f8f5f2`
- **Success**: Teal `#2A9D8F` (NOT green — this is the approved success color)
- **Text on dark**: `#ffffff` or `#f8f5f2`
- **Text on light**: `#1b263b`

Never use red, bright yellow, or green for buttons, badges, alerts, status indicators, or any UI element.
For success states use Teal `#2A9D8F`, for warnings use Copper, for errors use a muted dark tone.

## Required Pages (6 Requirements from Briefing)

### 1. Landing Page (15 marks depend on this)
- Creates strong first impression of **Hot Meal Bar** brand identity
- Must clearly establish: Chinese Muslim restaurant at KTF & Alumni UTM
- Hero section with product offering + strong CTA within first viewport (5 marks)
- Featured frozen dumplings + ongoing promotions/discounts above the fold (4 marks)
- **Fast reorder / quick-pick UX pattern** for popular items (3 marks)
- Visual hierarchy: hero → product listings → primary action, no confusion (3 marks)

### 2. Dumpling Ordering Interface
- Browse ONLY frozen dumpling products — nothing else (no noodles, no drinks, no desserts)
- **5-10 frozen dumpling varieties** — hardcode these, do NOT use meals.json (it has irrelevant items)
- Example products: Classic Pork Dumpling, Chicken Dumpling, Prawn Har Gow, Beef Dumpling, Veggie Gyoza, Kimchi Mandu, Mushroom Dumpling, Combo Pack
- Use high-quality Unsplash dumpling/gyoza photos for product images
- Cart with quantity adjustment

### 3. Order Confirmation (NEW — explicitly required)
- **Validate required inputs** before order submission
- Display **order confirmation message** after successful submission
- Full flow: product selection → delivery address → payment confirmation (7 marks — HIGHEST single item!)

### 4. Seller Registration Interface (Student Job Application)
- Registration form for students to apply as frozen dumpling sellers
- All required form fields included
- **Value proposition clearly presented** to guide user understanding (6 marks)

### 5. Order Management Interface (Seller/Admin Panel)
- Sellers can **view and manage customer orders**
- Includes **settlement details** and **order tracking information**
- **200+ delivery history records** displayed efficiently (6 marks)
- Required data fields: order number, delivery ID, order date/time, delivery time, status, order items
- Use tables, cards, or lists — must render without performance issues
- Support search, filter, sort, pagination

### 6. Responsive Design
- Desktop, tablet, AND mobile — all properly handled
- Mobile: clean ordering view, proper touch targets, readable text, no overflow
- **Tablet: must be its own layout** — NOT scaled-down mobile or compressed desktop (5 marks)
- Desktop: richer admin-style interface, distinct from mobile consumer view

## Judging Criteria — EXACT Point Breakdown (100 total)

### A. Visual Design & Brand Identity — 25 marks
| Item | Points |
|------|--------|
| Well-balanced color palette, visual harmony, modern design | 5 |
| Sponsor brand assets (logos, color guide) on ALL pages | 5 |
| Typography: deliberate font pairing, consistent scale/weight | 5 |
| Consistent visual identity across ALL pages | 5 |
| **One distinctive signature design element** (memorable, not generic) | 5 |

### B. Layout & Responsiveness — 25 marks
| Item | Points |
|------|--------|
| Mobile: clean, proper touch targets, readable, no overflow | 5 |
| **Tablet: properly handled (NOT just scaled mobile/compressed desktop)** | 5 |
| Desktop: richer interface, admin-style, distinct from mobile | 5 |
| No horizontal scroll, broken grids, or overlapping at any screen size | 5 |
| Spacing, fonts, components scale properly across breakpoints | 5 |

### C. Core Feature Completeness — 25 marks
| Item | Points |
|------|--------|
| **Ordering flow complete: product → address → payment confirmation** | **7** |
| 200+ delivery records rendering without lag | 6 |
| Job Application page with all fields + value proposition | 6 |
| Track Order page with progress indicator + simulated data | 6 |

### D. Landing Page & First Impression — 15 marks
| Item | Points |
|------|--------|
| Hero section + CTA within first viewport | 5 |
| Discounts/featured items above the fold | 4 |
| Fast reorder / quick-pick UX pattern | 3 |
| Visual hierarchy: hero → products → action | 3 |

### E. Cross-Browser Continuity — 10 marks
| Item | Points |
|------|--------|
| Ordering flow works across Chrome, Edge, Firefox, Safari | 4 |
| 200+ records renders across all browsers | 3 |
| Job Application works across all browsers | 3 |

## Strategic Priority (by total marks impact)

1. **Ordering flow** (product → address → payment → confirmation) = 7 + 4 = **11 marks**
2. **200+ delivery history records** efficient display = 6 + 3 = **9 marks**
3. **Job Application page** complete = 6 + 3 = **9 marks**
4. **Track Order page** with progress indicator = **6 marks**
5. **Landing page hero + CTA** = **5 marks**
6. **Sponsor branding on all pages** = **5 marks**
7. **Signature design element** = **5 marks**
8. **Tablet-specific layout** = **5 marks**

## Original Code Pack Structure (Reference Only)

The competition-provided code pack uses vanilla JS. We are rebuilding in React from scratch using:
- `/data/` JSON files: ONLY delivery.json, orders.json, customers.json, ratings.json (for admin/tracking)
- `/assets/sponsor/HoteMeal_logo.jpeg` — ONLY the logo, no other sponsor images
- `tailwind.config.js` color palette values (port into our Tailwind config)
- Products are HARDCODED 5-10 frozen dumplings with Unsplash images — do NOT use meals.json

## How to Add a New Page

1. Create component in `src/pages/NewPage.jsx`
2. Add route in `App.jsx`
3. Add nav link in Header/MobileNav components
4. Import data from `src/data/` if needed
5. Wrap sections in `motion.div` for animations

## Code Style

- **React functional components** with hooks (useState, useEffect, useContext, useMemo)
- **Tailwind utility classes** for all styling — custom CSS only for animations Tailwind can't handle
- **Framer Motion** for all animations — no raw CSS transitions
- Component naming: PascalCase (`ProductCard.jsx`, `OrderTracker.jsx`)
- Keep components small and focused — extract reusable UI into `components/ui/`
- Mobile-first responsive: start with mobile layout, add `md:` and `lg:` breakpoints
- Semantic HTML inside components (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Accessible: proper labels, alt text, ARIA, keyboard navigation on interactive elements
- Performance: `useMemo` for filtered/sorted lists, pagination for 200+ records, lazy load images
- Cross-browser safe: avoid bleeding-edge CSS, test across Chrome/Firefox/Safari/Edge
- **No inline styles** — use Tailwind classes exclusively
- Use `clsx` or template literals for conditional class names

## Git Workflow

- Commit after every meaningful change
- Clear commit messages: "Add order tracking page layout" not "update"
- Push regularly — judges review commit history for progression

## Content Context

- Sponsor is **Hot Meal Bar (好米巴)** — Chinese Muslim restaurant
- Theme is **frozen dumplings ONLY** — no noodles, no hot meals, no other food categories
- Products: 5-10 frozen dumpling varieties, hardcoded with Unsplash images
- Location: KTF, UTM Alumni area, Johor Bahru
- Target users: UTM university students
- Dual purpose: students ORDER dumplings + students SELL dumplings as resellers
- Use ONLY the sponsor logo in header/footer — no sponsor food photos anywhere
