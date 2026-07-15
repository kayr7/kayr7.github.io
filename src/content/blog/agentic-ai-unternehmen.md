---
title: "Agentic AI im Unternehmen: Zwischen Hype und Handlungsdruck"
description: "KI-Agenten sind der lauteste Trend des Jahres - und tatsächlich mehr als Marketing. Was agentische KI für Unternehmen wirklich verändert, welche Prozesse sich zuerst eignen, welche Governance-Fragen neu entstehen und wie Sie Ihre Organisation darauf vorbereiten, ohne dem Hype hinterherzulaufen."
pubDate: 2026-07-07
lang: de
slug: agentic-ai-unternehmen
translationKey: agentic-ai-for-companies
tags: ["ki-agenten", "ki-transformation", "pillar"]
---

> **Kurzantwort:** Agentic AI - Systeme, die selbstständig mehrstufige Aufgaben mit Werkzeugen erledigen - ist 2026 für klar abgegrenzte Prozesse produktionsreif und verändert die Rechnung für Unternehmen tatsächlich: Nicht mehr nur einzelne Tätigkeiten werden schneller, ganze Prozessketten lassen sich neu schneiden. Real bleibt aber auch: Agenten brauchen menschliche Aufsicht, saubere Datenzugänge, ein Eval-Framework und geklärte Verantwortung. Wer diese vier Dinge nicht hat, kauft mit „Agenten" nur ein teureres Wort für Enttäuschung. Die richtige Vorbereitung beginnt deshalb nicht beim Agenten, sondern bei Schnittstellen, Berechtigungen und Kompetenz.

Ich forsche an der HdM Stuttgart unter anderem zur Online-Evaluation agentischer KI-Systeme und habe in Industrieprojekten mehrere Agenten in den produktiven Betrieb begleitet. Dieser Artikel ist der Unternehmens-Blick auf das Thema - die technische Seite steht in [Was ist ein KI-Agent?](/blog/was-ist-ein-ki-agent) und im [Praxis-Leitfaden zum Agenten-Bau](/blog/ki-agenten-bauen-praxis-leitfaden).

Stand: 7. Juli 2026.

## Warum gerade jetzt alle über Agenten reden

Kurz zur Einordnung, denn der Begriff wird gerade auf alles geklebt, was einen Chatbot hat: Ein KI-Agent ist ein System, das ein Ziel bekommt und selbstständig plant, Werkzeuge aufruft, Zwischenergebnisse bewertet und sich korrigiert, bis das Ziel erreicht ist. Der Unterschied zum Chatbot: Ein Chatbot antwortet, ein Agent *erledigt*.

Dass der Hype ausgerechnet jetzt kocht, hat einen echten technischen Kern: Die aktuelle Modellgeneration ist die erste, die über zehn, zwanzig Werkzeugaufrufe hinweg zuverlässig genug bleibt, dass man ihr echte Aufgaben anvertrauen kann. Das war vor zwei Jahren anders - da waren Agenten-Demos beeindruckend und Agenten-Produktion frustrierend. Diese Lücke schließt sich gerade, und zwar schneller, als viele Organisationen sich vorbereiten.

