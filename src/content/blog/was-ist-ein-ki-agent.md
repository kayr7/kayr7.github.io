---
title: "Was ist ein KI-Agent? Eine Definition aus der Praxis"
description: "Eine klare, praxisnahe Definition von KI-Agenten - was sie sind, wie sie sich von Chatbots unterscheiden, wann sie funktionieren und wann nicht. Geschrieben von einem Professor für Angewandte KI."
pubDate: 2026-04-10
lang: de
slug: was-ist-ein-ki-agent
translationKey: what-is-an-ai-agent
tags: ["ki-agenten", "pillar", "grundlagen"]
---

> **Kurzantwort:** Ein KI-Agent ist ein LLM-basiertes System, das eigenständig mehrstufige Aufgaben löst, indem es plant, Werkzeuge aufruft, Ergebnisse liest, sich selbst korrigiert und am Ende ein Resultat liefert. Im Gegensatz zu einem Chatbot, der nur antwortet, *handelt* ein KI-Agent.

Diesen Artikel hat **Prof. Dr. Kay Rottmann** geschrieben, Professor für Angewandte KI an der HdM Stuttgart und ehemaliger Senior Applied Scientist bei Amazon Alexa, Sr. Manager AI für Manufacturing am Bosch Center for AI und Engineering Manager bei Meta. Aktuell forscht er an der HdM zur Online-Evaluation agentischer KI-Systeme.

Stand: 10. April 2026.

## Die kurze Definition

Ein **KI-Agent** ist ein Software-System, das ein Large Language Model (LLM) als „Gehirn" nutzt, um ein vorgegebenes Ziel selbstständig in mehreren Schritten zu erreichen. Dabei kann es:

1. **planen** - eine Aufgabe in Teilschritte zerlegen,
2. **handeln** - externe Werkzeuge (APIs, Datenbanken, andere Software) aufrufen,
3. **beobachten** - die Ergebnisse dieser Werkzeuge lesen und interpretieren,
4. **sich anpassen** - den Plan basierend auf neuen Informationen ändern,
5. **liefern** - am Ende ein Resultat zurückgeben.

Der entscheidende Unterschied zu einem klassischen Chatbot: Ein Chatbot antwortet auf eine Frage und ist dann fertig. Ein Agent **führt eine Aufgabe aus**.

## Ein konkretes Beispiel

Stellen Sie sich vor, Sie sagen einem System: *„Finde heraus, ob wir im letzten Quartal mehr Umsatz mit Kunden aus der Automobilbranche oder aus dem Maschinenbau gemacht haben, und schreibe mir eine kurze Zusammenfassung."*

Ein **Chatbot** würde antworten: „Tut mir leid, ich habe keinen Zugriff auf Ihre Daten."

Ein **KI-Agent** würde:

1. Den Plan formulieren: „Ich brauche Umsatzdaten, gefiltert nach Branche und Quartal."
2. Eine Datenbank-Abfrage gegen das CRM ausführen.
3. Die Antwort lesen: zwei Listen mit Umsätzen.
4. Eine Berechnung anstellen: Summen pro Branche bilden, vergleichen.
5. Eine kurze Zusammenfassung in natürlicher Sprache schreiben.
6. Diese als finales Ergebnis zurückgeben.

Alle fünf Schritte passieren automatisch. Das LLM steuert den Ablauf, ohne dass ein Mensch zwischen den Schritten eingreifen muss.

## KI-Agent vs. Chatbot vs. RPA - der Vergleich

| Merkmal | Chatbot | KI-Agent | Klassische RPA (z. B. UiPath) |
|---|---|---|---|
| **Reagiert auf** | Eine Nachricht | Eine Aufgabe | Einen festen Trigger |
| **Wie viele Schritte?** | Genau 1 | Beliebig viele | Vorab festgelegte Sequenz |
| **Plant selbstständig?** | Nein | Ja | Nein |
| **Kann sich an Unerwartetes anpassen?** | Nein | Ja (begrenzt) | Nein - bricht ab |
| **Verwendet Werkzeuge?** | Selten | Zentraler Baustein | Ja, fest verdrahtet |
| **Sprache als Schnittstelle?** | Ja | Ja | Nein |

