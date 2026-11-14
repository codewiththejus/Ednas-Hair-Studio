# Ednas Hair Studio — Website:
https://ednas-hair-studio.pages.dev/




A fast, static website for **Ednas Hair Studio**, a men's hair salon and grooming studio in Thazhe Chovva, Kannur.
Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no backend.

---

## 1. Before you publish — checklist

These items are **not confirmed yet**, so the site shows clear placeholders for them:

- [ ] **Phone and WhatsApp number** — both are set to 99462 48202 (the number on the offers poster). Confirm this is also the WhatsApp number; if not, change `whatsappNumber` in `site-data.js`. See section 6.
- [ ] **Special offers** — the four offers are draft data. When the owners confirm them, set `offersConfirmed: true` in `site-data.js` to remove the "Draft" notice. See section 5.
- [ ] **Services** — the eight services are proposed. Edit or remove any in `site-data.js`. See section 4.
- [ ] **Website address** — in `index.html`, replace `https://YOUR-DOMAIN.example` (3 places: `og:image`, and `image` / `logo` in the structured data) with the real address, e.g. `https://ednas-hair-studio.pages.dev`. Social-media previews need the full address.
- [ ] **Tagline wording** — the owners' tagline is "Good Hair Build Confidence" and it is used exactly like that in the footer and in the "Why choose us" section. The hero headline uses the grammatical form "Where good hair builds confidence." Please confirm which wording the owners prefer.

---

## 2. Project structure

```
ednas-hair-studio/
├── index.html        The page structure and fixed text (about, why choose us, contact, footer)
├── style.css         All design: colours, fonts, spacing, layouts for phone / tablet / desktop
├── script.js         Menu, gallery viewer, fade-in effects, builds the lists from site-data.js
├── site-data.js      THE FILE YOU EDIT: phone, WhatsApp, services, offers, gallery photos
├── assets/
│   ├── logo/         The official logo (supplied file, only resized)
│   ├── images/       Optimised studio photographs + social-sharing image
│   └── icons/        Favicon and app icons
└── README.md         This guide
```

---

## 3. Run the website on your computer

**Easiest:** double-click `index.html`. It opens in your browser and everything works (the fonts need an internet connection; otherwise the browser uses similar system fonts).

**Recommended (closer to the real website):**

1. Open a terminal inside the `ednas-hair-studio` folder.
2. Run: `python3 -m http.server 8000`
3. Open <http://localhost:8000> in your browser.

Press `Ctrl + C` in the terminal to stop it. After editing any file, save it and refresh the browser.

---

## 4. Change text and services

**Fixed text** (the about paragraphs, "Why choose us" points, address, footer) is in `index.html`.
Search for the words you want to change and edit them. Keep the tags (`<p>`, `<h3>` …) in place.

**Services** are in `site-data.js`, under `services`. Each one looks like this:

```js
{ name: "Hair Cutting", icon: "scissors", description: "Classic and contemporary cuts, shaped to suit you." },
```

- To **add** a service, copy a line, paste it below with the comma, and change the words.
- To **remove** one, delete its whole line.
- `icon` can be: `scissors`, `razor`, `drop`, `lotus`, `sparkle`, `sun`, `palette`, `waves`.
- Regular prices are deliberately not shown.

---

## 5. Update the special offers

Offers are in `site-data.js`, under `offers`:

```js
{
  includes: ["Hair Cutting", "De-Tan", "Scrub"],
  originalPrice: 520,
  offerPrice: 199
},
```

- Change the services in `includes`, and the two prices (numbers only, no ₹ sign).
- The "You save ₹…" line is calculated automatically.
- To add an offer, copy a `{ ... }` block (with a comma between blocks). To remove one, delete its block.
- **No expiry date is shown** and the page says offers can change. Please do not describe an offer as permanent.
- When every offer is confirmed, change `offersConfirmed: false` to `offersConfirmed: true`.

---

## 6. Add the confirmed phone and WhatsApp number

Open `site-data.js` and fill in the top two values, including the country code:

```js
phone: "+91 98765 43210",
whatsappNumber: "+91 98765 43210",
```

Then save. Automatically:

- the placeholder in the Contact section becomes a tap-to-call link,
- the number is added to the search-engine (structured) data,
- a **WhatsApp** button appears in the Contact section and opens a chat with a pre-written message (you can change the message in `whatsappMessage`).

