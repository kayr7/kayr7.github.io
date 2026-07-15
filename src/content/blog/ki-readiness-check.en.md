---
title: "Is your company ready for AI? An honest readiness check"
description: "Five dimensions that decide whether AI initiatives succeed in your company: data, processes, people, IT, and ground rules. With concrete self-assessment questions and a clear recommendation on where to start depending on your result."
pubDate: 2026-06-16
lang: en
slug: ai-readiness-check
translationKey: ai-readiness-check
tags: ["ai-transformation", "ai-strategy", "pillar"]
---

> **Short answer:** AI readiness has little to do with technology. The five dimensions that matter: (1) *Data* - can you actually get at your own texts and documents? (2) *Processes* - do you know where time is lost? (3) *People* - is there curiosity and some first-hand experience? (4) *IT* - is there a compliant way to access good models? (5) *Ground rules* - is it clear what's allowed? The good news: none of these needs to be perfect before you start. You just need to know where you stand - otherwise you'll pick the wrong first step.

I'm a Professor of Applied AI at HdM Stuttgart and spent the 15 years before that building AI systems at Meta, Bosch, and Amazon. I originally put this self-check together for workshops, because the first question from executives is almost always the same: "Are we even ready for this?"

Last updated: June 16, 2026.

## Why "readiness" can be the wrong worry

One observation up front that frames the rest of this article: the companies that ask me whether they're ready for AI usually are more ready than the ones that don't ask. The question itself is a good sign.

The assessment is still worth doing - but not as an exam with a passing grade. Its result determines *where* you should start. A company with a curious workforce and chaotic data needs a different entry point than one with tidy data and skeptical employees. Ignore that and start with the standard recipe, and you burn time and - worse - trust.

## Dimension 1: Data

The question is not "do we have big data?" (you don't, and almost nobody needs it). The question is more banal and harder: **can you get at your own information?**

Check questions:

- Do your important documents - quotes, contracts, tickets, meeting notes, emails - live in places you can extract them from programmatically? Or are they spread across network drives, inboxes, and one colleague's hard disk?
- If you needed every complaint from the last two years tomorrow: would that take an hour, a day, or a project?
- Do your core systems (ERP, CRM, ticketing) have APIs, and does anyone know how to use them?

What I've learned from projects: perfect data doesn't exist anywhere - not even at the corporations I worked for. One accessible pool of data is enough for a first use case. But if even that one pool is a six-month project, then *that* is your real first AI project - and it has nothing to do with AI yet.

## Dimension 2: Processes

LLMs create value in processes that are text-heavy, recurring, and time-consuming. To find those, you first have to *know* your processes - as they actually run, not as they're written in the quality manual.

Check questions:

- Can you name, off the top of your head, the three activities your teams spend the most time on? (If you'd have to guess: ask the teams. The answers almost always surprise.)
- Do you know where in your workflows people wait for documents, retype text, or copy information from A to B?
- Is there one process everyone internally complains about regularly?

That last point is meant seriously. The best place for a first AI use case is often the process with the highest annoyance factor - because the motivation to get on board is already there.

## Dimension 3: People

The most important dimension, and the one that never appears in software vendors' readiness checklists (for the obvious reason: you can't buy it).

Check questions:

- How many of your employees already use ChatGPT or similar - privately, or quietly at work? If you don't know: it's more than you think.
- Are there individuals in the business units who light up around the topic? Those are your future champions, and they're worth more than any consulting budget.
- What's the baseline mood: curiosity, indifference, or fear?

Fear, by the way, is not a disqualifier - it's a work order. Worries about jobs and blame culture don't disappear through ignoring them, but through honest communication and [training that builds confidence](/en/blog/ai-training-for-employees). The real warning sign is indifference: where nobody asks questions, nobody is planning to change how they work either.

## Dimension 4: IT and tools

This one comes down to a single core question: **is there an official, compliant way to work with good models?**

Check questions:

- Do your employees have access to an enterprise offering (ChatGPT Enterprise, Microsoft Copilot, Claude for Work, or similar) - or only to prohibitions?
- Is it clear which categories of data may go into which tool? Is that written down somewhere findable?
- If you have special requirements (professional secrecy, health data): has EU hosting or self-hosting actually been evaluated - or has the topic only been used as a conversation-ender?

My experience: in 2026 a clean solution exists for practically every compliance requirement - EU data residency from the major providers, European models, open-source on your own infrastructure. "Data protection" no longer holds up as a blanket no; as a concrete list of requirements, it's genuinely useful.

## Dimension 5: Ground rules

The easiest dimension if you keep it light - and the most dangerous if you let it escalate.

Check questions:

- Do your employees know what they may and may not do with AI tools? Does the answer fit on one page?
- Is someone named who approves tools and answers questions - in days, not quarters?
- Have you roughly classified your use cases against the EU AI Act? For most internal applications the obligations are manageable; the AI literacy requirement (Article 4) applies to everyone deploying AI, though.

What you do *not* need in order to start: an AI committee with ten members, a thirty-page policy, a finalized ethics framework. I've watched a mid-sized company spend eight months on an AI policy during which not a single use case emerged. The policy was good in the end. It's just that nobody was waiting for it anymore.

## Scoring: where you should start

No point system - three typical profiles from practice instead:

**Profile A: "The curious ones with the data chaos."** People dimension strong, data weak. Start with tools and training - individual productivity gains don't need tidy data pools. In parallel, establish the *one* most important data access. The first process use case comes in six months.

**Profile B: "The tidy ones with the skepticism."** Data and IT solid, workforce reserved. Start with a small, visible pilot in a volunteer team - nothing convinces skeptics as reliably as colleagues talking about their own workload dropping. Broad training comes after.

**Profile C: "The prohibition culture."** No official tool access, but (guaranteed) shadow usage. Your first measure is the most uncomfortable one: create the official path and acknowledge reality. Every month of prohibition culture trains your people to hide their AI use - the worst possible starting position for everything that follows.

And if all five dimensions are weak? Then the result of the check is not "no AI" - it's: start small, with outside help or without, but start. Readiness doesn't precede practice. It comes from it.

## Frequently asked questions

**Is there a formal AI readiness score?**
There are many - almost all from vendors whose product happens to close exactly the gap their score finds. I think little of scores: they create false precision. The five dimensions above, answered honestly, tell you more than a number between 0 and 100.

**How long does this kind of assessment take?**
Done seriously: two to four weeks alongside daily business, including conversations with business units and IT. Compressed into a workshop: one day for a first solid picture. Anything that takes longer than six weeks is no longer an assessment - it's a stalling tactic.

**Does all our data need to be cleaned up before AI pays off?**
No - one of the most persistent myths. "Data strategy first, then AI" sounds sensible and in practice leads to years of run-up with no value. The opposite is true: your first use case shows you *which* data is worth cleaning up.

**We're a small company without an IT department - does this still apply?**
Yes, just smaller. Tool access plus a one-page ground rule plus one curious person with four hours a week - for a 30-person company, that's a perfectly adequate starting lineup.

**What's the most common blind spot?**
Shadow AI. Almost every leadership team underestimates how many employees have long been working with private accounts - with all the data protection risks the official path is meant to avoid. If you take the check seriously, ask anonymously. The numbers are reliably a wake-up call.

## Further reading

- [AI transformation: What to do now - and what can wait](/en/blog/ai-transformation-for-companies) - the roadmap that follows this assessment
- [AI for SMBs: What actually works](/en/blog/ai-for-smbs) - which use cases pay off today
- [AI training for employees](/en/blog/ai-training-for-employees) - how skepticism turns into competence
