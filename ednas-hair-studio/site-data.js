/* ==========================================================================
   EDNAS HAIR STUDIO — SITE DATA
   --------------------------------------------------------------------------
   This is the ONE file the owner / developer edits to change:
     • the phone number and WhatsApp number
     • the list of services
     • the special offers (names, prices)
     • the gallery photographs

   Everything else (layout, design) lives in index.html and style.css.
   After editing, save the file and refresh the page.

   Tip: keep the commas and quote marks exactly as they are.
   ========================================================================== */

const SITE_DATA = {

  /* ------------------------------------------------------------------------
     1. CONTACT DETAILS
     ------------------------------------------------------------------------
     Leave BOTH values as "" (empty) until the owner confirms the numbers.
     While empty:
       • the page shows a clear "phone number to be confirmed" placeholder
       • the WhatsApp button stays hidden (no dead buttons)

     Fill in with the country code, e.g.:
       phone:          "+91 98765 43210"
       whatsappNumber: "+91 98765 43210"       (can be the same number)
     ------------------------------------------------------------------------ */
  phone: "+91 99462 48202",
  whatsappNumber: "+91 99462 48202",
  whatsappMessage: "Hello Ednas Hair Studio, I would like to know more about your services.",


  /* ------------------------------------------------------------------------
     2. SERVICES
     ------------------------------------------------------------------------
     To add a service: copy one { ... }, paste it with a comma after the
     previous one, and change the text.
     To remove a service: delete its { ... } block.
     "icon" must be one of:
       scissors, razor, drop, lotus, sparkle, sun, palette, waves
     (Services are PROPOSED and must be confirmed by the owners.)
     No regular prices are shown, by design.
     ------------------------------------------------------------------------ */
  services: [
    { name: "Hair Cutting",    icon: "scissors", description: "Classic and contemporary cuts, shaped to suit you." },
    { name: "Beard Styling",   icon: "razor",    description: "Clean, defined beard lines trimmed and shaped with care." },
    { name: "Hair Wash",       icon: "drop",     description: "A refreshing wash at our dedicated shampoo station." },
    { name: "Hair Spa",        icon: "lotus",    description: "A nourishing treatment for hair that looks and feels cared for." },
    { name: "Facial",          icon: "sparkle",  description: "Face care to leave your skin feeling fresh and clean." },
    { name: "De-Tan & Scrub",  icon: "sun",      description: "A cleansing scrub and de-tan for fresher-looking skin." },
    { name: "Hair Colouring",  icon: "palette",  description: "Colour applied with attention to the look you want." },
    { name: "Head Massage",    icon: "waves",    description: "A relaxing head massage to help you unwind." }
  ],


  /* ------------------------------------------------------------------------
     3. SPECIAL OFFERS  (DRAFT — must be confirmed before publishing)
     ------------------------------------------------------------------------
     • "includes"      : the services in the package, one per line
     • "originalPrice" : the price before the offer (numbers only, no ₹)
     • "offerPrice"    : the offer price (numbers only, no ₹)
     The "You save" amount is worked out automatically.

     IMPORTANT: no expiry dates are shown, and the page says that offers
     can change. Do not describe an offer as permanent.

     When the owners have confirmed every offer above, change
       offersConfirmed: false   →   offersConfirmed: true
     to remove the "draft" notice from the page.
     ------------------------------------------------------------------------ */
  offersConfirmed: false,

  offers: [
    {
      includes: ["Hair Cutting", "De-Tan", "Scrub"],
      originalPrice: 520,
      offerPrice: 199
    },
    {
      includes: ["Hair Cutting", "Beard", "Scrub", "Head Massage"],
      originalPrice: 620,
      offerPrice: 299
    },
    {
      includes: ["Hair Cutting", "Beard", "Hair Spa"],
      originalPrice: 820,
      offerPrice: 499
    },
    {
      includes: ["Gold Facial", "Hair Cutting", "Beard", "De-Tan"],
      originalPrice: 2000,
      offerPrice: 999
    }
  ],


  /* ------------------------------------------------------------------------
     3b. HAIRSTYLES
     ------------------------------------------------------------------------
     The hairstyle photos shown in the "Hairstyles" section. Files live in
     assets/images/hairstyles/. The style name is printed on each photo, and the
     "name" below is used as its description for screen readers.
     To add a style: copy one { ... } line, add a comma, change the file names.
     To remove one: delete its line.
     "width" / "height" = pixel size of "src" (keeps the page from jumping).
     ------------------------------------------------------------------------ */
  hairstyles: [
    { name: "Taper Cut", src: "assets/images/hairstyles/taper-cut-640.webp", full: "assets/images/hairstyles/taper-cut-1000.webp", width: 640, height: 800 },
    { name: "Side Part", src: "assets/images/hairstyles/side-part-640.webp", full: "assets/images/hairstyles/side-part-1000.webp", width: 640, height: 859 },
    { name: "Mullet", src: "assets/images/hairstyles/mullet-640.webp", full: "assets/images/hairstyles/mullet-1000.webp", width: 640, height: 863 },
    { name: "Curly Top", src: "assets/images/hairstyles/curly-top-640.webp", full: "assets/images/hairstyles/curly-top-1000.webp", width: 640, height: 862 },
    { name: "Fringe (Bangs)", src: "assets/images/hairstyles/fringe-bangs-640.webp", full: "assets/images/hairstyles/fringe-bangs-1000.webp", width: 640, height: 864 },
    { name: "Quiff Haircut", src: "assets/images/hairstyles/quiff-640.webp", full: "assets/images/hairstyles/quiff-1000.webp", width: 640, height: 857 },
    { name: "Design Cut", src: "assets/images/hairstyles/design-cut-640.webp", full: "assets/images/hairstyles/design-cut-1000.webp", width: 640, height: 848 },
    { name: "Undercut", src: "assets/images/hairstyles/undercut-640.webp", full: "assets/images/hairstyles/undercut-1000.webp", width: 640, height: 858 },
    { name: "Fade Haircuts", src: "assets/images/hairstyles/fade-haircuts-640.webp", full: "assets/images/hairstyles/fade-haircuts-1000.webp", width: 640, height: 640 },
    { name: "Shaggy Cut", src: "assets/images/hairstyles/shaggy-cut-640.webp", full: "assets/images/hairstyles/shaggy-cut-1000.webp", width: 640, height: 800 },
    { name: "Faux Hawk", src: "assets/images/hairstyles/faux-hawk-640.webp", full: "assets/images/hairstyles/faux-hawk-1000.webp", width: 640, height: 800 }
  ],


  /* ------------------------------------------------------------------------
     4. GALLERY
     ------------------------------------------------------------------------
     All photographs are the studio's own. Files live in assets/images/.
     • src     : the standard-size file (shown in the grid)
     • full    : the larger file (shown when a photo is clicked)
     • width / height : the pixel size of "src" (stops the page jumping
                        while images load — keep these accurate).
                        Tiles are shown 4:5 (portrait); the full photo
                        appears when a tile is clicked.
     • alt     : a short description for screen readers and search engines
     • caption : the small label under the photo
     To replace a photo: save the new image over the old file name, or change
     "src" / "full" to the new file name. See README.md for image sizes.
     ------------------------------------------------------------------------ */
  gallery: [
    {
      src: "assets/images/interior-mirror-640.webp",
      full: "assets/images/interior-mirror-1000.webp",
      width: 640, height: 1132,
      alt: "Backlit wall mirror with two brown leather barber chairs and a hair steamer inside Ednas Hair Studio",
      caption: "Studio interior"
    },
    {
      src: "assets/images/haircut-service-640.webp",
      full: "assets/images/haircut-service-640.webp",
      width: 640, height: 1138,
      alt: "A barber trimming a client's hair from behind a tan leather chair",
      caption: "Haircut service"
    },
    {
      src: "assets/images/interior-chair-wash-640.webp",
      full: "assets/images/interior-chair-wash-640.webp",
      width: 640, height: 1138,
      alt: "Brown leather barber chair, hair steamer and black shampoo basin in the studio",
      caption: "Barber chair & wash station"
    },
    {
      src: "assets/images/beard-threading-640.webp",
      full: "assets/images/beard-threading-640.webp",
      width: 640, height: 1139,
      alt: "A client having his beard line shaped with a threading technique",
      caption: "Beard styling"
    },
    {
      src: "assets/images/product-shelf-640.webp",
      full: "assets/images/product-shelf-640.webp",
      width: 640, height: 1150,
      alt: "Arched, softly lit shelving displaying hair care and colour products",
      caption: "Grooming products"
    },
    {
      src: "assets/images/wash-basin-640.webp",
      full: "assets/images/wash-basin-640.webp",
      width: 640, height: 1138,
      alt: "Black shampoo basin set on a tan leather unit",
      caption: "Shampoo station"
    },
    {
      src: "assets/images/signboard-logo-640.webp",
      full: "assets/images/signboard-logo-640.webp",
      width: 640, height: 1139,
      alt: "Round illuminated Ednas Hair Studio signboard with the scissors and razor logo",
      caption: "Our signboard"
    },
    {
      src: "assets/images/storefront-640.webp",
      full: "assets/images/storefront-1000.webp",
      width: 640, height: 675,
      alt: "Glass shopfront of Ednas Hair Studio with its illuminated name sign and black and white balloons",
      caption: "Studio front"
    }
  ]
};