Leave `whatsappNumber` empty if the business does not use WhatsApp: the button simply stays hidden.

---

## 7. Add or replace photographs

All photographs are the studio's own. They are listed in `site-data.js` under `gallery`.

**Replace a photo:**
1. Prepare the new image as a **WebP or JPG**, about **640 px wide** (and a **1000 px wide** copy if you want a sharper enlarged view). Keep files under about 150 KB.
2. Put it in `assets/images/` with the same file name as the old one — or use a new name and update `src` / `full`.
3. Update `width` and `height` to the new image's real pixel size (this prevents the page from jumping as it loads).
4. Write a short, honest `alt` description (it is read aloud by screen readers and used by search engines).

**Add a photo:** copy one `{ ... }` block inside `gallery`, change the values, and add a comma.

**Hero photo:** the large photo at the top uses `assets/images/interior-mirror-1000.webp` (set in `index.html`).

**Logo:** the official logo is in `assets/logo/`. It has not been redesigned. To update it, replace `ednas-logo-96.png` (and the other sizes) with new files of the same names.

**Tip for free image resizing:** squoosh.app (in your browser) can convert photos to WebP and shrink them.

Note: the storefront photo was cropped at the top so that a neighbouring business's signboard (with its phone number) does not appear on this website.

---

## 8. Deploy with GitHub and Cloudflare Pages

**A. Put the project on GitHub**

1. Create a free account at <https://github.com> and click **New repository**. Name it, for example, `ednas-hair-studio`. Leave it empty (no README).
2. On your computer, in the project folder, run:
   ```
   git init
   git add .
   git commit -m "Ednas Hair Studio website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ednas-hair-studio.git
   git push -u origin main
   ```
   (Or use **Add file → Upload files** on the GitHub page and drag the folder contents in.)

**B. Publish with Cloudflare Pages**

1. Create a free account at <https://dash.cloudflare.com>.
2. Go to **Workers & Pages → Create → Pages → Connect to Git**, and choose your `ednas-hair-studio` repository.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (the project root)
4. Click **Save and Deploy**. After a minute the site is live at an address like `https://ednas-hair-studio.pages.dev`.
5. Put that address into `index.html` (see the checklist above), commit and push again.

**C. Updating the live site later:** edit a file, then `git add . && git commit -m "Update offers" && git push`. Cloudflare Pages republishes automatically.

**D. Using your own domain:** in Cloudflare Pages, open the project → **Custom domains**.

---

## 9. Opening animation

When the site opens, the official logo appears with a gold ring drawing around it, "opens" like a shutter, and then the screen splits down the middle through the logo and slides apart to reveal the website.

- It plays **every time the page is opened or refreshed**.
- Visitors can **tap/click anywhere or press Esc** to skip it.
- It is **skipped automatically** for people who have "reduce motion" turned on, and a built-in safety timer means it can never block the site.
- To **remove it completely**: delete the `<div class="intro" ...> ... </div>` block at the top of `<body>` in `index.html`.
- To change the speed: in `style.css`, section "OPENING ANIMATION", the `animation-delay: 2.2s` on `.intro__half` is when the screen starts to split.

---

## 10. Technical notes

- **Why `site-data.js` is a normal script and not a JSON file:** browsers block loading JSON files when you open `index.html` directly from your computer. A normal script works everywhere, including Cloudflare Pages.
- **Why services, offers and gallery are built by JavaScript:** so owners edit one simple file instead of repeating HTML. Search engines such as Google run JavaScript, but the address, hours and business details are written directly in the HTML so they are always readable.
- **Performance:** photographs are resized and compressed to WebP, below-the-fold images load lazily, there are no JavaScript libraries, and the only external request is the Google Fonts stylesheet. If fonts cannot load, elegant system fonts take over.
- **Accessibility:** skip-to-content link, keyboard-friendly menu (Esc closes it), visible focus outlines, descriptive image text, and animations switch off for people who prefer reduced motion.
- **Search engines:** the page has a title, description, Open Graph tags and `HairSalon` structured data containing only verified details (name, address, hours, Instagram, opening date). Good on-page content helps search visibility, but no ranking on Google can be guaranteed.
