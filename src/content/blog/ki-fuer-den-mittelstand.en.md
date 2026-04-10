---
title: "AI for SMBs: What actually works (and what doesn't)"
description: "A hands-on guide for small and mid-sized businesses: which AI use cases pay off today, which don't - and how to get started without buzzword bullshit. Written by a Professor of Applied AI with 15+ years of industry experience."
pubDate: 2026-04-10
lang: en
slug: ai-for-smbs
translationKey: ai-for-smbs
tags: ["ai-strategy", "smb", "pillar"]
---

> **Short answer:** For SMBs in 2026, AI pays off in three places: *structured research and writing tasks*, *processing unstructured data* (emails, documents, tickets), and *narrowly scoped agents* with measurable success. What does **not** pay off: fully autonomous systems without human review, "AI strategies" with no concrete first use case, and model-tinkering when the data foundation is missing.

This article was written by **Prof. Dr. Kay Rottmann**, Professor of Applied AI at HdM Stuttgart and former Senior Applied Scientist at Amazon Alexa, Sr. Manager AI for Manufacturing at the Bosch Center for AI, and Engineering Manager at Meta. He advises mid-market companies - particularly in the Stuttgart region - on AI strategy and implementation through [r7net GmbH](/en/consulting).

Last updated: April 10, 2026.

## Where SMBs stand in 2026

Three years after the ChatGPT shock, here's the picture in most mid-market companies I work with:

- **There's enthusiasm** - usually from individual employees who use ChatGPT privately and notice how much faster they can work.
- **There's fear** - about data protection, hallucinations, new regulations like the EU AI Act, and the feeling of "falling behind."
- **There's pressure** - usually from the board or the CEO to "finally do something with AI."
- **And there's very little clarity** about *what* you should actually do.

This article tries to close exactly that gap. No buzzwords. No "use case landscape" slides nobody actually wants to build. Just a sober view of what works in 2026.

## Three classes of use cases that almost always work today

### 1. Structured writing and research

This is the **fastest lever** in the SMB world - and the most underestimated. Employees in sales, marketing, recruiting, procurement, and management spend hours every day on tasks like:

- Drafting offers or customer messages
- Writing job postings, product copy, or newsletters
- Researching background on customers, suppliers, or competitors
- Reading and summarizing draft contracts
- Structuring meeting notes

With a properly configured solution - paid ChatGPT Enterprise, Microsoft Copilot, or a custom build via the API - 20 to 40 percent time savings per week are realistic. That's not a promise, that's what we measure with my customers.

Important: this only works if employees learn how to talk to the model. A structured [ChatGPT training](/en/consulting/chatgpt-training) typically pays back within a few weeks.

### 2. Processing unstructured data

Mid-market companies sit on mountains of text that classic software doesn't understand: customer requests, support tickets, complaints, applications, technical documentation, contracts, email correspondence. This is exactly where LLMs are extremely good today.

Concrete examples from practice:

- A machine builder auto-classifies incoming service requests by urgency, machine type, and resolution path - previously 15 minutes per ticket, now 30 seconds.
- An insurance broker auto-extracts claims information, checks plausibility, and proposes the next steps.
- A staffing firm pre-screens incoming applications against job requirements - fairly, with documentation, and audit-ready.

These use cases work *because they have clear inputs and clear outputs*. That makes them measurable - and that makes them production-ready.

### 3. Narrowly scoped AI agents

[AI agents](/en/blog/what-is-an-ai-agent) - systems that don't just respond, but autonomously use tools - are production-ready in 2026 for **narrowly scoped** tasks. Examples from active projects:

- A research agent that automatically builds a one-pager dossier on a contact and their company before each sales meeting - from public sources, with citations.
- A CRM hygiene agent that reviews master data after every customer interaction, fills in missing fields, and flags anomalies.
- A finance agent that checks incoming invoices, matches them against orders, marks discrepancies, and pre-books in the accounting system - only escalating edge cases to a human.

What these examples have in common: **clear goal, clearly measurable success, human in the loop for escalations.** When all three conditions are met, agents work reliably today. More on the [AI Agent Development](/en/consulting/ai-agent-development) page.

## Three classes of use cases that don't (yet) work

Just as important as the "works" list is an honest "doesn't work" list. What I currently advise SMBs **against**:

### 1. Fully autonomous systems without human review

If you think you can build an agent that *all by itself* answers customer requests, places orders, or sends contracts, you'll be disappointed. LLMs make mistakes - and not randomly, but in patterns you can't fully train away. Any serious application today still needs a human in the loop, at least for escalations and audits. Ignoring that risks expensive reputational damage and compliance issues.

### 2. "AI strategy" without a concrete first use case

Many SMBs first commission an "AI strategy" (ideally as an 80-page slide deck) and only then start. That's the wrong order. A strategy not grounded in real experience with a concrete use case is a wishlist.

