---
title: "Building AI Agents: A practical guide for 2026"
description: "A concrete, technical guide to building a production-ready AI agent - from use-case selection to the first prototype to the eval framework. With code examples and decision aids from real projects."
pubDate: 2026-04-10
lang: en
slug: building-ai-agents-practical-guide
translationKey: building-ai-agents-practical-guide
tags: ["ai-agents", "practice", "pillar"]
---

> **Short answer:** You build a production-ready AI agent in 2026 in this order: (1) pick a narrow use case, (2) identify tools and data sources, (3) build the eval set *before* the code, (4) write a minimal agent loop in 100 lines, (5) iterate until eval is green, (6) add human review, (7) ship. Skipping steps - especially eval - doesn't get you an agent. It gets you a demo.

This guide was written by **Prof. Dr. Kay Rottmann**, Professor of Applied AI at HdM Stuttgart and former Senior Applied Scientist at Amazon Alexa, Sr. Manager AI for Manufacturing at the Bosch Center for AI, and Engineering Manager at Meta. It's the practical sequel to [What is an AI Agent?](/en/blog/what-is-an-ai-agent).

Last updated: April 10, 2026.

## Who is this article for?

This article is for **software engineers, technical product owners, and CTOs** building their first production AI agent - not just a notebook demo. You can read Python, you know REST APIs, and you know what a test set is. For theoretical foundations, see the definition article above.

If you're not technical and just want to know whether an agent makes sense for your problem, read [AI for SMBs](/en/blog/ai-for-smbs) instead.

## Step 1: Sharpen the use case

The most common mistake in agent building isn't technical - it's framing. The use case is too big. "Build me an agent that automates sales" isn't a use case, it's a wish.

A good agent use case meets four criteria:

1. **Bounded input** - *one* type of request, *one* type of input document.
2. **Bounded output** - a clear answer, a clear report, a clear action.
3. **2 to 8 tools maximum** the agent can use. More than that and the model rarely behaves reliably today.
4. **Measurable success** - at least one metric that tells you whether the agent works.

Example from a real project: *"Read incoming service tickets, check them against the customer database and the knowledge base, propose a response and resolution path, escalate unclear cases to a human."* Narrowly scoped, four tools, measurable via resolution rate and escalation rate.

## Step 2: Map tools and data sources

Before you write a line of code, you need a list of the tools the agent should be able to call. For each tool:

- **Name and description** in two or three sentences - the agent will read exactly this description to decide when to use the tool.
- **Input schema** as JSON Schema. Don't cut corners here - good schemas are the most important behavioral guardrail.
- **Output format** - what does the agent get back? How big is it at most?
- **Latency and cost per call**.
- **Failure mode** - what happens when the tool fails? Does it return an error message the agent can understand?

In my projects, we always fill out a small table with exactly these columns before the first line of code. Sounds trivial, saves days of debugging.

## Step 3: Build the eval set FIRST

This is where the majority of agent projects fail: the eval set gets built at the end, "when there's time." You know what happens: the time never comes. The agent ships without eval. Three months later, someone notices the answer quality dropped 20 percent after a model update - and nobody can say when it happened.

Build your eval set *before* you build the agent. Requirements:

- **At least 30 test cases for the first sprint**, 100+ before the production roll-out.
- **Real data**, not synthetic - synthetic test cases don't cover the real failure modes.
- **Three categories**: easy cases (should pass), hard cases (should pass but often fail), edge cases (inputs the agent should reject or escalate).
- **Unambiguous success criteria** per case - either an expected structured response, or a list of properties the response must satisfy.

For agents you also need **trajectory eval**: which tools were called in what order? Were policies followed? How many steps did the agent take?

More on eval methods for agents on the [LLM Evaluation for Production Systems](/en/consulting/llm-evaluation) page.

## Step 4: Write the minimal agent loop

You don't need a framework to build an agent. A complete agent loop fits in under 100 lines of Python. Here's the core:

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

That's the core, basically. Frameworks like LangGraph, CrewAI, or the Anthropic Agent SDK add useful pieces - trace logging, retries, parallel tool calls, sub-agents, streaming. But they don't replace understanding what the loop actually does.

**My advice**: build the first agent without a framework. Then you understand which pieces of a framework you actually need - and which only add complexity without value.

## Step 5: Write the system prompt - carefully

The system prompt is the most important config file for your agent. It should contain at minimum:

1. **Who the agent is** and who it works for - a short role description.
2. **What its goal is** - one sentence stating the task crisply.
3. **Which tools are available** and when to use them. Even though the model knows the tool descriptions, a brief usage guide in the system prompt helps a lot.
4. **The policies** - what it can and can't do. Example: *"Never send a response to the customer without first having a human approve it."*
5. **How to communicate uncertainty** - explicit instruction to escalate or ask when unsure.
6. **How to signal "done"** - for instance through a specific format for the final response.

The system prompt isn't marketing copy. Write it precisely, check every line against your eval set, and version it like code.