Die wichtigste Erkenntnis aus dieser Tabelle: KI-Agenten sind **nicht** einfach „Chatbots mit mehr Funktionen". Sie sind **auch nicht** einfach „RPA mit Sprache". Sie sind eine eigene Klasse von Systemen - ihre Stärke ist die Kombination aus *flexiblem Planen* und *Ausführen unter Unsicherheit*.

## Welche Bestandteile hat ein KI-Agent technisch?

Jeder produktive KI-Agent besteht aus mindestens vier Komponenten:

### 1. Das Modell (das „Gehirn")

Ein LLM wie GPT-5, Claude 4.6, Gemini 2.5 oder ein Open-Source-Modell wie Llama 4 oder Qwen 3. Das Modell ist verantwortlich fürs *Denken*: Aufgabe verstehen, Plan formulieren, Werkzeug auswählen, Ergebnis interpretieren, nächsten Schritt entscheiden.

### 2. Werkzeuge (Tools)

Funktionen, die der Agent aufrufen kann. Beispiele:

- Eine Suche im Web oder in einer internen Wissensdatenbank
- Eine Datenbank-Abfrage
- Ein API-Call gegen ein externes System (CRM, ERP, Helpdesk)
- Code-Ausführung (Python, SQL)
- Versand einer E-Mail oder Erstellung eines Tickets

Werkzeuge sind das, was den Agenten *handlungsfähig* macht. Ohne Werkzeuge ist der Agent nur ein Chatbot mit besseren Manieren.

### 3. Gedächtnis (Memory)

Damit der Agent über mehrere Schritte hinweg konsistent handeln kann, braucht er ein Gedächtnis. Mindestens ein Kurzzeitgedächtnis für den aktuellen Auftrag. Oft auch ein Langzeitgedächtnis (z. B. Vektor-Datenbank), das er über mehrere Aufträge hinweg nutzt.

### 4. Eine Steuerungsschleife (Agent Loop)

Das Programm-Gerüst, das den Ablauf orchestriert: *„Frage das Modell nach dem nächsten Schritt → führe ihn aus → gib das Ergebnis zurück ans Modell → wiederhole, bis fertig."* Frameworks wie LangGraph, CrewAI oder das Anthropic SDK liefern diese Schleife mit. Sie kann aber auch in 100 Zeilen Python selbst gebaut werden.

## Wann lohnt sich ein KI-Agent - und wann nicht?

Aus meiner Beratungspraxis bei [r7net GmbH](/consulting): KI-Agenten lohnen sich, wenn **alle drei** folgenden Bedingungen erfüllt sind:

1. **Die Aufgabe besteht aus mehreren Schritten**, die voneinander abhängen.
2. **Die genaue Sequenz steht vorher nicht fest** - sie hängt von Zwischenergebnissen ab.
3. **Es gibt einen klaren Erfolgs-Indikator**, an dem man messen kann, ob der Agent seinen Job gemacht hat.

KI-Agenten lohnen sich **nicht**, wenn:

- Die Aufgabe deterministisch und einstufig ist → ein normales Skript reicht.
- Es keine klare Definition von Erfolg gibt → Sie können nicht messen, ob der Agent funktioniert (siehe [LLM Evaluation](/consulting/llm-evaluation)).
- Die Konsequenz von Fehlern hoch ist und es keinen menschlichen Fallback gibt → das Risiko übersteigt den Nutzen.

Das letzte Punkt ist besonders wichtig in regulierten Branchen: Vollautonome Agenten ohne Audit-Trail sind in vielen B2B-Kontexten nicht produktionsreif.

## Wie misst man, ob ein KI-Agent gut ist?

Die ehrliche Antwort: Das ist ein offenes Forschungsproblem. Genau dazu forsche ich aktuell mit Studierenden des KMITL Bangkok an der HdM Stuttgart.

Praktisch nutzbar sind heute mindestens vier Dimensionen:

