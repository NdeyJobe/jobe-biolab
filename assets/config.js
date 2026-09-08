/* ============================================================
   JOBE BIOLAB — CENTRALIZED CONFIGURATION
   All public-facing business details live here.
   Do NOT add supplier names, supplier contacts, or internal
   pricing to this file — it is served publicly.
   ============================================================ */

const SITE_CONFIG = {
  brand: "Jobe Biolab",
  tagline: "Private Label Sun Care",
  domain: "https://jobebiolab.com",
  contactEmail: "info@jobebiolab.com",
  formspreeId: "mnjyrljb",
  formspreeEndpoint: "https://formspree.io/f/mnjyrljb",
  year: new Date().getFullYear(),

  /* MOQ */
  startingMOQ: 250,
  moqLabel: "Starting B2B order quantity: 250 units.",
  moqQualifier: "Subject to product availability, packaging configuration, branding requirements, and project scope.",

  /* Pricing policy */
  publicPricing: false,
  pricingStatement: "Pricing is confirmed during the inquiry process and depends on quantity, packaging, branding, labeling requirements, customization, and current inventory availability.",

  /* Supplier — never expose publicly */
  publicSupplierDisclosure: false,
  manufacturingStatement: "Manufactured through qualified U.S. manufacturing partners.",

  /* Nav */
  nav: [
    { label: "Sun Care",    href: "/sun-care/" },
    { label: "How It Works", href: "/how-it-works/" },
    { label: "Samples",     href: "/samples/" },
    { label: "About",       href: "/about/" },
    { label: "FAQs",        href: "/faqs/" },
    { label: "Contact",     href: "/contact/" },
  ],
  ctaPrimary:   { label: "Start Your Inquiry", href: "/contact/" },
  ctaSecondary: { label: "Explore Sun Care",   href: "/sun-care/" },
};

/* ============================================================
   PRODUCT PROGRAMS
   Add future programs here. Only "featured" programs render
   publicly. pendingClaims must never render on the public site.
   ============================================================ */

const PRODUCT_PROGRAMS = {
  mineralSpf50Cream: {
    publicName: "Mineral SPF 50 Cream",
    status: "featured",
    activeIngredient: "Zinc Oxide",
    activePercentage: "17.5%",
    form: "Cream",
    startingMOQ: 250,
    manufacturing: SITE_CONFIG.manufacturingStatement,
    pricing: SITE_CONFIG.pricingStatement,
    /* Claims below are stated by the manufacturer, with supporting
       documentation available from them on request. Obtain and file the
       actual reports; a client's regulatory reviewer will ask for the
       water-resistance test in particular. */
    verifiedClaims: [
      "Mineral SPF 50 cream",
      "17.5% zinc oxide",
      "Broad-spectrum UVA and UVB",
      "Water resistant (80 minutes)",
      "Non-nano zinc oxide",
      "HRIPT tolerance tested",
      "No phenoxyethanol, PEG-named ingredients, or silicones listed in the current formula",
      "Evaluated across a range of skin tones",
    ],
    pendingClaims: [
      /* NEVER render these publicly until documentation is confirmed */
      "Reef safe",
      "Non-comedogenic",
      "Rosacea-prone suitable",
      "Acne-prone suitable",
    ],
    keyIngredients: [
      "Zinc Oxide 17.5%",
      "Aloe Barbadensis Leaf Juice",
      "Shea Butter",
      "Green Tea Leaf Extract",
      "Safflower Seed Oil",
      "Coconut Oil",
      "Cucumber Fruit Extract",
      "Mango Seed Butter",
      "Avocado Oil",
      "Tocopherol",
    ],
    availability: "Confirmed during inquiry",
  }
};

/* ============================================================
   SHARED HEADER / FOOTER INJECTION
   ============================================================ */

function getCurrentPath() {
  return window.location.pathname;
}

function isActivePath(href) {
  const current = getCurrentPath();
  if (href === "/" ) return current === "/";
  return current.startsWith(href);
}

function buildNav(includeCtaInMenu = false) {
  return SITE_CONFIG.nav.map(item => {
    const active = isActivePath(item.href) ? ' aria-current="page" class="nav-link active"' : ' class="nav-link"';
    return `<a href="${item.href}"${active}>${item.label}</a>`;
  }).join("") + (includeCtaInMenu ? `<a href="${SITE_CONFIG.ctaPrimary.href}" class="nav-cta mobile-cta">${SITE_CONFIG.ctaPrimary.label}</a>` : "");
}

function injectHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;
  header.innerHTML = `
    <div class="hdr-inner">
      <a href="/" class="hdr-wordmark" aria-label="${SITE_CONFIG.brand}">
        <span class="hdr-brand">${SITE_CONFIG.brand}</span>
        <span class="hdr-sub">${SITE_CONFIG.tagline}</span>
      </a>
      <nav class="hdr-nav" aria-label="Primary navigation">
        ${buildNav(false)}
      </nav>
      <a href="${SITE_CONFIG.ctaPrimary.href}" class="hdr-cta">${SITE_CONFIG.ctaPrimary.label}</a>
      <button class="hdr-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav aria-label="Mobile navigation">
        ${buildNav(true)}
      </nav>
    </div>
  `;

  const btn = header.querySelector(".hdr-hamburger");
  const menu = header.querySelector(".mobile-menu");
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    menu.setAttribute("aria-hidden", String(open));
    menu.classList.toggle("open", !open);
    document.body.classList.toggle("menu-open", !open);
  });
}

function injectFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  footer.innerHTML = `
    <div class="ftr-inner">
      <div class="ftr-brand">
        <p class="ftr-wordmark">${SITE_CONFIG.brand}</p>
        <p class="ftr-desc">Private-label sun care for emerging beauty and wellness brands.</p>
      </div>
      <div class="ftr-col">
        <p class="ftr-label">Explore</p>
        <a href="/sun-care/">Sun Care</a>
        <a href="/how-it-works/">How It Works</a>
        <a href="/samples/">Samples</a>
        <a href="/about/">About</a>
        <a href="/faqs/">FAQs</a>
      </div>
      <div class="ftr-col">
        <p class="ftr-label">Contact</p>
        <a href="/contact/">Start an Inquiry</a>
        <a href="/contact/">Contact</a>
        <a href="/privacy/">Privacy Policy</a>
        <a href="/terms/">Terms</a>
      </div>
    </div>
    <div class="ftr-legal">
      <p>© <span id="footer-year">${SITE_CONFIG.year}</span> Jobe Biolab LLC. All rights reserved.</p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
});
