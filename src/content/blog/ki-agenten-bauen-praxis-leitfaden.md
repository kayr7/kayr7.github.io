---
title: "KI-Agenten bauen: Ein Praxis-Leitfaden für 2026"
description: "Ein konkreter, technischer Leitfaden, wie man einen produktionstauglichen KI-Agenten baut - von der Use-Case-Auswahl über den ersten Prototyp bis zum Eval-Framework. Mit Code-Beispielen und Entscheidungshilfen aus echten Projekten."
pubDate: 2026-04-10
lang: de
slug: ki-agenten-bauen-praxis-leitfaden
translationKey: building-ai-agents-practical-guide
tags: ["ki-agenten", "praxis", "pillar"]
---

> **Kurzantwort:** Einen produktionstauglichen KI-Agenten bauen Sie 2026 in dieser Reihenfolge: (1) klar abgegrenzten Use-Case wählen, (2) Werkzeuge und Datenquellen identifizieren, (3) Eval-Set vor dem Code aufbauen, (4) minimalen Agent-Loop in 100 Zeilen schreiben, (5) iterativ verbessern, bis das Eval grün wird, (6) menschliches Reviewing einbauen, (7) ausrollen. Wer Schritte überspringt - vor allem das Eval - baut keinen Agenten, sondern eine Demo.

Diesen Leitfaden hat **Prof. Dr. Kay Rottmann** geschrieben, Professor für Angewandte KI an der HdM Stuttgart und ehemaliger Senior Applied Scientist bei Amazon Alexa, Sr. Manager AI für Manufacturing am Bosch Center for AI und Engineering Manager bei Meta. Der Artikel ist die praktische Fortsetzung von [Was ist ein KI-Agent?](/blog/was-ist-ein-ki-agent).

Stand: 10. April 2026.

## Wer ist die Zielgruppe dieses Artikels?

Dieser Artikel richtet sich an **Software-Engineers, technische Product Owner und CTOs**, die ihren ersten produktiven KI-Agenten bauen wollen - nicht nur ein Notebook-Demo. Sie können Python lesen, kennen REST APIs und wissen, was ein Test-Set ist. Theoretische Grundlagen finden Sie im Definitions-Artikel oben.

Wenn Sie kein technisches Profil haben und nur wissen wollen, ob ein Agent für Ihr Problem Sinn ergibt, lesen Sie besser [KI für den Mittelstand](/blog/ki-fuer-den-mittelstand).

## Schritt 1: Den Use-Case scharf schneiden

Der häufigste Fehler beim Agenten-Bau ist nicht ein technischer, sondern einer der Aufgabenstellung: Der Use-Case ist zu groß. „Bau mir einen Agenten, der den Vertrieb automatisiert" ist kein Use-Case, das ist ein Wunsch.

Ein guter Agenten-Use-Case erfüllt vier Kriterien:

1. **Eingrenzbarer Input** - *eine* Art von Anfrage, *eine* Art von Eingangsdokument.
2. **Eingrenzbarer Output** - eine klare Antwort, ein klarer Bericht, eine klare Aktion.
3. **2 bis 8 Werkzeuge maximal**, die der Agent benutzen kann. Mehr verträgt das Modell heute selten zuverlässig.
4. **Messbarer Erfolg** - mindestens eine Metrik, an der Sie sehen, ob der Agent funktioniert.

Beispiel aus einem realen Projekt: *„Lies eingehende Service-Tickets, prüfe sie gegen die Kundendatenbank und die Wissensdatenbank, schlage eine Antwort und einen Lösungspfad vor, eskaliere unklare Fälle an einen Menschen."* Klar abgrenzbar, vier Werkzeuge, messbar an Lösungs-Quote und Eskalations-Quote.

## Schritt 2: Werkzeuge und Datenquellen kartieren

Bevor Sie eine Zeile Code schreiben, brauchen Sie eine Liste der Werkzeuge, die der Agent aufrufen können soll. Für jedes Werkzeug:

- **Name und Beschreibung** in zwei bis drei Sätzen - der Agent wird genau diese Beschreibung lesen, um zu entscheiden, wann er das Werkzeug benutzt.
- **Eingabe-Schema** als JSON Schema. Hier nicht sparen - gute Schemas sind die wichtigste Verhaltensgrenze des Agenten.
- **Ausgabe-Format** - was bekommt der Agent zurück? Wie groß ist es maximal?
- **Latenz und Kosten pro Aufruf**.
- **Fehlermodus** - was passiert, wenn das Tool ausfällt? Liefert es einen Fehlertext, den der Agent verstehen kann?