## Step 6: Iterate until eval is green

Now the actual work begins. The typical loop:

1. Run the eval set.
2. Categorize failures by failure mode - *where* exactly did it go wrong?
3. Fix the most frequent failure class. Options, in this order: tighten the tool description, sharpen the system prompt, structure the tool output, redraw tool boundaries, swap models.
4. Run the eval again. Did the fix create new failures? (It often does. That's why you need eval.)
5. Repeat.

Important: **don't try to fix everything at once.** One change per iteration. Otherwise you won't know what helped.

## Step 7: Add human review

No agent ships to production without a human in the loop in 2026. The only question is: where?

Three common patterns:

- **Pre-action approval**: the agent proposes an action, a human clicks "approve". Suited for rare, high-stakes actions (sending, booking, contracts).
- **Sampling review**: the agent acts autonomously, but 10 to 20% of all cases automatically go to a human for review. Suited for high-frequency routine work.
- **Confidence routing**: the agent emits a self-assessment, and only cases below a threshold go to a human. Suited only when self-assessment can be calibrated - which is rarely the case. Be cautious.

Build the review system *together with* the agent, not afterwards. Otherwise you'll accumulate a backlog of unreviewed cases in the first month that nobody can ever catch up on.

## Step 8: Observe, observe, observe

A production agent needs **at least** three monitoring layers:

1. **Trace logging** - every agent run is fully logged: input, tool calls, tool responses, final output, latency, cost. Tools like Langfuse or Phoenix make this easy.
2. **Online metrics** - success rate, escalation rate, average tool calls per run, average token cost per case. These run live on a dashboard.
3. **Drift detection** - weekly comparison of online metrics against the prior week. Any significant degradation gets investigated - usually a model update or a shift in input data.

Without monitoring you don't know when something breaks - and with LLM-based systems things break regularly.

## Common mistakes - and how to avoid them

From over two years of shipping agents in production, the five most common pitfalls:

**1. Too many tools.** More than eight tools makes the model unreliable. If you need more, group them hierarchically into sub-agents.

**2. Vague tool descriptions.** "Fetches customer data" isn't a description. "Returns master data and the last 10 orders for a given customer ID, or a 404 error if the customer doesn't exist" is a description.

**3. Infinite loops.** Always set `max_steps`. Set it low - usually 10 is enough. If your agent regularly needs 30 steps, the use case is probably scoped wrong.

**4. Hallucinated tool calls.** Sometimes the model hallucinates a tool that doesn't exist. Your implementation has to catch this cleanly and communicate it back to the agent ("Tool X doesn't exist, available are: A, B, C").

**5. Forgotten eval after model updates.** When you migrate to a new model - even just a smaller version - the full eval has to run again. Every time. No exceptions.

## When does a framework pay off?

Frameworks like LangGraph, CrewAI, the Anthropic Agent SDK, or the OpenAI Agents SDK pay off as soon as **at least one** of these is true:

- You need sub-agents or multi-agent orchestration.
- You need streaming UIs with live updates during the agent run.
- You need integrated tracing/observability without rolling your own.
- You need advanced retry and fallback logic.
- More than two people work on the agent and need a shared standard.

For a first production agent in an SMB the answer is almost always: **you don't need a framework**. Frameworks only get interesting at the second or third agent.

## Frequently asked questions

**Which model is best for agents in 2026?**
As of April 2026, Claude 4.6 (Opus and Sonnet), GPT-5, and Gemini 2.5 Pro are the most reliable models for agentic behavior - meaning tool use, plan adaptation, and consistent behavior across steps. For simpler agents, smaller models like Claude Haiku 4.5 or GPT-5 Mini are often enough.

**How many tool calls per agent run is normal?**
For a well-scoped use case typically 3 to 8. If the agent regularly makes 15+ calls, the scope is usually too broad or the tools are too granular.

**How do I keep an agent from getting too expensive?**
Three levers: (1) cache repeating tool calls, (2) limit context length via summarization of earlier steps, (3) swap to cheaper models for simple sub-tasks. In my projects we typically land between 5 and 30 cents per agent run in production.

**How do I handle data protection?**
If personal data is involved: pick a model with European data residency (Azure OpenAI EU, Mistral, Aleph Alpha, or a self-hosted open-source model). Pseudonymize data before the model sees it, where the use case allows. Don't log anything you wouldn't be allowed to log.

**Can I build an agent without programming?**
With tools like n8n, Make, or Zapier you can click together simple agent-ish workflows without code. For genuinely agentic systems - that plan and adapt on their own - you still need code today. That will change over the next 12 to 24 months.

## Read next

- [What is an AI Agent?](/en/blog/what-is-an-ai-agent) - the definitional foundation
- [AI for SMBs](/en/blog/ai-for-smbs) - if you're not sure whether an agent is the right approach for your case
- [AI Agent Development](/en/consulting/ai-agent-development) - if you want to have an agent built
- [LLM Evaluation](/en/consulting/llm-evaluation) - how to measure whether your agent actually works
