---
title: "What is an AI Agent? A definition from practice"
description: "A clear, hands-on definition of AI agents - what they are, how they differ from chatbots, when they work and when they don't. Written by a Professor of Applied AI."
pubDate: 2026-04-10
updatedDate: 2026-07-15
lang: en
slug: what-is-an-ai-agent
translationKey: what-is-an-ai-agent
tags: ["ai-agents", "pillar", "fundamentals"]
---

> **Short answer:** An AI agent is an LLM-based system that solves multi-step tasks on its own - it plans, calls tools, reads results, self-corrects, and finally returns a result. Where a chatbot only *responds*, an AI agent *acts*.

Written by **Prof. Dr. Kay Rottmann**. I'm a Professor of Applied AI at HdM Stuttgart, where my current research includes online evaluation of agentic AI systems; before that I was a Senior Applied Scientist at Amazon Alexa, Sr. Manager AI for Manufacturing at the Bosch Center for AI, and Engineering Manager at Meta.

First published April 2026, last updated July 15, 2026.

## The short definition

An **AI agent** is a software system that uses a Large Language Model (LLM) as its "brain" to autonomously achieve a given goal across multiple steps. To do that, it can:

1. **plan** - break a task into sub-steps,
2. **act** - call external tools (APIs, databases, other software),
3. **observe** - read and interpret the results of those tools,
4. **adapt** - change the plan based on new information,
5. **deliver** - return a final result.

The decisive difference from a classic chatbot: a chatbot answers a question and is then done. An agent **executes a task**.

## A concrete example

Imagine you tell a system: *"Find out whether we did more revenue last quarter with automotive customers or with mechanical engineering customers, and write me a short summary."*

A **chatbot** would say: "Sorry, I don't have access to your data."

An **AI agent** would:

1. Form a plan: "I need revenue data, filtered by industry and quarter."
2. Run a database query against the CRM.
3. Read the response: two lists of revenues.
4. Do the math: sums per industry, then compare.
5. Write a short natural-language summary.
6. Return that as the final result.

All five steps happen automatically. The LLM steers the flow without a human stepping in between steps.

## AI agent vs. chatbot vs. RPA - the comparison

| Property | Chatbot | AI agent | Classic RPA (e.g., UiPath) |
|---|---|---|---|
| **Reacts to** | A message | A task | A fixed trigger |
| **How many steps?** | Exactly 1 | Arbitrarily many | Pre-defined sequence |
| **Plans on its own?** | No | Yes | No |
| **Adapts to the unexpected?** | No | Yes (with limits) | No - it breaks |
| **Uses tools?** | Rarely | Core building block | Yes, hard-wired |
| **Language as the interface?** | Yes | Yes | No |

The key takeaway: AI agents are **not** just "chatbots with more features." They are **also not** "RPA with language." They are their own class of systems - their strength is the combination of *flexible planning* and *executing under uncertainty*.

## What does an AI agent consist of, technically?

Every production AI agent has at least four components:

### 1. The model (the "brain")

An LLM like GPT-5, Claude 4.6, Gemini 2.5, or an open-source model like Llama 4 or Qwen 3. The model is responsible for *thinking*: understanding the task, forming a plan, picking a tool, interpreting results, deciding the next step.

### 2. Tools

Functions the agent can call. Examples:

- A web search or query against an internal knowledge base
- A database query
- An API call to an external system (CRM, ERP, helpdesk)
- Code execution (Python, SQL)
- Sending an email or creating a ticket

Tools are what make the agent *capable of acting*. Without tools, the agent is just a chatbot with better manners.

### 3. Memory

To act consistently across steps, the agent needs memory. At minimum a short-term memory for the current task. Often also long-term memory (e.g. a vector database) it uses across multiple tasks.

### 4. An agent loop

The scaffolding that orchestrates the flow: *"ask the model what to do next → execute it → feed the result back to the model → repeat until done."* Frameworks like LangGraph, CrewAI, or the Anthropic Agent SDK ship this loop. But it can also be hand-written in 100 lines of Python.

## When does an AI agent make sense - and when not?

From my project experience: AI agents pay off when **all three** of these conditions are met:

1. **The task has multiple steps** that depend on each other.
2. **The exact sequence isn't known up front** - it depends on intermediate results.
3. **There's a clear success indicator** you can measure the agent against.

AI agents do **not** pay off when:

- The task is deterministic and single-step → a normal script will do.
- There's no clear definition of success → you can't measure whether the agent works (see [LLM Evaluation](/en/consulting/llm-evaluation)).
- The cost of failure is high and there's no human fallback → the risk outweighs the benefit.

The last point is particularly important in regulated industries: fully autonomous agents without an audit trail aren't production-ready in many B2B contexts.

## How do you measure whether an AI agent is good?

The honest answer: it's an open research problem.

In practice, at least four dimensions are usable today:

- **Goal achievement** - does the agent reach the stated goal at all?
- **Policy adherence** - does it follow the rules we give it (e.g., "always confirm before deleting")?
- **Efficiency** - does it reach the goal with reasonable effort (number of tool calls, token usage, time)?
- **Consistency (pass^k)** - does it behave consistently across multiple runs of the same input? An agent that's right 5 out of 10 times is a production risk.

A reliable eval framework is just as important as the agent itself. Without eval, you don't know when something breaks - and with LLM-based systems, things break regularly (model updates, prompt drift, data shifts).

## Where are we in 2026?

AI agents today (as of April 2026) are **production-ready** for many clearly bounded tasks - classification, research, structured data maintenance, sales qualification. For open-ended, creative, or highly autonomous use cases they are **not yet**. The gap is closing, but more slowly than vendor marketing suggests.

My advice from 15+ years of AI engineering at Meta, Bosch, and Amazon: start small. Build an agent for exactly one clearly measurable task. Build the eval framework from day one. Expand only once you can prove the first agent works reliably.

## Frequently asked questions

**Is every chatbot with multiple replies an AI agent?**
No. A chatbot answering several questions is still a chatbot. An agent differs in that it uses tools to *actively change something in the world* - not just return text.

**Do I need a specific LLM to build AI agents?**
No, but quality varies a lot. As of 2026, GPT-5, Claude 4.6, and Gemini 2.5 are the most reliable models for agentic behavior. For simpler tasks, open-source models like Llama 4 or Qwen 3 also work - at significantly lower cost.

**What's the difference between an AI agent and a multi-agent system?**
An AI agent is a single system that solves a task. A multi-agent system orchestrates several specialized agents that together solve a larger problem. My standard advice: start with a single agent. Move to multi-agent only when you concretely hit a problem a single agent can't solve.

**How much does it cost to have an AI agent built?**
Typically in the low to mid five-figure euro range for a first production agent including the eval framework. A pure prototype is significantly cheaper. More on the [AI Agent Development](/en/consulting/ai-agent-development) page.

**How long does building a production AI agent take?**
From use-case workshop to production agent typically 6 to 10 weeks. A first prototype on real data often after 2 to 4 weeks.

## Read next

- [Agentic AI for companies](/en/blog/agentic-ai-for-companies) - what agents mean organizationally and how to prepare
- [Building AI agents: a practical guide](/en/blog/building-ai-agents-practical-guide) - the technical implementation, step by step
- [AI Agent Development](/en/consulting/ai-agent-development) - if you want to have an agent built
- [LLM Evaluation](/en/consulting/llm-evaluation) - how to measure whether an agent actually works

*Transparency note: consulting and training services linked from this article are provided through r7net GmbH - independent of my role at Hochschule der Medien Stuttgart.*
