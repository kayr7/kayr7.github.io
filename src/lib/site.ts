// Site-wide configuration. Adjust before deploying.
export const siteConfig = {
  name: "Prof. Dr. Kay Rottmann",
  title: "Prof. Dr. Kay Rottmann - Professor & Consultant",
  description:
    "Personal site of Prof. Dr. Kay Rottmann - Professor at HdM Stuttgart and consultant. Topics: AI, data, analytics.",
  url: "https://www.kay-rottmann.de",
  author: "Kay Rottmann",
  locale: "de-DE",

  // Replace with your real GA4 measurement ID before going live.
  gaMeasurementId: "G-49P45T2V1R",

  contact: {
    email: "hello@kay-rottmann.de",
    // Single source of truth for the public phone number. Never rendered
    // as plain text in static HTML — see ObfuscatedContact.astro for the
    // TMG-compliant rendering path that defeats naive scrapers.
    phone: "+49 151 67968529",
  },

  company: {
    name: "r7net GmbH",
    // r7net.de domain not yet live; use the consulting page on this site
    // as the canonical organization URL so JSON-LD stays valid.
    url: "https://www.kay-rottmann.de/consulting",
    address: {
      streetAddress: "Blammerbergstr. 120",
      postalCode: "71263",
      addressLocality: "Weil der Stadt",
      addressCountry: "DE",
    },
  },

  // External profiles. Used in JSON-LD `sameAs` to ground Kay as an
  // entity for LLMs and search engines.
  profiles: {
    linkedin: "https://www.linkedin.com/in/kay-rottmann-5279798a",
    googleScholar: "https://scholar.google.com/citations?user=YLUnbqEAAAAJ",
    researchGate: "https://www.researchgate.net/profile/Kay-Rottmann",
    github: "https://github.com/kayr7",
    orcid: "https://orcid.org/0009-0009-7136-1245",
    hdmProfile: "https://www.hdm-stuttgart.de/person/rottmannk/",
    hdmAiInstitute: "https://ai.hdm-stuttgart.de/",
  },
} as const;
