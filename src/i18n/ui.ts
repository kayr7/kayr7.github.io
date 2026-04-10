// All translatable content lives here.
// Add a new language by adding a key to `languages` and a matching block.

export const languages = {
  de: "Deutsch",
  en: "English",
} as const;

export const defaultLang: Lang = "de";
export type Lang = keyof typeof languages;

type CareerEntry = {
  period: string;
  role: string;
  org: string;
  note: string;
};

type ServiceEntry = {
  n: string;
  title: string;
  body: string;
  /** Optional URL path to a dedicated landing page for this service.
   *  When set, the service card on the consulting hub becomes a link. */
  href?: string;
};

type TestimonialEntry = {
  quote: string;
  name: string;
  role: string;
};

export const ui = {
  de: {
    htmlLang: "de",

    nav: {
      home: "Home",
      about: "Über mich",
      consulting: "Consulting",
      blog: "Blog",
      contact: "Kontakt",
    },

    footer: {
      impressum: "Impressum",
      datenschutz: "Datenschutz",
      cookieSettings: "Cookie-Einstellungen",
    },

    languageSwitcher: {
      label: "Sprache",
      switchTo: "English",
    },

    site: {
      title: "Prof. Dr. Kay Rottmann - Professor & Consultant",
      description:
        "Persönliche Website von Prof. Dr. Kay Rottmann - Professor an der HdM Stuttgart und Consultant bei r7net GmbH. Themen: AI, Analytics, Data.",
    },

    home: {
      eyebrow: "Professor · Consultant · Builder",
      headlinePre: "Angewandte",
      headlineAccent: "AI & Analytics",
      headlinePost: ", von der Forschung in die Produktion.",
      lead: "Ich bin Kay Rottmann. Ich lehre habe eine Professur für angewandte KI an der HdM Stuttgart und helfe Unternehmen, mit r7net GmbH AI-Lösungen zu entwickeln und in Produktion zu bringen.",
      ctaPrimary: "Mit mir arbeiten",
      ctaSecondary: "Über mich",
      portraitLabel: "Portrait von Kay Rottmann",
      portraitHint:
        "Professionell, aber warm. Natürliches Licht, weicher Hintergrund, idealerweise draußen oder in einer Bücher-/Büro-Umgebung. Schulteraufwärts.",
      credibility: "Erfahrungen in AI Anwendungen bei:",
      whatIDoEyebrow: "Was ich mache",
      whatIDoTitle: "Zwei Zielgruppen, eine Mission.",
      whatIDoLead:
        "Mir ist wichtig, dass AI nicht nur ein Hype ist, sondern einen echten Mehrwert liefert. Egal, ob du als Studierende*r das Handwerk lernen willst oder als Unternehmen von AI profitieren möchtest oder ein AI Produkt ausliefern willst - das Ziel ist dasselbe: sinnvolle Nutzung von AI die einen echten Mehrwert liefert.",
      forStudents: "Für Studierende",
      forStudentsTitle: "Lehre & Ressourcen",
      forStudentsBody:
        "Ich lehre an der HdM Stuttgart und in Schulungen zu Angewandter KI, Prompt Engineering und Marketing Analytics - praxisnah, projektgetrieben und an dem orientiert, was wirklich zählt.",
      forStudentsLink: "Was ich unterrichte →",
      forCompanies: "Für Unternehmen",
      forCompaniesTitle: "AI- & Daten-Consulting",
      forCompaniesBody:
        "Mit r7net GmbH helfe ich Unternehmen dabei, AI-Use-Cases zu schärfen, überzeugende Prototypen zu bauen und Produkte in den Live-Betrieb zu bringen - pragmatisch, bezahlbar, messbar.",
      forCompaniesLink: "Leistungen ansehen →",
      pillarsEyebrow: "Grundlagen",
      pillarsTitle: "Wenn Sie nur drei Texte lesen",
      pillarsLead:
        "Längere Leitfäden, die das Wesentliche zu den Themen zusammenfassen, zu denen ich am häufigsten gefragt werde.",
      pillarsRead: "Lesen →",
      writingEyebrow: "Texte",
      writingTitle: "Aktuelles aus dem Blog",
      writingAll: "Alle Beiträge →",
      ctaEyebrow: "Kontakt",
      ctaTitle: "Sie haben ein Projekt im Kopf?",
      ctaBody:
        "Egal, ob es um ein Beratungsmandat, einen Gastvortrag oder einfach ein gutes Gespräch über AI geht - ich freue mich, von Ihnen zu hören.",
      ctaButton: "Nachricht senden",
    },

    about: {
      title: "Über mich",
      eyebrow: "Über mich",
      headlinePre: "Forscher, Lehrender,",
      headlineAccent: "Builder",
      headlinePost: ".",
      lead: "Mehr als 15 Jahre AI in Forschung, Industrie und Lehre - von maschineller Übersetzung bei Meta über Manufacturing-AI bei Bosch und Alexa bei Amazon bis zu r7net GmbH und der HdM Stuttgart.",
      portraitLabel: "Portrait, etwas informeller",
      portraitHint:
        "Kontrast zum Hero-Bild - vielleicht im Vortrag, im Gespräch mit Studierenden oder am Whiteboard.",
      shortTitle: "Kurz gesagt",
      shortP1:
        "Ich bin Informatiker mit einem Faible für Sprache - promoviert am Karlsruhe Institute of Technology, Diplom mit Bestnote 1.0 und Klaus-Tschira-Preis für die beste Abschlussarbeit im Bereich Informatik (2007).",
      shortP2:
        "Seitdem habe ich AI-Systeme an einigen der spannendsten Stellen der Branche gebaut: Skalierung der maschinellen Übersetzung von Meta auf 800 Millionen tägliche Nutzer*innen, Integration von AI im Manufacturing bei Bosch im Center for AI, internationale NLU-Forschung für Alexa bei Amazon. Über 20 peer-reviewed Publikationen (ACL, EMNLP, NAACL, ICLR) und mehrere US-Patente sind dabei entstanden.",
      shortP3:
        "Heute mache ich zwei Dinge: Ich lehre Angewandte KI an der HdM Stuttgart, und ich berate und baue mit r7net GmbH praxisnahe AI-Lösungen für Unternehmen. Beides speist sich aus derselben Überzeugung: AI ist erst dann nützlich, wenn sie tatsächlich in Produktion läuft und ein messbares Problem löst.",
      careerEyebrow: "Stationen",
      careerTitle: "Werdegang.",
      career: [
        {
          period: "seit 2025",
          role: "Professor",
          org: "HdM Stuttgart",
          note: "Professur für Angewandte KI.",
        },

        {
          period: "2024 - heute",
          role: "Consultant & Co-Founder",
          org: "r7net GmbH",
          note: "Pragmatische AI für den Mittelstand.",
        },
        {
          period: "2021 - 2024",
          role: "Senior Applied Scientist",
          org: "Amazon (Alexa / AGI)",
          note: "Internationale NLU-Forschung, Alexa AI, Agentic AI, LLMs",
        },
        {
          period: "2019 - 2020",
          role: "Sr. Manager, Head of AI for Manufacturing",
          org: "Bosch Center for AI",
          note: "Optische Inspektion, Produktionsanalyse, Scheduling.",
        },
        {
          period: "2017 - 2018",
          role: "Founder & Co-CEO",
          org: "strukt.re GmbH",
          note: "AI für KMUs.",
        },
        {
          period: "2013 - 2016",
          role: "Engineering Manager",
          org: "Facebook / Meta",
          note: "Maschinelle Übersetzung von 5 Mio. auf 800 Mio. tägliche Nutzer*innen skaliert.",
        },
        {
          period: "2007 - 2013",
          role: "Senior Research Scientist",
          org: "Mobile Technologies GmbH",
          note: "Speech-to-Speech Translation; erste Offline-Übersetzungs-App auf iOS (Jibbigo).",
        },
      ] as CareerEntry[],
      teachingEyebrow: "Lehre",
      teachingTitle: "Was ich an der HdM unterrichte.",
      teachingLead:
        "Mein prinzip ist „Hands-on und Theorie im Dialog\": praktische Anwendungen der Theorie um das Gelernte zu vertiefen und anwendbar zu machen, aktive Diskussion, Discovery und Erleben anstelle von reinem Frontalunterricht.",
      teaching: [
        "Applied AI",
        "Introduction to Prompt Engineering",
        "Generative AI in Social Media",
        "AI for Content Creation",
        "Marketing Tools and Analytics",
        "Marketing Research and Statistics",
        "AI Ethics",
      ],
      researchTitle: "Forschung & aktuelle Projekte",
      researchP1:
        'Derzeit arbeite ich u. a. an „Agentic AI Online Evaluation" und an multiagenten Systemen zur Audience-Simulation.',
      researchP2Pre: "Wiederkehrende Themen: ",
      researchTopics: [
        "LLM-Evaluation und Benchmarking",
        "Multi-Agent-Systeme",
        "AI im Manufacturing",
        "datenbasiertes Marketing",
        "AI-Ethik",
      ],
    },

    consulting: {
      title: "Consulting",
      eyebrow: "r7net GmbH",
      headlinePre: "AI für",
      headlineAccent: "Unternehmen",
      headlinePost: ".",
      lead: "Pragmatisch, bezahlbar, messbar. Wir helfen Unternehmen, AI-Use-Cases zu finden, Prototypen zu bauen und Lösungen in den produktiven Betrieb zu bringen.",
      ctaTop: "Anfrage senden",
      heroImageLabel: "Abstrakt-technisches Bild oder Workshop-Szene",
      heroImageHint:
        "Optionen: (a) abstraktes neuronales Netzwerk / Datenfluss in dezenten Farben, (b) Workshop-Szene mit Whiteboard und Post-its, (c) Maschinen­halle mit Sensorik. Sollte zu Mittelstand & Pragmatismus passen - keine Sci-Fi-Ästhetik.",
      servicesEyebrow: "Leistungen",
      servicesTitle: "Wie wir helfen.",
      services: [
        {
          n: "01",
          title: "KI-Strategie Beratung",
          body: "Analyse Ihrer Geschäftsprozesse, Identifikation von KI-Use-Cases mit hohem ROI, pragmatische Roadmap und Technologieauswahl. Eine ehrliche Antwort darauf, wo KI in Ihrem Unternehmen wirklich Wert schafft.",
          href: "/consulting/ki-strategie-beratung",
        },
        {
          n: "02",
          title: "KI-Workshop für Unternehmen",
          body: "1- bis 2-tägiger Hands-on-Workshop für Ihr Team. Am Ende: priorisierte Use-Case-Liste, geteilte Sprache im Team, klare nächste Schritte. Ohne Buzzword-Bingo.",
          href: "/consulting/ki-workshop-fuer-unternehmen",
        },
        {
          n: "03",
          title: "KI-Agenten Entwicklung",
          body: "Wir bauen KI-Agenten, die nicht nur in der Demo funktionieren. Vom Use-Case zum produktiven Agenten in 6-10 Wochen, inklusive Eval-Framework.",
          href: "/consulting/ki-agenten-entwicklung",
        },
        {
          n: "04",
          title: "KI-Implementierung",
          body: "Vom Prototyp zum produktiven, gemessenen System in 6-12 Wochen. Mit Eval-Framework, Monitoring und sauberer Übergabe an Ihr Team.",
          href: "/consulting/ki-implementierung",
        },
        {
          n: "05",
          title: "ChatGPT Schulung",
          body: "Praxisnahe Schulung, in der Ihre Mitarbeitenden ChatGPT &amp; Co. wirklich produktiv nutzen lernen. Mit Datenschutz-Fokus und konkreten Use-Cases pro Rolle.",
          href: "/consulting/chatgpt-schulung",
        },
        {
          n: "06",
          title: "LLM Evaluation",
          body: "Wir bauen Evaluations-Frameworks, die Ihre KI-Systeme messbar machen - vom Prompt bis zum Multi-Agent-System.",
          href: "/consulting/llm-evaluation",
        },
      ] as ServiceEntry[],
      whyEyebrow: "Warum wir",
      whyTitle: "In Produktion gebaut, nicht in Folien.",
      whyP1:
        "15+ Jahre AI-Erfahrung an einigen der spannendsten Firmen der Branche - Meta, Bosch Center for AI, Amazon Alexa. Über 20 peer-reviewed Publikationen und mehrere US-Patente in AI.",
      whyP2:
        "Was das für Sie heißt: Wir kennen den State of the Art und gleichzeitig die Realität in produktiven Systemen. Wir verkaufen Ihnen keine Buzzwords, sondern bringen Sie zu einer Lösung, die in Ihrem Kontext wirklich funktioniert.",
      testimonialsEyebrow: "Kundenstimmen",
      testimonialsTitle: "Was andere sagen.",
      testimonials: [
        {
          quote: "Working with r7Net has been transformative for our business.  After building NLU based AIs for large brands including iHeart Media and Walmart, we needed to transform our business to leverage custom LLMs.  Kay was instrumental in helping me lead this technical transition including selecting the right technical approach, architecture development and weighting the risks and benefits of each approach. Thanks to his good work, Native Voice successfully secured one of the largest customers in the world.",
          name: "J. Goscha",
          role: "CEO, Native Voice"
        },
      ] as TestimonialEntry[],
      ctaEyebrow: "Interesse?",
      ctaTitle: "Lassen Sie uns reden.",
      ctaBody:
        "Schreiben Sie uns kurz, woran Sie arbeiten - wir melden uns innerhalb weniger Tage zurück.",
      ctaButton: "Kontakt aufnehmen",
    },

    contact: {
      title: "Kontakt",
      eyebrow: "Kontakt",
      headline: "Sagen Sie Hallo.",
      lead: "Der schnellste Weg ist eine kurze E-Mail.",
      emailLabel: "E-Mail",
      hint: "Für Consulting-Anfragen bitte kurz Branche, Projekt und gewünschten Zeitrahmen mitschicken - das spart Ihnen und uns eine Runde.",
    },

    blog: {
      title: "Blog",
      eyebrow: "Texte",
      headline: "Notizen & Ideen.",
      lead: "Notizen zu AI, Daten, Lehre und allem dazwischen.",
      back: "← Alle Beiträge",
      pillarsTitle: "Grundlagen",
      pillarsLead:
        "Längere Leitfäden zu den Themen, zu denen ich am häufigsten gefragt werde.",
      latestTitle: "Aktuelles",
    },

    notFound: {
      title: "Seite nicht gefunden",
      eyebrow: "404",
      headline: "Hier ist nichts.",
      lead: "Die angeforderte Seite existiert nicht (mehr). Vielleicht hilft einer dieser Links weiter:",
      backHome: "Zur Startseite",
    },

    impressum: {
      title: "Impressum",
      subtitle: "Angaben gemäß § 5 TMG",
      provider: "Anbieter",
      providerName: "Prof. Dr. Kay Rottmann",
      providerCountry: "Deutschland",
      contactHeading: "Kontakt",
      contactEmailLabel: "E-Mail",
      contactPhoneLabel: "Telefon",
      responsibleHeading: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
      responsibleName: "Prof. Dr. Kay Rottmann",
      responsibleCountry: "Deutschland",
      disclaimerHeading: "Haftungsausschluss",
      disclaimerBody:
        "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.",
      linksHeading: "Haftung für Links",
      linksBody:
        "Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.",
    },

    datenschutz: {
      title: "Datenschutzerklärung",
      stand: "Stand: 10.04.2026.",
      controllerHeading: "1. Verantwortlicher",
      controllerIntro: "Verantwortlich im Sinne der DSGVO ist:",
      controllerName: "Prof. Dr. Kay Rottmann",
      controllerCountry: "Deutschland",
      controllerEmailLabel: "E-Mail",
      controllerPhoneLabel: "Telefon",
      generalHeading: "2. Allgemeines zur Datenverarbeitung",
      generalBody:
        "Wir verarbeiten personenbezogene Daten unserer Nutzer*innen grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung erfolgt nur nach Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) oder wenn ein anderer Erlaubnistatbestand greift.",
      logfilesHeading: "3. Server-Logfiles",
      logfilesBody:
        "Beim Aufruf dieser Website werden durch den Hosting-Provider automatisch technische Daten (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Seite, User-Agent) in sog. Server-Logfiles gespeichert. Eine Zusammenführung mit anderen Datenquellen findet nicht statt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.",
      cookiesHeading: "4. Cookies und Einwilligung (Klaro)",
      cookiesP1:
        "Diese Website verwendet einen Consent-Manager (Klaro), um Einwilligungen zu Cookies und ähnlichen Technologien einzuholen und zu verwalten. Ohne Einwilligung werden keine nicht-essenziellen Cookies gesetzt. Die Einwilligung kann jederzeit über den Link „Cookie-Einstellungen\" im Footer widerrufen werden.",
      cookiesP2:
        "Notwendig ist lediglich ein technischer Cookie (`klaro-consent`), der die Einwilligungsentscheidung selbst speichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.",
      gaHeading: "5. Google Analytics 4 mit Consent Mode v2",
      gaP1:
        "Diese Website verwendet Google Analytics 4, einen Webanalyse-Dienst der Google Ireland Limited. Google Analytics wird ausschließlich nach ausdrücklicher Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) geladen. Vor der Einwilligung werden keine Cookies gesetzt und keine personenbezogenen Daten an Google übertragen.",
      gaP2:
        "Wir setzen den Google Consent Mode v2 ein. Das bedeutet: Wenn die Einwilligung abgelehnt oder noch nicht erteilt wurde, übermittelt der Google-Tag nur sogenannte „cookieless pings\" - anonyme, nicht-individuelle Signale, die kein Re-Identifizieren erlauben. Erst nach Einwilligung werden vollständige Analytics-Daten erhoben.",
      gaP3:
        "Wir verwenden außerdem die IP-Anonymisierung (`anonymize_ip`). Empfänger der Daten ist Google Ireland Limited, ggf. mit Übermittlung in die USA auf Grundlage des EU-US Data Privacy Framework.",
      gaP4: "Speicherdauer: gemäß Google-Voreinstellung (i. d. R. 14 Monate, in GA4 konfigurierbar).",
      gaP5: "Du kannst die Einwilligung jederzeit über „Cookie-Einstellungen\" im Footer widerrufen.",
      rightsHeading: "6. Deine Rechte",
      rightsBody:
        "Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Außerdem besteht ein Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO).",
      contactHeading: "7. Kontakt",
      contactBodyPre: "Bei Fragen zum Datenschutz erreichst du uns unter ",
    },
  },

  en: {
    htmlLang: "en",

    nav: {
      home: "Home",
      about: "About",
      consulting: "Consulting",
      blog: "Blog",
      contact: "Contact",
    },

    footer: {
      impressum: "Imprint",
      datenschutz: "Privacy",
      cookieSettings: "Cookie settings",
    },

    languageSwitcher: {
      label: "Language",
      switchTo: "Deutsch",
    },

    site: {
      title: "Prof. Kay Rottmann - Professor & Consultant",
      description:
        "Personal site of Prof. Kay Rottmann - Professor at HdM Stuttgart and consultant at r7net GmbH. Topics: AI, data, marketing analytics.",
    },

    home: {
      eyebrow: "Professor · Consultant · Builder",
      headlinePre: "Applied",
      headlineAccent: "AI & Data",
      headlinePost: ", from research to production.",
      lead: "I'm Kay Rottmann. I am a professor for applied AI at HdM Stuttgart and help companies develop AI solutions and bring them to production through r7net GmbH.",
      ctaPrimary: "Work with me",
      ctaSecondary: "About me",
      portraitLabel: "Portrait of Kay Rottmann",
      portraitHint:
        "Professional but warm headshot. Natural light, soft background, ideally outdoors or in a bookshelf/office setting. Shoulders-up.",
      credibility: "Experience in building AI applications at:",
      whatIDoEyebrow: "What I do",
      whatIDoTitle: "Two audiences, one mission.",
      whatIDoLead:
        "It is important to me that AI is not just hype, but delivers real value. Whether you are a student wanting to learn the craft or a company looking to benefit from AI or ship an AI product - the goal is the same: meaningful use of AI that delivers genuine value.",
      forStudents: "For students",
      forStudentsTitle: "Lectures & resources",
      forStudentsBody:
        "I teach Applied AI, Prompt Engineering, and Marketing Analytics at HdM Stuttgart and in corporate training - practical, project-driven, and focused on what actually matters.",
      forStudentsLink: "See what I teach →",
      forCompanies: "For companies",
      forCompaniesTitle: "AI & data consulting",
      forCompaniesBody:
        "Through r7net GmbH, I help companies scope AI use cases, build convincing prototypes, and ship products into live operation - pragmatic, affordable, measurable.",
      forCompaniesLink: "See services →",
      pillarsEyebrow: "Foundations",
      pillarsTitle: "If you only read three pieces",
      pillarsLead:
        "Long-form guides that capture the essentials on the topics I get asked about most often.",
      pillarsRead: "Read →",
      writingEyebrow: "Writing",
      writingTitle: "Latest from the blog",
      writingAll: "All posts →",
      ctaEyebrow: "Get in touch",
      ctaTitle: "Have a project in mind?",
      ctaBody:
        "Whether it's a consulting engagement, a guest lecture, or just a good conversation about AI - I'd love to hear from you.",
      ctaButton: "Send me a message",
    },

    about: {
      title: "About",
      eyebrow: "About me",
      headlinePre: "Researcher, teacher,",
      headlineAccent: "builder",
      headlinePost: ".",
      lead: "More than 15 years of AI in research, industry and academia - from machine translation at Meta to manufacturing AI at Bosch and Alexa at Amazon, to r7net GmbH and HdM Stuttgart.",
      portraitLabel: "Second portrait, more informal",
      portraitHint:
        "Should contrast the hero portrait - perhaps in a lecture, talking with students, or at a whiteboard.",
      shortTitle: "In short",
      shortP1:
        'Computer scientist with a soft spot for language - PhD from Karlsruhe Institute of Technology, Diplom with the highest grade (1.0) and the Klaus Tschira Award for the best thesis in the field of computer science (2007).',
      shortP2:
        "Since then I have built AI systems at some of the most exciting places in the industry: scaling machine translation at Meta to 800 million daily users, integration of AI in manufacturing at the Bosch Center for AI, and international NLU research for Alexa at Amazon. Along the way, 20+ peer-reviewed publications (ACL, EMNLP, NAACL, ICLR) and several U.S. patents.",
      shortP3:
        "Today I do two things: I teach Applied AI at HdM Stuttgart, and I advise and build practical AI solutions for companies through r7net GmbH. Both come from the same conviction: AI is only useful once it actually runs in production and solves a measurable problem.",
      careerEyebrow: "Career",
      careerTitle: "Career.",
      career: [
        {
          period: "since 2025",
          role: "Professor",
          org: "HdM Stuttgart",
          note: "Professorship for Applied AI.",
        },
        {
          period: "2024 - present",
          role: "Consultant & Co-Founder",
          org: "r7net GmbH",
          note: "Pragmatic AI for companies.",
        },
        {
          period: "2021 - 2024",
          role: "Senior Applied Scientist",
          org: "Amazon (Alexa / AGI)",
          note: "International NLU research, Alexa AI, Agentic AI, LLMs",
        },
        {
          period: "2019 - 2020",
          role: "Sr. Manager, Head of AI for Manufacturing",
          org: "Bosch Center for AI",
          note: "Optical inspection, production analytics, scheduling.",
        },
        {
          period: "2017 - 2018",
          role: "Founder & Co-CEO",
          org: "strukt.re GmbH",
          note: "AI for SMBs.",
        },
        {
          period: "2013 - 2016",
          role: "Engineering Manager",
          org: "Facebook / Meta",
          note: "Scaled machine translation from 5M to 800M daily active users.",
        },
        {
          period: "2007 - 2013",
          role: "Senior Research Scientist",
          org: "Mobile Technologies GmbH",
          note: "Speech-to-speech translation; first offline translation app on iOS (Jibbigo).",
        },
      ] as CareerEntry[],
      teachingEyebrow: "Teaching",
      teachingTitle: "What I teach at HdM.",
      teachingLead:
        "My principle is a dialogue between 'hands-on and theory': practical applications of theory to deepen learning and make it applicable, active discussion, discovery, and experience instead of purely frontal lectures.",
      teaching: [
        "Applied AI",
        "Introduction to Prompt Engineering",
        "Generative AI in Social Media",
        "AI for Content Creation",
        "Marketing Tools and Analytics",
        "Marketing Research and Statistics",
        "AI Ethics",
      ],
      researchTitle: "Research & current projects",
      researchP1:
        'I currently work on "Agentic AI Online Evaluation" and on multi-agent systems for audience simulation.',
      researchP2Pre: "Recurring themes: ",
      researchTopics: [
        "LLM evaluation and benchmarking",
        "multi-agent systems",
        "AI in manufacturing",
        "data-driven marketing",
        "AI ethics",
      ],
    },

    consulting: {
      title: "Consulting",
      eyebrow: "r7net GmbH",
      headlinePre: "AI for",
      headlineAccent: "companies",
      headlinePost: ".",
      lead: "Pragmatic, affordable, measurable. We help companies find AI use cases, build prototypes, and ship solutions into production.",
      ctaTop: "Send a request",
      heroImageLabel: "Abstract tech or workshop scene",
      heroImageHint:
        "Options: (a) abstract neural network/data flow in muted colors, (b) workshop scene with whiteboard and post-its, (c) factory floor with sensors. Should match pragmatism - no sci-fi aesthetic.",
      servicesEyebrow: "Services",
      servicesTitle: "How we help.",
      services: [
        {
          n: "01",
          title: "AI strategy consulting",
          body: "Analysis of your business processes, identification of high-ROI use cases, pragmatic roadmap, and technology selection. An honest answer to where AI actually creates value in your business.",
          href: "/en/consulting/ai-strategy-consulting",
        },
        {
          n: "02",
          title: "AI workshop for companies",
          body: "1- to 2-day hands-on workshop for your team. End result: prioritized use-case list, shared vocabulary, clear next steps. No buzzword bingo.",
          href: "/en/consulting/ai-workshop-for-companies",
        },
        {
          n: "03",
          title: "AI agent development",
          body: "We build AI agents that don't just work in a demo. From use case to production agent in 6 to 10 weeks, including eval framework, monitoring, and clean handover.",
          href: "/en/consulting/ai-agent-development",
        },
        {
          n: "04",
          title: "AI implementation",
          body: "From prototype to production-ready, measured system in 6 to 12 weeks. With eval framework, monitoring, and clean handover to your team.",
          href: "/en/consulting/ai-implementation",
        },
        {
          n: "05",
          title: "ChatGPT training",
          body: "Hands-on training where your employees learn to use ChatGPT &amp; co. productively. With a data protection focus and concrete use cases per role.",
          href: "/en/consulting/chatgpt-training",
        },
        {
          n: "06",
          title: "LLM evaluation",
          body: "We build evaluation frameworks that make your AI systems measurable - from prompts to multi-agent systems. So you actually know whether your LLM system works.",
          href: "/en/consulting/llm-evaluation",
        },
      ] as ServiceEntry[],
      whyEyebrow: "Why us",
      whyTitle: "Built in production, not in slides.",
      whyP1:
        "15+ years of AI experience at some of the most exciting companies in the industry - Meta, Bosch Center for AI, Amazon Alexa. 20+ peer-reviewed publications and several U.S. patents in AI.",
      whyP2:
        "What that means for you: we know the state of the art and the reality of running systems in production. We won't sell you buzzwords - we'll get you to a solution that actually works in your context.",
      testimonialsEyebrow: "Client Feedback",
      testimonialsTitle: "What people say.",
      testimonials: [
        {
          quote: "Working with r7Net has been transformative for our business.  After building NLU based AIs for large brands including iHeart Media and Walmart, we needed to transform our business to leverage custom LLMs.  Kay was instrumental in helping me lead this technical transition including selecting the right technical approach, architecture development and weighting the risks and benefits of each approach. Thanks to his good work, Native Voice successfully secured one of the largest customers in the world.",
          name: "J. Goscha",
          role: "CEO, Native Voice"
        },
      ] as TestimonialEntry[],
      ctaEyebrow: "Interested?",
      ctaTitle: "Let's talk.",
      ctaBody:
        "Drop us a short note about what you're working on - we'll get back to you within a few days.",
      ctaButton: "Get in touch",
    },

    contact: {
      title: "Contact",
      eyebrow: "Contact",
      headline: "Say hi.",
      lead: "The fastest way is a short email.",
      emailLabel: "Email",
      hint: "For consulting requests please include a short note on your industry, project, and timeline - saves you and us a round-trip.",
    },

    blog: {
      title: "Blog",
      eyebrow: "Writing",
      headline: "Notes & ideas.",
      lead: "Notes on AI, data, teaching, and everything in between.",
      back: "← All posts",
      pillarsTitle: "Foundations",
      pillarsLead:
        "Long-form guides on the topics I get asked about most often.",
      latestTitle: "Latest",
    },

    notFound: {
      title: "Page not found",
      eyebrow: "404",
      headline: "Nothing here.",
      lead: "The page you were looking for doesn't exist (anymore). Maybe one of these links helps:",
      backHome: "Back to homepage",
    },

    impressum: {
      title: "Imprint",
      subtitle: "Information according to § 5 TMG (German Telemedia Act)",
      provider: "Provider",
      providerName: "Prof. Dr. Kay Rottmann",
      providerCountry: "Germany",
      contactHeading: "Contact",
      contactEmailLabel: "Email",
      contactPhoneLabel: "Phone",
      responsibleHeading: "Responsible for content according to § 55 (2) RStV",
      responsibleName: "Prof. Dr. Kay Rottmann",
      responsibleCountry: "Germany",
      disclaimerHeading: "Disclaimer",
      disclaimerBody:
        "The contents of this website have been created with the greatest possible care. However, no guarantee can be given for the accuracy, completeness and timeliness of the content.",
      linksHeading: "Liability for links",
      linksBody:
        "This website contains links to external third-party websites over which we have no control. We therefore cannot accept any liability for these external contents.",
    },

    datenschutz: {
      title: "Privacy policy",
      stand: "Status: 10.04.2026.",
      controllerHeading: "1. Controller",
      controllerIntro: "The controller in the sense of the GDPR is:",
      controllerName: "Prof. Dr. Kay Rottmann",
      controllerCountry: "Germany",
      controllerEmailLabel: "Email",
      controllerPhoneLabel: "Phone",
      generalHeading: "2. General information on data processing",
      generalBody:
        "We process personal data of our users only insofar as it is necessary to provide a functioning website and our content and services. Processing only takes place with consent (Art. 6 (1) (a) GDPR) or where another legal basis applies.",
      logfilesHeading: "3. Server log files",
      logfilesBody:
        "When you visit this website, our hosting provider automatically stores technical data (e.g. IP address, date/time, requested page, user agent) in so-called server log files. This data is not combined with other data sources. The legal basis is Art. 6 (1) (f) GDPR.",
      cookiesHeading: "4. Cookies and consent (Klaro)",
      cookiesP1:
        'This website uses a consent manager (Klaro) to obtain and manage consent for cookies and similar technologies. No non-essential cookies are set without consent. Consent can be revoked at any time via the "Cookie settings" link in the footer.',
      cookiesP2:
        "Only one technical cookie (`klaro-consent`) is required to store the consent decision itself. The legal basis is Art. 6 (1) (f) GDPR.",
      gaHeading: "5. Google Analytics 4 with Consent Mode v2",
      gaP1:
        "This website uses Google Analytics 4, a web analytics service provided by Google Ireland Limited. Google Analytics is loaded only after explicit consent (Art. 6 (1) (a) GDPR). No cookies are set and no personal data is transferred to Google before consent is given.",
      gaP2:
        'We use Google Consent Mode v2. This means: if consent is denied or has not yet been given, the Google tag only transmits "cookieless pings" - anonymous, non-individual signals that do not allow re-identification. Full analytics data is only collected after consent.',
      gaP3:
        "We also use IP anonymization (`anonymize_ip`). The data is received by Google Ireland Limited, possibly with transfer to the US under the EU-US Data Privacy Framework.",
      gaP4: "Storage duration: per Google's default (typically 14 months, configurable in GA4).",
      gaP5: 'You can revoke your consent at any time via "Cookie settings" in the footer.',
      rightsHeading: "6. Your rights",
      rightsBody:
        "You have the right to access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection (Art. 21). You also have the right to lodge a complaint with a supervisory authority (Art. 77 GDPR).",
      contactHeading: "7. Contact",
      contactBodyPre: "For any privacy-related questions, please contact us at ",
    },
  },
} as const;
