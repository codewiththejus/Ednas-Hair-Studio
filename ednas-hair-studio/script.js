/* ==========================================================================
   EDNAS HAIR STUDIO — SCRIPT
   Plain JavaScript, no libraries. Each section below does one job:

   1. Small helpers
   2. Build services, offers and gallery from site-data.js
   3. Phone + WhatsApp (shown only when numbers are set)
   4. Mobile menu & sticky header
   5. Highlight the current section in the menu
   6. Gallery photo viewer (lightbox)
   7. Fade-in on scroll
   8. Footer year
   ========================================================================== */

(function () {
  "use strict";

  /* 0. OPENING ANIMATION -------------------------------------------------
     The look is all CSS (see "OPENING ANIMATION" in style.css). This code only
     tidies up: it starts the hero animation as the halves open, removes the
     intro when it ends, and lets visitors skip it by tapping or pressing Esc. */

  var root = document.documentElement;
  var intro = document.getElementById("intro");

  if (intro) {
    if (!root.classList.contains("intro-active")) {
      intro.remove();                                  // intro not playing this visit
    } else {
      var halfLeft = intro.querySelector(".intro__half--left");
      var halfRight = intro.querySelector(".intro__half--right");

      var finishIntro = function () {
        root.classList.add("intro-opening");           // hero content rises in
        root.classList.remove("intro-active");         // unlocks scrolling, hides overlay
        if (intro.parentNode) intro.remove();
        document.removeEventListener("keydown", onIntroKey);
      };
      var onIntroKey = function (event) {
        if (event.key === "Escape" || event.key === "Enter" || event.key === " ") finishIntro();
      };

      // The moment the halves start sliding apart, let the hero animate in underneath
      halfLeft.addEventListener("animationstart", function (event) {
        if (event.target === halfLeft) root.classList.add("intro-opening");
      });
      halfRight.addEventListener("animationend", function (event) {
        if (event.target === halfRight) finishIntro();
      });
      intro.addEventListener("click", finishIntro);
      document.addEventListener("keydown", onIntroKey);
    }
  }


  if (typeof SITE_DATA === "undefined") {
    console.warn("site-data.js did not load, so services, offers and gallery cannot be shown.");
    return;
  }

  /* 1. HELPERS ----------------------------------------------------------- */

  var SVG_NS = "http://www.w3.org/2000/svg";

  // Create an element with an optional class and text. Using textContent (not innerHTML)
  // keeps the page safe even if odd characters are typed into site-data.js.
  function make(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Draw an icon from the sprite in index.html
  function makeIcon(name, className) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", className);
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", "#icon-" + name);
    svg.appendChild(use);
    return svg;
  }

  // 2000 -> "₹2,000"
  function rupees(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN");
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }


  /* 2. SERVICES, OFFERS, GALLERY ---------------------------------------- */

  function renderServices() {
    var list = document.getElementById("services-list");
    if (!list || !Array.isArray(SITE_DATA.services)) return;

    SITE_DATA.services.forEach(function (service, i) {
      var item = make("li", "service reveal");
      item.appendChild(makeIcon(service.icon || "scissors", "icon service__icon"));
      item.appendChild(make("span", "service__num", pad(i + 1)));
      item.appendChild(make("h3", "service__name", service.name));
      item.appendChild(make("p", "service__text", service.description));
      list.appendChild(item);
    });
  }

  function renderOffers() {
    var list = document.getElementById("offers-list");
    var draftNote = document.getElementById("offers-draft-note");
    if (!list || !Array.isArray(SITE_DATA.offers)) return;

    // Show the draft notice until the owners confirm the offers
    if (draftNote) draftNote.hidden = SITE_DATA.offersConfirmed === true;

    SITE_DATA.offers.forEach(function (offer, i) {
      var card = make("article", "offer reveal");
      card.appendChild(make("p", "offer__label", "Offer " + pad(i + 1)));

      var includes = make("ul", "offer__includes");
      offer.includes.forEach(function (name) {
        includes.appendChild(make("li", "", name));
      });
      card.appendChild(includes);

      var prices = make("p", "offer__prices");
      var was = make("span", "offer__was", rupees(offer.originalPrice));
      was.setAttribute("aria-label", "Original price " + rupees(offer.originalPrice));
      var now = make("span", "offer__now", rupees(offer.offerPrice));
      now.setAttribute("aria-label", "Offer price " + rupees(offer.offerPrice));
      prices.appendChild(was);
      prices.appendChild(now);
      card.appendChild(prices);

      var saving = offer.originalPrice - offer.offerPrice;
      if (saving > 0) card.appendChild(make("p", "offer__save", "You save " + rupees(saving)));

      list.appendChild(card);
    });
  }

  function renderGallery() {
    var grid = document.getElementById("gallery-grid");
    if (!grid || !Array.isArray(SITE_DATA.gallery)) return;

    SITE_DATA.gallery.forEach(function (photo) {
      var item = make("li", "gallery__item reveal");

      // A real link to the big photo: works even if the viewer below is unavailable.
      var link = make("a", "gallery__link");
      link.href = photo.full || photo.src;
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("data-caption", photo.caption || "");
      link.setAttribute("aria-label", "Enlarge photo: " + (photo.caption || photo.alt));

      var img = make("img", "gallery__img");
      img.src = photo.src;
      img.width = photo.width;
      img.height = photo.height;
      img.alt = photo.alt;
      img.loading = "lazy";
      img.decoding = "async";
      link.appendChild(img);

      if (photo.caption) link.appendChild(make("span", "gallery__caption", photo.caption));

      item.appendChild(link);
      grid.appendChild(item);
    });
  }

  renderServices();
  renderOffers();
  renderGallery();


  /* 3. PHONE + WHATSAPP -------------------------------------------------- */

  function setupContact() {
    var phone = (SITE_DATA.phone || "").trim();
    var whatsapp = (SITE_DATA.whatsappNumber || "").trim();

    // Phone: swap the placeholder for a tap-to-call link
    var digitsOnly = phone.replace(/[^\d+]/g, "");
    var slot = document.getElementById("phone-slot");
    if (slot && digitsOnly.replace(/\D/g, "").length >= 10) {
      var call = make("a", "", phone);
      call.href = "tel:" + digitsOnly;
      slot.textContent = "";
      slot.appendChild(call);

      // "Call Now" button: opens the phone's dialler
      var callButton = document.getElementById("call-btn");
      if (callButton) {
        callButton.href = "tel:" + digitsOnly;
        callButton.hidden = false;
      }

      // Add the number to the search-engine data too
      var ld = document.getElementById("structured-data");
      if (ld) {
        try {
          var data = JSON.parse(ld.textContent);
          data.telephone = digitsOnly;
          ld.textContent = JSON.stringify(data, null, 2);
        } catch (e) { /* leave the structured data unchanged */ }
      }
    }

    // WhatsApp: button stays hidden until a valid number exists
    var waDigits = whatsapp.replace(/\D/g, "");
    var waButton = document.getElementById("whatsapp-btn");
    if (waButton && waDigits.length >= 10) {
      var text = SITE_DATA.whatsappMessage ? "?text=" + encodeURIComponent(SITE_DATA.whatsappMessage) : "";
      waButton.href = "https://wa.me/" + waDigits + text;
      waButton.hidden = false;
    }
  }
  setupContact();


  /* 4. MOBILE MENU & STICKY HEADER -------------------------------------- */

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close the menu after choosing a link
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    // Close with the Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    // If the window is widened to desktop size, reset the menu
    window.matchMedia("(min-width: 900px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();


  /* 5. CURRENT SECTION IN THE MENU -------------------------------------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var linkById = {};
  navLinks.forEach(function (link) { linkById[link.getAttribute("href").slice(1)] = link; });

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) { link.removeAttribute("aria-current"); });
        var active = linkById[entry.target.id];
        if (active) active.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });   // a thin band in the middle of the screen

    Object.keys(linkById).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }


  /* 6. GALLERY PHOTO VIEWER --------------------------------------------- */

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var grid = document.getElementById("gallery-grid");

  if (lightbox && typeof lightbox.showModal === "function" && grid) {
    grid.addEventListener("click", function (event) {
      var link = event.target.closest(".gallery__link");
      if (!link) return;
      event.preventDefault();                       // use the viewer instead of opening a new tab
      var thumb = link.querySelector("img");
      lightboxImg.src = link.href;
      lightboxImg.alt = thumb ? thumb.alt : "";
      lightboxCaption.textContent = link.getAttribute("data-caption") || "";
      lightbox.showModal();
    });

    lightboxClose.addEventListener("click", function () { lightbox.close(); });

    // Clicking the dark area around the photo also closes it
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.close();
    });
  }


  /* 7. FADE-IN ON SCROLL ------------------------------------------------- */

  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      var shown = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        revealObserver.unobserve(el);
        // Items that appear together are staggered slightly
        setTimeout(function () { el.classList.add("is-visible"); }, shown * 90);
        shown += 1;
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  }


  /* 8. FOOTER YEAR ------------------------------------------------------- */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

})();