- **Goal achievement** - erreicht der Agent das vorgegebene Ziel überhaupt?
- **Policy adherence** - hält er sich an Regeln, die wir ihm vorgeben (z. B. „frage immer nach, bevor du löschst")?
- **Efficiency** - erreicht er das Ziel mit angemessenem Aufwand (Anzahl Tool-Calls, Token-Verbrauch, Zeit)?
- **Consistency (pass^k)** - verhält er sich bei mehreren Versuchen mit der gleichen Eingabe konsistent? Ein Agent, der bei 10 Versuchen 5x richtig liegt, ist in Produktion ein Risiko.

Ein verlässliches Eval-Framework ist genauso wichtig wie der Agent selbst. Ohne Eval wissen Sie nicht, wann etwas kaputt geht - und mit LLM-basierten Systemen geht regelmäßig etwas kaputt (Modell-Updates, Prompt-Drift, Daten-Veränderungen).

## Wo stehen wir im Jahr 2026?

KI-Agenten sind heute (Stand April 2026) für viele klar abgrenzbare Aufgaben **produktionsreif** - Klassifikation, Recherche, strukturierte Datenpflege, Sales-Qualifikation. Für offene, kreative oder hochautonome Anwendungen sind sie es **noch nicht**. Die Lücke schließt sich, aber langsamer als die Marketing-Kommunikation der Modell-Anbieter suggeriert.

Mein Rat aus 15+ Jahren AI-Engineering bei Meta, Bosch und Amazon: Fangen Sie klein an. Bauen Sie einen Agenten für genau eine, klar messbare Aufgabe. Bauen Sie das Eval-Framework von Anfang an mit. Erweitern Sie erst, wenn Sie belegen können, dass der erste Agent zuverlässig funktioniert.

## Häufige Fragen

**Ist jeder Chatbot mit mehreren Antworten ein KI-Agent?**
Nein. Ein Chatbot, der mehrere Fragen beantwortet, bleibt ein Chatbot. Ein Agent unterscheidet sich dadurch, dass er Werkzeuge nutzt, um *aktiv etwas in der Welt zu tun* - nicht nur Text zurückzugeben.

**Brauche ich ein bestimmtes LLM, um KI-Agenten zu bauen?**
Nein, aber die Qualität variiert deutlich. Stand 2026 sind GPT-5, Claude 4.6 und Gemini 2.5 die zuverlässigsten Modelle für agentisches Verhalten. Für einfachere Aufgaben funktionieren auch Open-Source-Modelle wie Llama 4 oder Qwen 3 - bei deutlich niedrigeren Kosten.

**Was ist der Unterschied zwischen einem KI-Agenten und einem Multi-Agent-System?**
Ein KI-Agent ist ein einzelnes System, das eine Aufgabe löst. Ein Multi-Agent-System orchestriert mehrere spezialisierte Agenten, die zusammen ein größeres Problem lösen. Mein Standardrat: Fangen Sie mit einem einzelnen Agenten an. Erweitern Sie zu Multi-Agent erst, wenn Sie konkret an ein Problem stoßen, das ein einzelner Agent nicht lösen kann.

**Wie viel kostet es, einen KI-Agenten bauen zu lassen?**
Typischerweise im niedrigen bis mittleren fünfstelligen Eurobereich für einen ersten produktiven Agenten inklusive Eval-Framework. Ein reiner Prototyp ist deutlich günstiger. Mehr dazu auf der Seite [KI-Agenten Entwicklung](/consulting/ki-agenten-entwicklung).

**Wie lange dauert die Entwicklung eines produktiven KI-Agenten?**
Vom Use-Case-Workshop bis zum produktiven Agenten typischerweise 6–10 Wochen. Ein erster Prototyp auf echten Daten oft schon nach 2–4 Wochen.

## Weiterlesen

- [KI-Agenten Entwicklung](/consulting/ki-agenten-entwicklung) - wenn Sie konkret einen KI-Agenten bauen lassen wollen
- [LLM Evaluation](/consulting/llm-evaluation) - wie wir messen, ob ein Agent wirklich funktioniert
- [KI Strategie Beratung](/consulting/ki-strategie-beratung) - wenn Sie noch nicht wissen, ob ein Agent für Ihren Use-Case der richtige Ansatz ist
