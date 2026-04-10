---
title: "Prompt Engineering: The fundamentals that actually matter"
description: "A compact, field-tested guide to prompt engineering - the techniques that make a real difference in real projects, without buzzword hype. From a Professor of Applied AI at HdM Stuttgart."
pubDate: 2026-04-10
lang: en
slug: prompt-engineering-fundamentals
translationKey: prompt-engineering-fundamentals
tags: ["prompt-engineering", "fundamentals", "pillar"]
---

> **Short answer:** Good prompt engineering in 2026 has six building blocks: a clear role, a precise task, the right amount of context, examples where needed, structured output, and a feedback loop that holds the prompt against a test set. Everything else - "prompt tricks", buzzword lists, "magic phrases" - is mostly folklore. What works is discipline.

This article was written by **Prof. Dr. Kay Rottmann**, Professor of Applied AI at HdM Stuttgart and former Senior Applied Scientist at Amazon Alexa, Sr. Manager AI for Manufacturing at the Bosch Center for AI, and Engineering Manager at Meta.

Last updated: April 10, 2026.

## What prompt engineering actually is

Prompt engineering is the discipline of explaining to a language model what you want it to do, in a way that reliably produces correct answers. That sounds trivial - but it isn't, because LLMs are extremely sensitive to the exact wording of the instruction.

What prompt engineering is **not**: a collection of magic sentences you prepend ("You are an expert with 30 years of experience..."). Such phrases help marginally, sometimes not at all. What actually helps is **clear structure** and **systematic iteration**.

Anyone working with LLMs long-term learns quickly: a good prompt is code. It gets versioned, tested, documented, and held against an eval set. If you're still maintaining your prompts in a Google Doc, that's the first thing that has to change.

## The six building blocks that actually matter

### 1. Clear role

Give the model a clear role - not as marketing flavor, but to set the tone, level of detail, and mode. Example:

> *"You are a technical editor writing for software engineers. You explain things precisely, concisely, and without marketing language."*

What you **don't** need: long character descriptions with biographies and personality traits. Three sentences are enough. The model knows what an "editor" does.

### 2. Precise task

The task is the most important line in the prompt. It should be:

- **Concrete** - say *what* the result should be, not just *what topic* it should be about.
- **Bounded** - one task, not five at once.
- **In imperative form** - "Write", "Classify", "Extract", "Compare", "Translate".

Weak task: *"Help me with the text."*
Strong task: *"Shorten the following text to a maximum of 200 words without losing facts, and keep the factual tone."*

### 3. Context in the right amount

The model knows nothing about your context except what you give it. But: **more context isn't automatically better.** Long contexts often produce worse answers - the model gets lost in the details, misses key passages, or mixes information from different parts.

Rule of thumb: provide only the context a human would need to do the task. Not less, but not more. If you're pasting documents, ask yourself: *which two paragraphs are actually relevant?* Those two paragraphs are often all you need.

For long contexts, structure helps. Use section headers, separator lines, or XML tags like `<document>...</document>` so the model knows where each piece of content starts.

### 4. Examples - but only when needed

Few-shot prompting (showing the model two to five examples of what the solution should look like) is one of the most reliable techniques there is. It helps especially when:

- The desired output has a specific format (e.g. JSON, a table, a particular tone).
- The task contains edge cases that are hard to explain in description.
- You want to transfer specific behavior to novel inputs.

**Not needed** if the task is simple and the model handles it reliably without examples. Examples cost tokens and latency - use them deliberately, not reflexively.

Important about examples: they have to be *representative*. Three very similar examples are worse than three different ones that span the spectrum.

### 5. Structured output

If you want to process the result downstream - and you usually do - demand a structured format. JSON works very reliably with all modern models, especially when you provide the schema in the prompt.

Even better: use the **"structured output" feature** of your model provider (OpenAI, Anthropic, and Google all offer it), which guarantees valid JSON against a given JSON Schema. That spares you the entire frustration of "the model forgot a comma".

For free text, it helps to specify the output format explicitly:

> *"Respond in exactly this format:*
> *## Summary*
> *One sentence.*
> *## Key points*
> *Three bullet points."*

### 6. Feedback loop and eval set

The most important point of all - and the one 80% of teams skip: **build a mini eval set for your prompt** before you put it into production.

Concretely: 10 to 30 real inputs for which you know what a correct answer looks like. Run your prompt against those inputs. For each response, note: correct, wrong, or borderline. Only when the prompt works reliably across those 30 cases does it ship.

Why this matters so much: without eval, you *believe* the prompt works - and only notice at the customer that it doesn't. With eval, you have a measurable number to test improvements against. More on the [LLM Evaluation for Production Systems](/en/consulting/llm-evaluation) page.

## Techniques that make a real difference in practice

Beyond the six fundamentals, a handful of techniques really help in real projects:

