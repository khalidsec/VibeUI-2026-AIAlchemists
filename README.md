# Gourmet Kitchen | Exquisite Hot Meals

> **Note**  
> This repository is a high-fidelity frontend mockup created for a competition that will be held on 15 June.

A high-performance responsive and frontend-only Hot Meal Food Ordering System designed with premium modern aesthetics, rich micro-animations, and a highly interactive user experience.

---

## ✨ Key Features

### 🛒 Customer Journey
- **Interactive Home Page:** Features premium hero banners, dynamic categories, promotional cards, and a quick re-order list by familiar entities.
- **Advanced Catalog Search & Filters:** Handles quick search and multiple filtering parameters (price range, ratings, cooking time, ingredients match) with staggered dynamic loading.
- **Detailed Product Module:** Showcases ingredients lists, customer review streams, and add-to-cart actions.
- **Slide-out Cart Panel:** Allows real-time quantity adjustments, real-time total updates, and seamless checkouts.
- **Checkout & Active Tracking Simulation:** Includes address inputs, mock payment configuration, and a live en-route delivery tracking page that updates step-by-step progress and map coordinates using a background state loop.

### 📊 Admin Panel
- **Real-Time KPI Dashboard:** Displays live revenue, order volume metrics, and client ratings with a custom Canvas-based sales trend line chart.
- **Interactive Orders Ledger:** Search, filter, and modify order stages (Pending, Prep, Out for Delivery, Delivered, Canceled) dynamically.
- **Customer Profiles Directory:** Lists customers, registration dates, order frequencies, and lifetime value metrics.

---

## 🎨 Design System

We avoided standard bright reds, yellows, and greens, opting for a custom tailored, premium palette:
- Primary / Text: Dark Navy (`#1b263b`)
- Accent Color: Warm Copper (`#b86b4d`)
- Secondary: Slate Blue (`#64748b`)
- Background / Base: Soft Ivory (`#fdfbf7`)

---

## 📁 Project Structure

```text
src/
├── components/      # UI structural blocks
│   ├── layout/      # Navigations & Footers
│   ├── ui/          # Generic reusable elements
│   ├── catalog/     # Cards, Modals, Filters
│   └── features/    # Cart Drawers, Form Steps
├── pages/           # Full Screen Route Representations
│   ├── Landing.jsx  # Main Entry
│   ├── Catalog.jsx  # Storefront Browsing
│   ├── Checkout.jsx # Form Validation
│   ├── OrderConfirmation.jsx # Success Page
│   └── admin/       # Management Portals
├── context/         # React Context API files
├── assets/          # Static media
├── data/            # Mock Database
├── App.jsx          # Root Component & Routing
└── main.jsx         # React DOM Entry
```

---

## 🚀 How to Run the Project

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 16 or higher) installed.

### 1. Install Dependencies
Run the following command in the root folder of the project to install all dependencies:
```bash
npm install
```

### 2. Start the Development Server
Launch the local dev server:
```bash
npm run dev
```
By default, the application will run at `http://localhost:5173`. Open this address in your web browser.

### 3. Build for Production
To bundle and optimize the project for production, run:
```bash
npm run build
```
This generates static files in the `dist/` directory. You can preview the production bundle locally with:
```bash
npm run preview
```
