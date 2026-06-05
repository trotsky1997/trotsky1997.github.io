---
layout: post
title: "Harness Engineering: Building the Shell for the Ghost"
date: 2026-04-04T19:24:15.596Z
categories: [Blog]
tags: [medium, agentic-ai]
imported_from: medium
excerpt: "For the past two years, a lot of applied AI discourse has orbited around the model itself: bigger models, better reasoning, stronger…"
original_medium_url: "https://medium.com/@di-zhang-fdu/harness-engineering-building-the-shell-for-the-ghost-4040d9e784e3"
---

<figure id="bb20" class="graf graf--figure graf-after--h3">
<img src="/images/blog/harness-engineering/cover.webp" alt="Harness engineering illustration" width="800" height="556" loading="eager" decoding="async" fetchpriority="high">
<figcaption><a href="https://uniat.edu.mx/curiosidades-ghost-in-the-shell/">https://uniat.edu.mx/curiosidades-ghost-in-the-shell/</a></figcaption>
</figure>

For the past two years, a lot of applied AI discourse has orbited around the model itself: bigger models, better reasoning, stronger benchmarks, better prompts. Then the conversation widened. Prompt engineering gave way to context engineering: not just *what* you tell the model, but *what total state* you place around it. And now, as agents move from demos into long-running, tool-using, multi-step systems, the center of gravity is shifting again. The hard problem is increasingly not the model alone, but the harness around it. Anthropic’s public engineering writing reflects exactly that progression: from simple, composable agent patterns, to context engineering, to long-running agent harnesses, structured handoffs, and agent evals. Thoughtworks has pushed the same direction from a software-engineering angle, framing harnesses as systems of feedforward guidance and feedback sensors that let agents be steered rather than merely prompted. (<a href="https://www.anthropic.com/research/building-effective-agents">Anthropic</a>)

That is why I keep coming back to *Ghost in the Shell*. Not because I think today’s LLMs possess anything like a literal soul, but because the metaphor is structurally useful. BFI describes Mamoru Oshii’s film as an exploration of consciousness, humanity, and identity, and more specifically as a study of dualities: old and new, organic and synthetic, mind and body. In that sense, *Ghost in the Shell* is less a story about AI triumphing over humanity than a story about what happens when intelligence, identity, and embodiment stop lining up neatly. (<a href="https://www.bfi.org.uk/lists/10-great-films-about-artificial-intelligence">BFI</a>)

That is also where the metaphor becomes useful for agents.

A model, by itself, is not yet an agent in the practical sense. Anthropic defines agentic systems as setups where models use tools and direct their own process dynamically, in contrast to fixed workflows. In other words, the jump from model to agent is not just a jump in intelligence. It is a jump in embodiment, control, and exposure to the world. The model may generate the next move, but something else must define what the model can see, what it can touch, what it is trying to accomplish, and how it finds out whether it is failing. That “something else” is what I mean by harness engineering. (<a href="https://www.anthropic.com/research/building-effective-agents">Anthropic</a>)

Harness engineering, in this framing, is the engineering of the shell around the model.

Not shell as cosmetic interface. Shell as operational body.

Not “everything except the model” in the vaguest possible sense, though that broad shorthand does exist in current discourse. More specifically, a harness is the control layer that makes a model act as an agent. Anthropic describes an agent harness or scaffold as the system that enables a model to act: it processes inputs, orchestrates tool calls, and returns results. Thoughtworks narrows the idea further for coding agents and emphasizes the steering loop: humans improve the harness so repeated failures become less likely over time. That is exactly the level where the interesting engineering is happening. (<a href="https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents">Anthropic</a>)

I think this harness does at least three things: **grounding, forward, and backward**.

### Grounding

Grounding defines the agent’s embodiment.