In meinen Projekten füllen wir vor dem ersten Code immer eine kleine Tabelle mit genau diesen Spalten aus. Klingt banal, spart aber Tage Debugging.

## Schritt 3: Das Eval-Set ZUERST bauen

Hier scheitert die Mehrheit aller Agenten-Projekte: Das Eval-Set wird am Ende gebaut, „wenn Zeit ist". Sie wissen, was passiert: Die Zeit kommt nie. Der Agent geht ohne Eval in Produktion. Drei Monate später merkt jemand, dass die Antwortqualität bei einem Modell-Update um 20 Prozent gesunken ist - und niemand kann sagen, wann das passiert ist.

Bauen Sie Ihr Eval-Set **bevor** Sie den Agenten bauen. Anforderungen:

- **Mindestens 30 Test-Fälle für den ersten Sprint**, 100+ vor dem produktiven Roll-out.
- **Echte Daten**, keine synthetischen - synthetische Test-Fälle decken die echten Failure Modes nicht ab.
- **Drei Kategorien**: einfache Fälle (sollten klappen), schwierige Fälle (sollten klappen, scheitern aber oft), und Kantenfälle (Eingaben, die der Agent ablehnen oder eskalieren sollte).
- **Eindeutige Erfolgs-Kriterien** pro Fall - entweder eine erwartete strukturierte Antwort, oder eine Liste von Eigenschaften, die die Antwort erfüllen muss.

Für Agenten brauchen Sie zusätzlich **Trajectory-Eval**: Welche Werkzeuge wurden in welcher Reihenfolge aufgerufen? Wurden Policies eingehalten? Wie viele Schritte hat der Agent gebraucht?

Mehr zu Eval-Methoden für Agenten auf der Seite [LLM Evaluation für Produktivsysteme](/consulting/llm-evaluation).

## Schritt 4: Den minimalen Agent-Loop schreiben

Sie brauchen kein Framework, um einen Agenten zu bauen. Ein vollständiger Agent-Loop passt in unter 100 Zeilen Python. Das hier ist der Kern:

```python
def agent_loop(task: str, tools: dict, max_steps: int = 10):
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": task},
    ]

    for step in range(max_steps):
        response = llm.chat(messages, tools=list(tools.values()))

        if response.tool_calls:
            for call in response.tool_calls:
                result = tools[call.name].execute(call.arguments)
                messages.append({"role": "tool", "name": call.name, "content": result})
            continue

        return response.content

    raise RuntimeError(f"Agent did not finish within {max_steps} steps")
```

Das ist im Kern alles. Frameworks wie LangGraph, CrewAI oder das Anthropic Agent SDK fügen nützliche Bausteine hinzu - Trace-Logging, Retries, parallele Tool-Calls, Sub-Agenten, Streaming. Aber sie ersetzen nicht das Verständnis dafür, was der Loop tut.

**Mein Rat**: Bauen Sie den ersten Agenten ohne Framework. Sie verstehen dann, an welchen Stellen Sie ein Framework wirklich brauchen - und an welchen es nur Komplexität ohne Nutzen schafft.

## Schritt 5: Den System-Prompt schreiben - sorgfältig

Der System-Prompt ist die wichtigste Konfigurationsdatei Ihres Agenten. Er sollte mindestens enthalten:

1. **Wer der Agent ist** und für wen er arbeitet - eine kurze Rollenbeschreibung.
2. **Was sein Ziel ist** - ein Satz, der die Aufgabe glasklar formuliert.
3. **Welche Werkzeuge zur Verfügung stehen** und wann sie zu benutzen sind. Achtung: Auch wenn das Modell die Tool-Beschreibungen kennt, hilft eine kurze Anleitung im System-Prompt enorm.
4. **Die Policies** - was darf er, was darf er nicht. Beispiel: *„Schreibe nie eine Antwort an den Kunden, ohne sie vorher einem Menschen zur Freigabe vorzulegen."*
5. **Wie er Unsicherheit kommuniziert** - explizite Anweisung, dass er bei Unsicherheit eskalieren oder nachfragen soll.
6. **Wie er „fertig" signalisiert** - etwa durch ein bestimmtes Format der finalen Antwort.

