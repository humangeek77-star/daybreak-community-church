# Daybreak Community Church Website

Modern, accessible, high-performance website for **Daybreak Community Church** (Lapel, Indiana). Built with clean semantic HTML5, modern CSS3 variables and responsive layout systems, and vanilla JavaScript with zero external runtime dependencies.

---

## ⛪ Church Information
- **Location:** 1219 Main Street, Lapel, IN 46051
- **Telephone:** (765) 534-4555
- **Senior Pastor:** Andrew Cole (`acole@lapeldaybreak.com`)
- **Sunday Gathering:** 10:00 AM (In-person & Livestream)

---

## 🎨 Design System & Highlights
- **Typography:** Warm, dignified editorial pairing featuring **Playfair Display** (headings & accents) and **Plus Jakarta Sans** (clean, highly readable body typography).
- **Color Scheme:** Deep Charcoal (`#1a1f1d`), Warm Sand/Alabaster (`#fdfbf7`), Forest Slate (`#2d3b36`), and Terracotta Gold (`#c86d51`).
- **Giving & Stewardship Suite:** Symmetrical 6-fund giving modal and dedicated giving page with photographic iconography for Tithes & General, Food Pantry, Youth Ministry, Global Missions, Recovery Anchor, and Benevolence & Care.
- **Car Show Spotlight:** High-definition photography and clear event details for the annual Lapel Village Fair Car Show.
- **Livestream Integration:** Seamless online worship access with links to YouTube and Vimeo broadcasts.

---

## 📁 Repository Structure
```
daybreak-church-website/
├── index.html              # Main landing page & church showcase
├── about.html              # Dedicated About Us & 4 Pillars page
├── ministries.html         # Dedicated Ministries & Outreach page
├── events-calendar.html    # Church events & community calendar
├── meet-the-team.html      # Pastoral & ministry leadership directory
├── members.html            # Membership, small groups & connection portal
├── onlineservices.html     # Live broadcasts, sermons & message archives
├── contact.html            # Dedicated Contact, directions & prayer requests page
├── give.html               # Dedicated Giving & Stewardship page
├── css/
│   ├── style.css           # Core design system, layout & page transition styling
│   └── giving.css          # Giving modal, fund cards & interactive donation styles
├── js/
│   ├── main.js             # Unified smooth page transition & interactive engine
│   └── giving.js           # Multi-fund donation modal logic & frequency selectors
├── assets/
│   └── images/             # Optimized photography, logos, and fund icons
├── serve.js                # Lightweight Node.js local preview server
├── .gitignore              # Standard git ignore definitions
└── README.md               # Documentation & project information
```

---

## 🚀 Local Development & Preview

### Option 1: Node.js (Built-in HTTP server)
```bash
node serve.js
```
Then navigate to `http://localhost:3000`.

### Option 2: Python HTTP Server
```bash
python -m http.server 8080
```
Then navigate to `http://localhost:8080`.

### Option 3: Direct File Opening
Open `index.html` directly in any modern web browser.

---

## ☁️ Deployment

This project is a static site optimized for instant deployment to **Cloudflare Pages**:
- **Build command:** *(none)*
- **Build output directory:** `.` or `/`
- **Root directory:** `/`