It specifies the agent’s I/O boundary, its available tools, the information it is allowed to access, and the actions it is permitted to take. It is the answer to the question: *what world does this agent actually live in?* Anthropic’s context engineering post makes clear that building capable agents now requires managing not just prompts, but the entire evolving context state: system instructions, tools, MCP connections, external data, and message history. Their tools guidance makes the same point from another angle: agents are only as effective as the tools they are given, and tool design matters because tools form the contract between deterministic systems and non-deterministic agents. Thoughtworks adds a useful companion concept here: “ambient affordances,” the structural properties of an environment that make it legible, navigable, and tractable for agents. (<a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">Anthropic</a>)

This is why I think grounding deserves to be named separately. Existing harness discussions often emphasize feedforward and feedback, which is right, but there is an even more basic layer underneath both: the conditions of embodiment. Before we ask whether an agent was guided well or corrected well, we should ask whether it was grounded at all. Did it have the right tools? The right affordances? The right visibility into state? The right permissions? Without grounding, the ghost has language but no body.

### Forward

Forward defines the agent’s intended trajectory.

This is more than a task description. It includes what the agent is trying to do, what counts as progress, how work should be decomposed, and what “done” means. Anthropic’s public work on long-running agents shows why this matters. In one harness design, they found that a model left with only a high-level prompt often tried to do too much at once, lost coherence, and failed to leave useful state for the next session. Their solution used an initializer agent to set up the environment and a coding agent to make incremental progress while leaving structured artifacts for handoff. In later work, they evolved that pattern into planner, generator, and evaluator roles, again centered on decomposition, explicit criteria, and structured inter-session continuity. (<a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents">Anthropic</a>)

That is what I mean by forward. It is not merely telling the agent what job exists. It is defining the path along which the job should unfold. If grounding gives the agent a body, forward gives it a direction. It turns open-ended capability into directed work.

This also explains why “just give the model a better prompt” is no longer enough. Once tasks span many turns, many tools, or many sessions, the important question is not just instruction quality. It is task geometry. What are the milestones? What is the handoff artifact? What is the next bounded chunk of work? What should be preserved, and what should be reset? Anthropic’s long-running agent writing explicitly points to context anxiety, context rot, and the need for context resets plus structured handoff. These are forward problems as much as context problems. (<a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents">Anthropic</a>)

### Backward

Backward closes the loop after action.

This is the layer of evaluation, correction, retry, and refinement. Thoughtworks describes harnesses in terms of guides and sensors: guides steer behavior before action, while sensors observe after action and help the agent self-correct. Anthropic’s evals work makes the same principle explicit from the measurement side. Their evaluation harness runs tasks end to end, records steps, grades outputs, and aggregates results; they argue that once agents are in production, teams without evals start flying blind. Evals are not a nice extra. They are how teams define success, detect regressions, and give themselves signals strong enough to improve the system intentionally. (<a href="https://martinfowler.com/articles/harness-engineering.html">martinfowler.com</a>)

This is why I call it backward. Not in the neural-network sense of backpropagation, but in the control-systems sense of returning information from the consequences of action back into the agent’s loop. Did the tool call really succeed? Did the code actually work? Did the reservation exist in the database, or did the agent merely *say* it did? Anthropic’s evals article draws that distinction sharply: the transcript is not the outcome, and the claimed completion is not the environment state. Backward is how the system learns that difference. (<a href="https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents">Anthropic</a>)

If grounding gives the agent a body, and forward gives it a direction, backward gives it correction.

### Why this matters now

Anthropic’s 2024 advice on building effective agents emphasized simple, composable patterns over ornate frameworks. That remains good advice. But as agent systems become longer-running, more autonomous, more tool-heavy, and more expensive, the quality bottleneck shifts outward. Anthropic’s multi-agent research system is a good example: the gains come not only from model quality, but from orchestration, decomposition, parallel context windows, and tool-mediated coordination. In their internal analysis, token usage, tool calls, and model choice explained most of the performance variance on a browsing benchmark. In other words, once intelligence passes a certain threshold, system design becomes a force multiplier. (<a href="https://www.anthropic.com/research/building-effective-agents">Anthropic</a>)

That does not mean models no longer matter. Of course they do. Better models widen the frontier of what a harness can successfully organize. But once a model is capable enough to be useful, competitive advantage increasingly comes from the shell: better grounding, clearer forward structure, stronger backward signals, and more harnessable environments. Thoughtworks says outright that not every codebase is equally amenable to harnessing, and that some environments are simply easier to regulate and steer. That is a profound point, and it reaches beyond coding. Some worlds are easier for agents to inhabit than others. (<a href="https://martinfowler.com/articles/harness-engineering.html">martinfowler.com</a>)

This is why I think harness engineering is becoming a first-class discipline.

Not because the model has become unimportant, and not because “ghost” should be mistaken for consciousness. But because in practice, what makes an agent usable is increasingly not the existence of intelligence in the abstract, but the quality of the shell that gives that intelligence operational form.

We are not building literal souls.

We are building bodies, boundaries, trajectories, and correction loops.

And in the agent era, that shell may be where the real engineering advantage lives.