My advice: **start with a concrete pilot project.** Learn from that project what your organization can and can't do. *That* informs your strategy. A solid [AI strategy consulting engagement](/en/consulting/ai-strategy-consulting) should always include a pilot use case - not just slides.

### 3. Model-tinkering when the data foundation is missing

You hear sentences like "we want to train our own model" or "we need our own AI" a lot in the SMB world. In 95 percent of cases, that's exactly the wrong move. Training your own models is expensive, slow, and above all: it doesn't solve a problem you couldn't solve with GPT-5, Claude 4.6, or an open-source model like Llama 4.

What you actually need: **good data**, **good prompts**, **good tools**, and a **working eval framework** (see [LLM Evaluation](/en/consulting/llm-evaluation)). Your own model is almost never the bottleneck.

## How do you get started concretely? The pragmatic path

When I advise an SMB starting from zero, the typical flow is:

1. **Use-case workshop (1 day).** Three to five people from different areas sit down and collect pain points from daily work. Out of the 30 to 50 ideas, we collectively pick the *one* that best fits the criteria above: narrowly scoped, measurable, with a human in the loop. That's the core of an [AI workshop for companies](/en/consulting/ai-workshop-for-companies).

2. **Prototype (2 to 4 weeks).** We build the first running prototype on real data. Not pretty, but functional. The goal: prove that the idea is technically feasible and roughly works as expected.

3. **Evaluation (in parallel).** Even at the prototype stage, we measure quality on a small, manually curated test set. No use case ships to production without eval - not in my projects.

4. **Pilot operation (4 to 8 weeks).** A small group uses the system in production, in parallel with the existing process. We continuously measure quality, efficiency, and user satisfaction.

5. **Roll-out (4 to 8 weeks).** Once the pilot works, we roll out to the full target group. Only now do training, SSO integration, IT compliance, and operations come fully on the table.

The full approach is documented in [AI Implementation in the Enterprise](/en/consulting/ai-implementation).

## What does it cost?

An honest order of magnitude - no consulting slide deck:

- **Workshop**: low four-figure euro range.
- **Prototype**: low five-figure euro range.
- **Pilot including eval framework**: mid five-figure euro range.
- **Roll-out**: depends heavily on the use case - typically upper five figures for a first production system with training and operational handover.

That sounds like a lot to some SMBs. But: most use cases we build save several times the investment per year - and create knowledge and momentum in the company that carries over to the next use case.

## What you can do today - for free

If you want to try things out yourself first, three concrete homework items:

1. **Make a list of the ten most frequent writing tasks** you do per week. For one week, try to solve each one with ChatGPT. Note where it worked, where it didn't - and why.
2. **Identify a text data pile in your company**: tickets, applications, complaints, customer correspondence. Ask: *"What would I want to know if someone had read all of that?"* That's your first use case candidate.
3. **Talk to your employees** - without pressure, without an "AI committee." Just ask: *"What about your work annoys you so much that you'd let a machine do it?"* The answers are your real AI use cases.

## Frequently asked questions

**Do I need a data scientist in-house for this?**
No, usually not. For most SMB use cases you don't need a data scientist - you need someone who can build software and understands processes, and who knows how to embed LLMs reliably into software. That's applied AI.

**What about the EU AI Act?**
The EU AI Act has been in force since 2024, with many requirements taking effect in 2026. Most SMB use cases fall under "limited risk" with manageable obligations (transparency, labeling). High-risk applications (e.g. in HR selection) need more care - but that's evaluated case by case. Don't let it scare you off: the obligations are workable when designed in from the start.

**What if my data can't go to the US?**
Then use models hosted in Europe (Mistral, Aleph Alpha, or open-source models like Llama 4 and Qwen 3 on European infrastructure). Microsoft Azure OpenAI now offers EU Data Residency with contractual guarantees. There's a valid solution for almost every compliance need.

**Isn't ChatGPT Enterprise plus a bit of training enough?**
For the first steps: yes, that's actually my explicit advice. Start with good training and a company-wide ChatGPT Enterprise account. Only when you feel where the limits are is it worth moving to custom applications, agents, or integrations.

**How do I find out whether my use case is worth it at all?**
Three questions: (1) Does manual processing cost more than 30 minutes per case? (2) Does it happen more than 100 times a month? (3) Is there a clear success indicator? If you answer yes to all three, it's a good candidate.

## Read next

- [What is an AI Agent?](/en/blog/what-is-an-ai-agent) - the definition and practical context for the agentic variant
- [AI Strategy Consulting](/en/consulting/ai-strategy-consulting) - if you want to find out structurally where to start
- [AI Workshop for Companies](/en/consulting/ai-workshop-for-companies) - the fastest way from "we should do something" to "we know what to do"
- [AI Implementation](/en/consulting/ai-implementation) - when the use case is clear and it's about delivery
