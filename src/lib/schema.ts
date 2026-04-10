// Builders for JSON-LD structured data objects.
//
// Why these live in a helper instead of inline in components:
//   - Reusable across pages
//   - Testable / easy to update
//   - Keeps Layout.astro readable
//
// All builders return plain JS objects; render via <JsonLd data={...} />.

import { siteConfig } from "./site";

/**
 * Person schema for Kay Rottmann. Goes in <head> on every page so that
 * search engines and LLMs treat the entire site as Kay's authored work.
 *
 * The `sameAs` array is critical for entity grounding - LLMs use these
 * cross-references to verify that the Kay Rottmann on this site is the
 * same person as on Google Scholar, ResearchGate, LinkedIn, etc.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Kay Rottmann",
    honorificPrefix: "Prof. Dr.",
    givenName: "Kay",
    familyName: "Rottmann",
    jobTitle: "Professor of Applied AI",
    description:
      "Professor of Applied AI at HdM Stuttgart and Co-Founder of r7net GmbH. 15+ years building AI systems at Meta, Bosch Center for AI, and Amazon.",
    url: siteConfig.url,
    email: `mailto:${siteConfig.contact.email}`,
    worksFor: [
      {
        "@type": "CollegeOrUniversity",
        name: "Hochschule der Medien Stuttgart",
        url: "https://www.hdm-stuttgart.de",
      },
      {
        "@type": "Organization",
        name: siteConfig.company.name,
        url: siteConfig.company.url,
      },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Karlsruhe Institute of Technology",
      url: "https://www.kit.edu",
    },
    award: [
      "Klaus Tschira Award for the best computer science Diplom thesis in Germany (2007)",
    ],
    knowsAbout: [
      "Applied Artificial Intelligence",
      "Large Language Models",
      "Multi-Agent Systems",
      "LLM Evaluation",
      "Machine Translation",
      "AI in Manufacturing",
      "Marketing Analytics",
      "Prompt Engineering",
    ],
    knowsLanguage: ["de", "en"],
    sameAs: [
      siteConfig.profiles.linkedin,
      siteConfig.profiles.googleScholar,
      siteConfig.profiles.researchGate,
      siteConfig.profiles.github,
      siteConfig.profiles.orcid,
      siteConfig.profiles.hdmProfile,
      siteConfig.profiles.hdmAiInstitute,
    ].filter((url) => !url.includes("TODO")),
  };
}

/**
 * Organization schema for r7net GmbH. Surfaces the consulting business
 * as a separate entity from Kay personally - useful for B2B searches
 * and for Google Business Profile alignment.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.company.url}/#organization`,
    name: siteConfig.company.name,
    url: siteConfig.company.url,
    description:
      "AI consulting for the German Mittelstand - strategy, prototyping, agents, evaluation, and manufacturing AI. Pragmatic, affordable, measurable.",
    serviceType: [
      "AI Strategy Consulting",
      "AI Implementation",
      "Custom Chatbot Development",
      "Multi-Agent Systems",
      "LLM Evaluation",
      "Manufacturing AI",
    ],
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.company.address.streetAddress,
      postalCode: siteConfig.company.address.postalCode,
      addressLocality: siteConfig.company.address.addressLocality,
      addressCountry: siteConfig.company.address.addressCountry,
    },
    founder: { "@id": `${siteConfig.url}/#person` },
    employee: { "@id": `${siteConfig.url}/#person` },
  };
}

/**
 * WebSite schema (helps with sitelinks search box and entity recognition).
 */
export function webSiteSchema(lang: "de" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: lang === "de" ? "de-DE" : "en-US",
    publisher: { "@id": `${siteConfig.url}/#person` },
  };
}

/**
 * Article schema for blog posts. Pulled from content collection frontmatter.
 */
export function articleSchema(opts: {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  url: string;
  lang: "de" | "en";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.pubDate.toISOString(),
    dateModified: (opts.updatedDate ?? opts.pubDate).toISOString(),
    inLanguage: opts.lang === "de" ? "de-DE" : "en-US",
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
    },
  };
}

/**
 * FAQPage schema. Wrap any page with an FAQ block in this so the
 * questions appear in Google rich results and get extracted by LLMs.
 */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Service schema for individual service-page templates (e.g.
 * /consulting/ki-workshop-fuer-unternehmen). Connects the service to
 * the parent organization and to Kay as the provider.
 */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": `${siteConfig.company.url}/#organization` },
    areaServed: opts.areaServed ?? "DE",
  };
}
