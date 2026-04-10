---
title: "Prompt Engineering: Die Grundlagen, die wirklich zählen"
description: "Ein kompakter, praxiserprobter Leitfaden zu Prompt Engineering - die Techniken, die in echten Projekten den Unterschied machen, ohne Buzzword-Hype. Von einem Professor für Angewandte KI an der HdM Stuttgart."
pubDate: 2026-04-10
lang: de
slug: prompt-engineering-grundlagen
translationKey: prompt-engineering-fundamentals
tags: ["prompt-engineering", "grundlagen", "pillar"]
---

> **Kurzantwort:** Gutes Prompt Engineering besteht 2026 aus sechs Bausteinen: klare Rolle, präziser Auftrag, Kontext im richtigen Umfang, Beispiele wo nötig, strukturierte Ausgabe und ein Feedback-Loop, der den Prompt gegen ein Test-Set absichert. Alles andere - „Prompt-Tricks", lange Buzzword-Listen, „magische Phrasen" - ist meist Folklore. Was funktioniert, ist Disziplin.

Diesen Artikel hat **Prof. Dr. Kay Rottmann** geschrieben, Professor für Angewandte KI an der HdM Stuttgart. Er lehrt dort unter anderem die Vorlesungen „Einführung in Prompt Engineering" und „Generative AI Practice". Vorher war er Senior Applied Scientist bei Amazon Alexa, Sr. Manager AI für Manufacturing am Bosch Center for AI und Engineering Manager bei Meta.

Stand: 10. April 2026.

## Was Prompt Engineering eigentlich ist

Prompt Engineering ist die Disziplin, einem Sprachmodell so zu erklären, was es tun soll, dass es zuverlässig richtige Antworten liefert. Das klingt banal, ist es aber nicht - denn LLMs sind extrem empfindlich für die genaue Formulierung der Anweisung.