Der System-Prompt ist kein Marketing-Text. Schreiben Sie ihn präzise, prüfen Sie jede Zeile gegen Ihr Eval-Set, und versionieren Sie ihn wie Code.

## Schritt 6: Iterieren, bis das Eval grün wird

Jetzt beginnt die eigentliche Arbeit. Der typische Loop sieht so aus:

1. Eval-Set durchlaufen.
2. Fehlschläge nach Failure-Mode kategorisieren - *wo* genau ist es schiefgegangen?
3. Die häufigste Fehlerklasse fixen. Optionen sind, in dieser Reihenfolge: Tool-Beschreibung präzisieren, System-Prompt schärfen, Tool-Output strukturieren, Tool-Schnitt anders zeichnen, Modell wechseln.
4. Eval erneut laufen lassen. Hat der Fix neue Fehler erzeugt? (Das passiert oft. Deshalb braucht man Eval.)
5. Wiederholen.

Wichtig: **Versuchen Sie nicht, alles auf einmal zu fixen.** Eine Änderung pro Iteration. Sonst wissen Sie am Ende nicht, was geholfen hat.

## Schritt 7: Menschliches Reviewing einbauen

Kein Agent geht 2026 ohne Mensch im Loop in Produktion. Frage ist nur: an welcher Stelle?

Drei gängige Muster:

- **Pre-Action Approval**: Der Agent schlägt eine Aktion vor, ein Mensch klickt auf „freigeben". Geeignet für seltene, hochkritische Aktionen (Versand, Buchung, Vertrag).
- **Sampling Review**: Der Agent handelt selbstständig, aber 10 bis 20 Prozent aller Vorgänge gehen automatisch zur Nachprüfung an einen Menschen. Geeignet für hochfrequente Routinearbeit.
- **Confidence Routing**: Der Agent gibt eine Selbsteinschätzung ab, und nur Vorgänge unter einem Schwellenwert gehen an einen Menschen. Geeignet, wenn die Selbsteinschätzung kalibriert werden kann - was selten der Fall ist. Vorsicht.

Bauen Sie das Review-System gleichzeitig mit dem Agenten, nicht danach. Sonst sammelt sich im ersten Monat ein Berg an unreviewerten Vorgängen, den niemand mehr aufarbeiten kann.

## Schritt 8: Beobachten, beobachten, beobachten

Ein Agent in Produktion braucht **mindestens** drei Monitoring-Layer:

1. **Trace-Logging** - jeder Agent-Run wird vollständig geloggt: Input, Tool-Aufrufe, Tool-Antworten, finale Ausgabe, Latenz, Kosten. Tools wie Langfuse oder Phoenix machen das einfach.
2. **Online-Metriken** - Erfolgs-Quote, Eskalations-Quote, durchschnittliche Anzahl an Tool-Aufrufen, durchschnittliche Token-Kosten pro Vorgang. Diese Metriken laufen live auf einem Dashboard.
3. **Drift-Detection** - wöchentlicher Vergleich der Online-Metriken gegen die Vorwoche. Jede signifikante Verschlechterung wird untersucht - meist ist es ein Modell-Update oder eine Veränderung in den Eingangsdaten.

Wer kein Monitoring hat, weiß nicht, wann etwas kaputtgeht - und mit LLM-basierten Systemen geht regelmäßig etwas kaputt.

## Häufige Fehler - und wie man sie vermeidet

Aus über zwei Jahren produktivem Agenten-Bau die fünf häufigsten Stolperfallen:

**1. Zu viele Werkzeuge.** Mehr als acht Tools macht das Modell unzuverlässig. Wenn Sie mehr brauchen, gruppieren Sie sie hierarchisch in Sub-Agenten.

**2. Vage Tool-Beschreibungen.** „Holt Kundendaten" ist keine Beschreibung. „Gibt Stammdaten und letzte 10 Bestellungen für eine gegebene Kundennummer zurück, oder einen 404-Fehler, wenn der Kunde nicht existiert" ist eine Beschreibung.