Gleichzeitig gilt: Die Marketing-Erzählung („digitale Mitarbeiter, die alles können") ist der Realität um Jahre voraus. Beides stimmt gleichzeitig. Genau das macht die Lage für Entscheider so unübersichtlich.

## Was sich für Unternehmen tatsächlich ändert

Der Unterschied zwischen Assistenz-KI und agentischer KI ist für Unternehmen größer, als er zunächst klingt.

Mit Assistenz-Werkzeugen (ChatGPT & Co. im Chat-Fenster) wird die *einzelne Person* schneller - die Prozesskette bleibt, wie sie ist. Der Mensch sitzt weiter an jedem Schritt, nur die Schritte werden kürzer.

Mit Agenten verschiebt sich die Einheit der Automatisierung: Nicht mehr die Tätigkeit wird unterstützt, sondern der *Vorgang* wird erledigt. Ein Beispiel aus einem realen Projekt: Eingehende Rechnung prüfen, mit Bestellung abgleichen, Abweichung markieren, vorkontieren - das war vorher eine Kette aus vier Tätigkeiten mit drei Übergaben. Der Agent macht daraus einen Vorgang, und der Mensch sieht nur noch die Fälle, die aus dem Raster fallen.

Daraus folgen drei Konsequenzen, über die man ehrlich reden muss:

1. **Rollen verändern sich von „bearbeiten" zu „prüfen und eskalieren".** Das ist für manche Mitarbeitende eine Aufwertung, für andere ein Verlust an vertrauter Tätigkeit. Führung muss das begleiten - dieselbe Aufgabe wie bei jeder [KI-Transformation](/blog/ki-transformation-unternehmen), nur schärfer.
2. **Prozesswissen wird wichtiger, nicht unwichtiger.** Jemand muss dem Agenten sagen, was ein korrekter Vorgang ist, welche Ausnahmen es gibt und wann eskaliert wird. Die Leute mit zwanzig Jahren Prozesserfahrung sind beim Agenten-Bau Gold wert.
3. **Fehler skalieren mit.** Ein Mensch, der etwas falsch versteht, produziert einen Fehler. Ein Agent, der etwas systematisch falsch versteht, produziert vierhundert - bevor es jemand merkt, wenn das Monitoring fehlt.

## Welche Prozesse sich zuerst eignen

Nach zwei Jahren produktiver Agenten-Projekte ist mein Raster einfach. Gut geeignet sind Vorgänge, die:

- **häufig** sind (sonst lohnt der Aufwand nicht),
- **regelhaft mit Ausnahmen** sind - der Normalfall folgt Mustern, die Ausnahmen gehen an Menschen,
- **digital zugänglich** sind - die nötigen Informationen liegen in Systemen mit Schnittstellen,
- **einen klaren Erfolgsmaßstab** haben - man kann objektiv sagen, ob der Vorgang korrekt erledigt wurde.

Typische erste Kandidaten, die ich in Projekten funktionieren sehe: Eingangsrechnungsprüfung, Service-Ticket-Triage und -Vorbereitung, Stammdatenpflege, Angebots- und Recherchevorbereitung im Vertrieb, Bewerbungs-Vorsortierung (Vorsicht: je nach Ausgestaltung Hochrisiko im Sinne des EU AI Act - hier besonders sorgfältig arbeiten).

Ungeeignet als Einstieg: alles Kundenfinale ohne menschliche Freigabe, alles Rechtsverbindliche, alles, wofür es keinen messbaren Erfolgsbegriff gibt. Nicht, weil es nie gehen wird - sondern weil Sie Vertrauen in Ihre Agenten-Fähigkeiten erst an Fällen aufbauen sollten, deren Fehler Sie sich leisten können.

## Die Governance-Fragen, die neu sind

Bei Assistenz-KI reichte im Wesentlichen eine Nutzungsrichtlinie. Agenten werfen härtere Fragen auf, und ich empfehle, sie *vor* dem ersten produktiven Agenten schriftlich zu beantworten:

- **Was darf der Agent ohne Freigabe tun?** Lesen ist meist unkritisch. Schreiben, Buchen, Versenden brauchen eine explizite Entscheidung - pro Aktion, nicht pauschal. Die drei gängigen Aufsichtsmuster (Freigabe vor Aktion, Stichproben-Review, Konfidenz-Routing) habe ich [im Praxis-Leitfaden](/blog/ki-agenten-bauen-praxis-leitfaden) beschrieben.
- **Wessen Berechtigungen nutzt er?** Ein Agent sollte eigene, minimale Systemzugänge haben - nicht das Konto eines Mitarbeiters mit dessen kompletten Rechten. Das klingt selbstverständlich, wird aber in der Praxis erstaunlich oft abgekürzt.
- **Wer verantwortet seine Fehler?** Organisatorisch muss ein Vorgang, den ein Agent erledigt hat, einen menschlichen Eigentümer haben - so wie ein Vorgang, den ein Praktikant erledigt hat, auch. „Das war die KI" ist keine Antwort, die vor Kunden oder Prüfern trägt.
- **Woran merken wir, dass er schlechter wird?** Modelle werden aktualisiert, Eingangsdaten verschieben sich, Systeme ändern ihre Antworten. Ohne laufende Messung (Erfolgsquote, Eskalationsquote, Stichproben) bemerken Sie Drift erst am Schaden.

Der Audit-Trail ist dabei kein lästiges Extra, sondern ein Geschenk: Ein gut gebauter Agent dokumentiert jeden Schritt lückenlos - besser, als es die manuelle Bearbeitung je getan hat. In regulierten Branchen ist das ein echtes Argument *für* Agenten, wenn man es von Anfang an mitdenkt.

## Wie Sie Ihre Organisation vorbereiten - ohne einen einzigen Agenten zu bauen

Der vielleicht nützlichste Abschnitt dieses Artikels, gerade wenn Sie noch nicht so weit sind. Vier Dinge, die den späteren Agenten-Einsatz vorbereiten und sich alle auch ohne Agenten lohnen:

1. **Schnittstellen herstellen.** Agenten arbeiten über APIs. Jedes Kernsystem, das nur per Bildschirmmaske bedienbar ist, ist eine Wand. Wer heute bei Systemauswahl und Verträgen auf API-Zugänge besteht, baut die Straßen, auf denen später Agenten fahren.
2. **Prozesse explizit machen.** Ein Vorgang, den nur Frau Schneider im Kopf hat, ist nicht agentifizierbar. Die Übung, Prozesse mit Normalfall, Ausnahmen und Erfolgskriterium aufzuschreiben, ist mühsam - und deckt nebenbei regelmäßig Verbesserungen auf, die gar keine KI brauchen.
3. **Kompetenz aufbauen.** Mitarbeitende, die [gelernt haben, mit LLMs zu arbeiten](/blog/ki-schulung-mitarbeiter), verstehen auch, was ein Agent kann und wo man ihm nicht trauen darf. Die Prüf- und Eskalationsrollen von morgen setzen die KI-Grundkompetenz von heute voraus.
4. **Klein anfangen und messen.** Der erste Agent ist ein Lernvehikel. Wählen Sie ihn so, dass er in Wochen statt Quartalen steht, und bauen Sie die Messung von Tag eins mit. Das dabei entstehende Wissen - wie man Aufgaben schneidet, Werkzeuge beschreibt, Qualität misst - überträgt sich auf jeden weiteren Agenten.

## Was ich vom „Digitale-Mitarbeiter"-Framing halte

Eine persönliche Anmerkung zum Schluss. Anbieter verkaufen Agenten gern als „digitale Mitarbeiter" - inklusive Namen, Avatar und Stellenbeschreibung. Ich verstehe den Marketing-Reiz und halte das Framing trotzdem für schädlich, aus zwei Gründen.

Erstens weckt es falsche Erwartungen: Ein Agent ist kein flexibler Generalist, sondern ein sehr fleißiger, sehr schneller Spezialist mit begrenztem Urteilsvermögen. Wer einen „Mitarbeiter" erwartet, ist von der Realität enttäuscht; wer ein präzises Werkzeug erwartet, wird positiv überrascht.

Zweitens vernebelt es die Verantwortungsfrage. Mitarbeiter tragen Verantwortung, Werkzeuge nicht. Sobald ein Agent als Quasi-Person auftritt, beginnt das organisatorische Wegducken („das hat doch der Agent entschieden"). Nüchtern betrachtet ist ein Agent Software mit Befugnissen - und sollte genauso geführt werden: mit klaren Grenzen, laufender Kontrolle und einem Menschen, der den Kopf hinhält.

## Häufige Fragen

**Sind KI-Agenten 2026 reif für den produktiven Einsatz?**
Für klar abgegrenzte, messbare Vorgänge mit menschlicher Aufsicht: ja, nachweislich. Für offene, kreative oder vollautonome Aufgaben: nein. Die Grenze verschiebt sich mit jeder Modellgeneration - aber sie verschiebt sich von „eng geschnitten" zu „etwas weniger eng geschnitten", nicht von „nichts" zu „alles".

**Ersetzen Agenten unsere RPA-Automatisierung?**
Teilweise, mittelfristig. RPA ist starr und billig im Betrieb, Agenten sind flexibel und teurer pro Vorgang. Die Faustregel: Was heute mit RPA stabil läuft, laufen lassen. Was an RPA immer gescheitert ist, weil Eingaben zu variabel sind - genau dort sind Agenten stark.

**Was kostet ein produktiver Agent im Betrieb?**
Die Modellkosten pro Vorgang liegen in meinen Projekten typischerweise zwischen 5 und 30 Cent - fast immer vernachlässigbar gegenüber dem eingesparten Aufwand. Der relevante Kostenblock ist die Entwicklung samt Eval-Framework und die laufende Pflege; kalkulieren Sie Pflege wie bei jeder geschäftskritischen Software.

**Brauchen wir ein Multi-Agenten-System?**
Fast sicher noch nicht. Multi-Agenten-Architekturen sind faszinierend (ich forsche selbst daran), aber für die allermeisten Unternehmensaufgaben ist ein einzelner, gut geschnittener Agent die richtige Stufe. Zu Multi-Agent wechselt man, wenn ein konkretes Problem nachweislich nicht mehr in einen Agenten passt - nicht, weil es auf der Konferenz gut klang.

**Wie passt das zum EU AI Act?**
Agentische Systeme sind im AI Act nicht als eigene Kategorie geregelt; es gelten die Pflichten des jeweiligen Anwendungsfalls. Praktisch heißt das: Transparenz- und Kompetenzpflichten gelten immer, und bei sensiblen Einsatzfeldern (Personal, Kredit, kritische Infrastruktur) greifen die Hochrisiko-Anforderungen - dann gehören Risikomanagement, Dokumentation und menschliche Aufsicht ohnehin zum Pflichtprogramm, das ein seriös gebauter Agent erfüllen kann.

## Weiterlesen

- [Was ist ein KI-Agent? Eine Definition aus der Praxis](/blog/was-ist-ein-ki-agent) - die Grundlagen
- [KI-Agenten bauen: Ein Praxis-Leitfaden](/blog/ki-agenten-bauen-praxis-leitfaden) - die technische Umsetzung
- [KI-Transformation im Unternehmen](/blog/ki-transformation-unternehmen) - das Gesamtbild, in das Agenten gehören
- [KI-Schulung für Mitarbeitende](/blog/ki-schulung-mitarbeiter) - die Kompetenzbasis, ohne die Agenten scheitern