Was Prompt Engineering **nicht** ist: ein Sammelsurium an magischen Sätzen, die man vorne anhängt („Du bist ein Experte mit 30 Jahren Erfahrung..."). Solche Phrasen helfen marginal, manchmal gar nicht. Was wirklich hilft, ist eine **klare Struktur** und eine **systematische Iteration**.

Wer dauerhaft mit LLMs arbeitet, lernt schnell: Ein guter Prompt ist Code. Er wird versioniert, getestet, dokumentiert und gegen ein Eval-Set abgesichert. Wenn Sie Ihre Prompts heute noch in einem Google Doc pflegen, dann ist das die erste Sache, die sich ändern muss.

## Die sechs Bausteine, die wirklich zählen

### 1. Klare Rolle

Geben Sie dem Modell eine eindeutige Rolle - nicht als Marketing-Spielerei, sondern um den Tonfall, den Detailgrad und den Modus festzulegen. Beispiel:

> *„Du bist ein technischer Fachredakteur, der für Software-Entwickler schreibt. Du erklärst präzise, knapp und ohne Marketing-Sprache."*

Was Sie **nicht** brauchen: lange Charakterbeschreibungen mit Lebenslauf und Persönlichkeitsmerkmalen. Drei Sätze reichen. Das Modell weiß, was ein „Fachredakteur" tut.

### 2. Präziser Auftrag

Der Auftrag ist die wichtigste Zeile im Prompt. Er sollte:

- **Konkret** sein - sagen, *was* das Ergebnis sein soll, nicht nur *worüber* es gehen soll.
- **Eingrenzbar** sein - eine Aufgabe, nicht fünf gleichzeitig.
- **Im Verb stehen** - „Schreibe", „Klassifiziere", „Extrahiere", „Vergleiche", „Übersetze".

Schwacher Auftrag: *„Hilf mir mit dem Text."*
Starker Auftrag: *„Kürze den folgenden Text auf maximal 200 Wörter, ohne Fakten zu verlieren, und behalte den sachlichen Ton bei."*

### 3. Kontext im richtigen Umfang

Das Modell weiß nichts über Ihren Kontext, außer was Sie ihm geben. Aber: **Mehr Kontext ist nicht automatisch besser.** Lange Kontexte führen oft zu schlechteren Antworten - das Modell verliert sich in den Details, übersieht wichtige Stellen, oder vermischt Information aus verschiedenen Teilen.

Faustregel: Geben Sie nur den Kontext, den ein Mensch bräuchte, um die Aufgabe zu lösen. Nicht weniger, aber auch nicht mehr. Wenn Sie Dokumente reinkopieren, fragen Sie sich: *Welche zwei Absätze sind wirklich relevant?* Diese zwei Absätze sind oft alles, was Sie brauchen.

Bei langen Kontexten hilft Struktur. Verwenden Sie Abschnittsüberschriften, Trennlinien oder XML-Tags wie `<dokument>...</dokument>`, damit das Modell weiß, wo welcher Inhalt anfängt.

### 4. Beispiele - aber nur wenn nötig

Few-Shot-Prompting (also: dem Modell zwei bis fünf Beispiele zeigen, wie die Lösung aussehen soll) ist eine der zuverlässigsten Techniken überhaupt. Sie hilft besonders dann, wenn:

- Die gewünschte Ausgabe ein bestimmtes Format hat (z. B. JSON, eine Tabelle, ein bestimmter Ton).
- Die Aufgabe Edge Cases enthält, die in der Beschreibung schwer zu erklären sind.
- Sie ein bestimmtes Verhalten auf neuartige Eingaben übertragen wollen.

**Nicht nötig**, wenn die Aufgabe einfach ist und das Modell sie auch ohne Beispiele zuverlässig löst. Beispiele kosten Tokens und Latenz - verwenden Sie sie gezielt, nicht reflexartig.

Wichtig bei Beispielen: Sie müssen *repräsentativ* sein. Drei sehr ähnliche Beispiele sind schlechter als drei unterschiedliche, die das Spektrum abdecken.

### 5. Strukturierte Ausgabe

Wenn Sie das Ergebnis weiterverarbeiten wollen - und das wollen Sie meistens - verlangen Sie ein strukturiertes Format. JSON funktioniert mit allen modernen Modellen sehr zuverlässig, vor allem wenn Sie das Schema im Prompt vorgeben.

Noch besser: Nutzen Sie die **„Structured Output"-Funktion** Ihres Modell-Anbieters (OpenAI, Anthropic und Google bieten das alle), die garantiert valides JSON gegen ein gegebenes JSON Schema liefert. Das spart Ihnen den ganzen Frust mit „das Modell hat ein Komma vergessen".

Bei freiem Text hilft es, das Ausgabeformat explizit vorzugeben:

> *„Antworte in genau diesem Format:*
> *## Zusammenfassung*
> *Ein Satz.*
> *## Hauptpunkte*
> *Drei Bullet Points."*

### 6. Feedback-Loop und Eval-Set

Der wichtigste Punkt von allen - und der, den 80 Prozent der Teams überspringen: **Bauen Sie ein Mini-Eval-Set für Ihren Prompt**, bevor Sie ihn produktiv einsetzen.

Konkret: 10 bis 30 echte Eingaben, für die Sie wissen, wie eine richtige Antwort aussieht. Lassen Sie Ihren Prompt auf diesen Eingaben laufen. Notieren Sie für jede Antwort: richtig, falsch, oder grenzwertig. Erst wenn der Prompt auf diesen 30 Fällen zuverlässig funktioniert, geht er in den Einsatz.

Warum das so wichtig ist: Ohne Eval glauben Sie, der Prompt funktioniert - und merken erst beim Kunden, dass er es nicht tut. Mit Eval haben Sie eine messbare Zahl, gegen die Sie Verbesserungen prüfen können. Mehr dazu auf der Seite [LLM Evaluation für Produktivsysteme](/consulting/llm-evaluation).

## Techniken, die in der Praxis den Unterschied machen

Über die sechs Grundbausteine hinaus gibt es eine handvoll Techniken, die in echten Projekten wirklich helfen:

### Chain of Thought - aber sparsam

Die Idee: Sagen Sie dem Modell, es soll *zuerst nachdenken, dann antworten*. Das verbessert die Ergebnisse bei komplexeren Aufgaben spürbar - vor allem bei Mathematik, mehrstufiger Logik und Planungsaufgaben.

Bei modernen Modellen wie Claude 4.6 und GPT-5 ist Chain of Thought für viele Aufgaben bereits eingebaut („Reasoning Mode"). Sie müssen es nicht mehr explizit anstoßen. Bei einfachen Klassifikationsaufgaben kann es sogar schaden, weil es Latenz und Tokens kostet, ohne Mehrwert zu liefern.

### Negative Anweisungen vorsichtig nutzen

„Schreibe nicht über X" funktioniert oft schlechter als „Schreibe über Y". Modelle reagieren stärker auf positive Anweisungen. Wenn Sie etwas vermeiden wollen, formulieren Sie es um: nicht *„keine Marketing-Sprache"*, sondern *„sachlich, technisch, knapp"*.

### Persona im Output, nicht im Prompt

Wenn Sie eine bestimmte Schreibperspektive haben wollen (z. B. „aus Sicht eines Vertrieblers"), schreiben Sie diese Anweisung nicht nur als Rolle ans Modell, sondern verlangen Sie sie auch im Output-Schema: *„Beginne mit der Perspektive: 'Aus Sicht des Vertriebs würde ich sagen...'."* Das verankert das Modell stärker.

### Schwierige Aufgaben in Schritte zerlegen

Wenn ein Prompt regelmäßig versagt, ist die Lösung selten ein „besserer Prompt". Sie ist meistens, die Aufgabe in **zwei oder drei kleinere Prompts** zu zerlegen. Beispiel: Statt „Fasse den Text zusammen UND extrahiere die wichtigsten Entitäten" zwei separate Calls - einer für die Zusammenfassung, einer für die Extraktion. Das ist nicht nur zuverlässiger, sondern oft auch billiger.

### XML-Tags zur Strukturierung

Insbesondere bei Claude-Modellen funktionieren XML-Tags hervorragend, um Inhalte voneinander abzugrenzen:

```
<aufgabe>
Extrahiere alle Personen und ihre Rollen aus dem folgenden Text.
</aufgabe>

<text>
{hier_kommt_der_text}
</text>

<format>
JSON mit den Feldern "name" und "rolle".
</format>
```

Das hilft dem Modell, die Anweisung von den Daten zu trennen - und reduziert Verwirrungen massiv.

## Was nicht funktioniert (oder was nur Folklore ist)

Über die letzten drei Jahre habe ich viele Prompt-Tipps gesehen, die sich in der Praxis nicht halten. Eine kurze Liste:

- **„Du bist ein Experte mit 30 Jahren Erfahrung..."** - bringt selten messbar etwas. Eine klare Rollenbeschreibung reicht.
- **„Wenn du das nicht weißt, sag es ehrlich"** - hilft wenig. Modelle halluzinieren trotzdem. Was hilft: explizit nach Quellen verlangen und die Antwort gegen externe Informationen prüfen.
- **„Atme tief durch und gehe Schritt für Schritt vor."** - dieser Satz ging viral, weil er in einem Paper Verbesserungen zeigte. Bei modernen Modellen ist der Effekt minimal.
- **Trinkgeldversprechen** („Wenn du das gut machst, gebe ich dir 200 Dollar Trinkgeld") - frühe Modelle reagierten darauf, moderne nicht mehr.
- **Drohungen oder Druck** - funktionieren nicht und sind unethisch im Umgang mit Werkzeugen, die Menschen darstellen sollen.

Die ehrliche Wahrheit: Die Wirkung der meisten „Prompt-Hacks" ist um Größenordnungen kleiner als die Wirkung von **Struktur** und **Iteration mit Eval**.

## Wie man Prompt Engineering im Team einführt

Wenn Sie mehr als eine Person haben, die Prompts schreibt, brauchen Sie ein paar einfache Regeln:

1. **Prompts gehören in Git.** Nicht in Notion, nicht in Slack, nicht in Google Docs. Versionierte Datei mit Schema-Definition und Tests dazu.
2. **Jeder Prompt hat ein Eval-Set.** Auch wenn es nur 10 Beispiele sind. Ohne Eval kein Merge.
3. **Eine Person ist verantwortlich** - nicht das ganze Team. Jeder darf vorschlagen, eine Person merged.
4. **Prompts werden dokumentiert** - nicht Geschichten erzählt, sondern: Was tut dieser Prompt, mit welcher Annahme, gegen welches Eval-Set?

Das klingt nach viel. Es ist aber genau das, was den Unterschied zwischen „wir spielen mit ChatGPT" und „wir betreiben LLMs in Produktion" ausmacht. Mehr dazu in der [ChatGPT Schulung](/consulting/chatgpt-schulung), die ich unter anderem für Teams anbiete, die genau diesen Sprung machen wollen.

## Häufige Fragen

**Ist Prompt Engineering nicht in zwei Jahren überflüssig, wenn die Modelle besser werden?**
Diese Frage höre ich seit 2023. Die Antwort hat sich nicht geändert: Modelle werden besser, *die Aufgaben aber auch*. Wir verlangen heute Dinge von Modellen, die vor zwei Jahren undenkbar waren. Solange Sie das Maximum aus einem Modell holen wollen, brauchen Sie Prompt Engineering. Die *Techniken* werden sich ändern, die *Disziplin* nicht.

**Sind Prompts modellspezifisch?**
Teilweise. Die Grundprinzipien gelten für alle Modelle. Im Detail unterscheiden sich Claude (mag XML-Tags), GPT (mag strukturierte Sektionen) und Gemini (etwas formfreier) durchaus. Wenn Sie einen Prompt von einem Modell auf ein anderes übertragen, müssen Sie ihn neu testen - das ist exakt der Grund, warum Sie ein Eval-Set brauchen.

**Wie viele Beispiele sind sinnvoll bei Few-Shot?**
Faustregel: 2 bis 5. Mehr bringt selten messbar etwas, kostet aber Tokens. Wichtig ist die **Vielfalt** der Beispiele, nicht die Anzahl.

**Funktioniert Prompt Engineering auf Deutsch genauso gut wie auf Englisch?**
Bei modernen Modellen (Claude 4.6, GPT-5, Gemini 2.5) praktisch ja - die Qualitätsunterschiede sind vernachlässigbar. Bei kleineren oder älteren Modellen liefert Englisch oft etwas bessere Ergebnisse. Wenn Sie auf Deutsch arbeiten, formulieren Sie den Prompt auf Deutsch - eine Mischung aus Englisch und Deutsch im selben Prompt verwirrt eher.

**Welche Bücher oder Kurse zu Prompt Engineering kann man empfehlen?**
Ehrlich: Bücher veralten in diesem Feld in drei bis sechs Monaten. Zuverlässiger sind die **offiziellen Prompting-Guides** von Anthropic und OpenAI - die werden regelmäßig aktualisiert und sind ehrlich darüber, was funktioniert und was nicht. Praktisches Üben an echten Aufgaben schlägt jedes Buch.

## Weiterlesen

- [Was ist ein KI-Agent?](/blog/was-ist-ein-ki-agent) - wenn Sie wissen wollen, wie aus guten Prompts handelnde Systeme werden
- [KI-Agenten bauen: Praxis-Leitfaden](/blog/ki-agenten-bauen-praxis-leitfaden) - die nächste Stufe nach guten Prompts
- [LLM Evaluation für Produktivsysteme](/consulting/llm-evaluation) - wie Sie messen, ob Ihre Prompts wirklich funktionieren
- [ChatGPT Schulung für Unternehmen](/consulting/chatgpt-schulung) - strukturierte Prompt-Engineering-Schulung für ganze Teams