### Chain of thought - but sparingly

The idea: tell the model to *think first, then answer*. This noticeably improves results on more complex tasks - especially math, multi-step logic, and planning.

In modern models like Claude 4.6 and GPT-5, chain of thought is already built in for many tasks ("reasoning mode"). You don't have to invoke it explicitly anymore. For simple classification it can even hurt, because it costs latency and tokens without value.

### Use negative instructions cautiously

"Don't write about X" often works worse than "Write about Y". Models respond more strongly to positive instructions. If you want to avoid something, reframe it: not *"no marketing language"*, but *"factual, technical, concise"*.

### Persona in the output, not just the prompt

If you want a particular writing perspective (e.g., "from a salesperson's view"), don't just tell the model in the role - also demand it in the output schema: *"Begin with the perspective: 'From sales' point of view, I would say...'."* That anchors the model more strongly.

### Break hard tasks into steps

When a prompt regularly fails, the fix is rarely a "better prompt." It's usually splitting the task into **two or three smaller prompts**. Example: instead of "Summarize the text AND extract the key entities", two separate calls - one for the summary, one for the extraction. Not only more reliable, often cheaper too.

### XML tags for structuring

Especially with Claude models, XML tags work very well for delimiting content from instructions:

```
<task>
Extract all people and their roles from the following text.
</task>

<text>
{the_text_goes_here}
</text>

<format>
JSON with the fields "name" and "role".
</format>
```

This helps the model separate the instruction from the data - and massively reduces confusion.

## What doesn't work (or is just folklore)

Over the past three years I've seen a lot of prompt tips that don't hold up in practice. A short list:

- **"You are an expert with 30 years of experience..."** - rarely brings measurable improvement. A clear role description is enough.
- **"If you don't know something, say so honestly."** - barely helps. Models still hallucinate. What helps: explicitly demand sources, and check the response against external information.
- **"Take a deep breath and work step by step."** - this sentence went viral because one paper showed improvements. With modern models, the effect is minimal.
- **Tip promises** ("I'll give you a $200 tip if you do this well") - early models reacted to this, modern ones don't.
- **Threats or pressure** - they don't work and they're unethical when dealing with tools that simulate humans.

The honest truth: the impact of most "prompt hacks" is orders of magnitude smaller than the impact of **structure** and **iteration with eval**.

## How to introduce prompt engineering in a team

If more than one person writes prompts, you need a few simple rules:

1. **Prompts belong in Git.** Not in Notion, not in Slack, not in Google Docs. Versioned file with schema definition and tests next to it.
2. **Every prompt has an eval set.** Even if it's just 10 examples. No merge without eval.
3. **One person is responsible** - not the whole team. Anyone can propose, one person merges.
4. **Prompts are documented** - not stories, but: what does this prompt do, with what assumptions, against what eval set?

That sounds like a lot. But it's exactly what separates "we play with ChatGPT" from "we run LLMs in production." More on this in the [ChatGPT Training](/en/consulting/chatgpt-training) I offer for teams making exactly that jump.

## Frequently asked questions

**Won't prompt engineering be obsolete in two years as models get better?**
I've been hearing this question since 2023. The answer hasn't changed: models get better, *but so do the tasks*. We ask things of models today that were unthinkable two years ago. As long as you want the maximum out of a model, you need prompt engineering. The *techniques* will change, the *discipline* won't.

**Are prompts model-specific?**
Partly. The fundamentals apply to all models. In detail, Claude (likes XML tags), GPT (likes structured sections), and Gemini (somewhat freer-form) do differ. When you port a prompt from one model to another, you have to retest it - that's exactly why you need an eval set.

**How many examples make sense for few-shot?**
Rule of thumb: 2 to 5. More rarely brings measurable improvement and costs tokens. What matters is the **diversity** of examples, not the count.

**Does prompt engineering work as well in German as in English?**
With modern models (Claude 4.6, GPT-5, Gemini 2.5) practically yes - quality differences are negligible. With smaller or older models, English often produces slightly better results. If you're working in German, write the prompt in German - mixing English and German in the same prompt tends to confuse.

**Which books or courses on prompt engineering would you recommend?**
Honestly: books in this field go stale in three to six months. More reliable are the **official prompting guides** from Anthropic and OpenAI - they get updated regularly and are honest about what works and what doesn't. Practical exercise on real tasks beats any book.

## Read next

- [What is an AI Agent?](/en/blog/what-is-an-ai-agent) - if you want to know how good prompts become acting systems
- [Building AI Agents: A practical guide](/en/blog/building-ai-agents-practical-guide) - the next step after good prompts
- [LLM Evaluation for Production Systems](/en/consulting/llm-evaluation) - how to measure whether your prompts actually work
- [ChatGPT Training for Companies](/en/consulting/chatgpt-training) - structured prompt engineering training for whole teams