**3. Endlose Schleifen.** Setzen Sie immer ein `max_steps`. Setzen Sie es niedrig - meist reichen 10. Wenn Ihr Agent regelmäßig 30 Schritte braucht, ist der Use-Case wahrscheinlich falsch geschnitten.

**4. Halluzinierte Tool-Aufrufe.** Manchmal halluziniert das Modell ein Tool, das es nicht gibt. Ihre Implementierung muss diesen Fall sauber abfangen und zurück an den Agenten kommunizieren („Tool X existiert nicht, verfügbar sind: A, B, C").

**5. Vergessenes Eval nach Modell-Update.** Wenn Sie auf ein neues Modell migrieren - auch nur auf eine kleinere Version - muss das vollständige Eval erneut laufen. Jedes Mal. Ohne Ausnahme.

## Wann lohnt sich ein Framework?

Frameworks wie LangGraph, CrewAI, Anthropic Agent SDK oder OpenAI Agents SDK lohnen sich, sobald **mindestens eine** dieser Bedingungen zutrifft:

- Sie brauchen Sub-Agenten oder Multi-Agent-Orchestrierung.
- Sie brauchen Streaming-UIs mit Live-Updates während des Agent-Runs.
- Sie brauchen integriertes Tracing/Observability ohne eigene Implementierung.
- Sie brauchen fortgeschrittene Retry- und Fallback-Logik.
- Mehr als zwei Personen arbeiten am Agenten und brauchen einen gemeinsamen Standard.

Für den ersten produktiven Agenten in einem mittelständischen Unternehmen ist die Antwort fast immer: **Sie brauchen kein Framework**. Erst beim zweiten oder dritten Agenten wird es interessant.

## Häufige Fragen

**Welches Modell ist das beste für Agenten 2026?**
Stand April 2026 sind Claude 4.6 (Opus und Sonnet), GPT-5 und Gemini 2.5 Pro die zuverlässigsten Modelle für agentisches Verhalten - also für Tool-Nutzung, Plan-Anpassung und konsistentes Verhalten über mehrere Schritte. Für einfachere Agenten reichen oft auch kleinere Modelle wie Claude Haiku 4.5 oder GPT-5 Mini.

**Wie viele Tool-Aufrufe pro Agent-Run sind normal?**
Für einen gut geschnittenen Use-Case typischerweise 3 bis 8. Wenn der Agent regelmäßig 15+ Aufrufe macht, ist meist der Use-Case zu breit oder die Tools sind zu kleinteilig.

**Wie verhindere ich, dass der Agent zu teuer wird?**
Drei Hebel: (1) Cache wiederkehrende Tool-Aufrufe, (2) limitiere Kontextlänge durch Zusammenfassung früherer Schritte, (3) wechsle für einfache Sub-Aufgaben auf günstigere Modelle. In meinen Projekten landen wir typischerweise bei 5 bis 30 Cent pro Agent-Run im produktiven Betrieb.

**Wie gehe ich mit Datenschutz um?**
Wenn personenbezogene Daten im Spiel sind: Wählen Sie ein Modell mit europäischer Daten-Residency (Azure OpenAI EU, Mistral, Aleph Alpha, oder selbst gehostetes Open-Source-Modell). Pseudonymisieren Sie Daten, bevor sie das Modell sehen, soweit es der Use-Case zulässt. Loggen Sie nichts, was Sie nicht logen dürften.

**Kann ich einen Agenten ohne Programmierkenntnisse bauen?**
Mit Tools wie n8n, Make oder Zapier können Sie einfache Agent-ähnliche Workflows ohne Code zusammenklicken. Für echte agentische Systeme - die selbstständig planen und sich anpassen - brauchen Sie heute noch Code. Das wird sich in den nächsten 12 bis 24 Monaten ändern.

## Weiterlesen

- [Was ist ein KI-Agent?](/blog/was-ist-ein-ki-agent) - die Definitions-Grundlage
- [KI für den Mittelstand](/blog/ki-fuer-den-mittelstand) - wenn Sie nicht sicher sind, ob ein Agent für Ihren Anwendungsfall der richtige Ansatz ist
- [KI-Agenten Entwicklung](/consulting/ki-agenten-entwicklung) - wenn Sie einen Agenten bauen lassen wollen
- [LLM Evaluation](/consulting/llm-evaluation) - wie Sie messen, ob Ihr Agent wirklich funktioniert
