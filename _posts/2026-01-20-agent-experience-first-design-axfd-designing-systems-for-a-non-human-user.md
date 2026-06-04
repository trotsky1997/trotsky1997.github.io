---
layout: post
title: "Agent Experience First Design (AXFD): Designing Systems for a Non-Human User"
date: 2026-01-20T06:41:41.747Z
categories: [Blog]
tags: [medium, agentic-ai]
imported_from: medium
excerpt: "For the last two decades, “user experience” meant human experience: interfaces, flows, copy, and conversion."
original_medium_url: "https://medium.com/@di-zhang-fdu/agent-experience-first-design-axfd-designing-systems-for-a-non-human-user-ed3fcdd9ad7e"
---

<figure id="ffb8" class="graf graf--figure graf-after--h3">
<img src="https://cdn-images-1.medium.com/max/800/0*_Vp8lzKscNmrfdEK" />
<figcaption>Source: theverge.com</figcaption>
</figure>

For the last two decades, “user experience” meant **human experience**: interfaces, flows, copy, and conversion.

But in a growing class of products, the primary operator is no longer a person. It’s an **agent**: a loop that reads state, plans, calls tools, evaluates results, retries, and keeps going. Humans still set goals and approve outcomes, but the day-to-day “clicking” is done by a probabilistic caller.

This post proposes a framing — and a name — for the design discipline that follows:

**Agent Experience First Design (AXFD)** A product and systems design approach that treats the agent as a first-class user, designing around how it *perceives* state, *takes* actions, *incorporates* memory, *learns* from feedback, and *recovers* from failure.

The punchline is simple:

**In agentic systems, reliability is mostly interface design plus recovery engineering.**

### The mental model: your new user is non-deterministic

Traditional software assumes a user who:

- <span id="58e4">understands implied context,</span>
- <span id="f14c">can tolerate ambiguity,</span>
- <span id="9d84">can improvise around unclear errors,</span>
- <span id="c343">can stop and ask for help.</span>

Agents do none of that reliably. They are:

- <span id="f8d8">**highly capable** but **highly literal**,</span>
- <span id="64c1">prone to **overconfident mistakes**,</span>
- <span id="f72e">eager to **retry**,</span>
- <span id="3f8a">willing to **loop forever**.</span>

If you design your system like it’s being used by a careful human, an agent will eventually turn your UX into an outage.

So AXFD starts from a different premise:

**Assume the operator will misunderstand you. Assume it will repeat itself. Assume it will run at scale.**

### Why AXFD is not just “API design” or “prompting”

AXFD sits in a real gap between disciplines:

### It’s not prompt engineering

Prompting improves “thinking inside the model.” AXFD improves the **world outside the model**: tool contracts, state surfaces, error semantics, checkpoints, and observability.

### It’s not traditional API-first

API-first is “design the interface before the UI.” AXFD is “design the interface for a caller that can hallucinate.”

That difference matters: API contracts designed for deterministic clients often collapse under non-deterministic behavior (retries, partial success, ambiguous state, untyped errors).

### It’s not UX (but it changes UX)

You still need human UX — approvals, review, trust, affordances. But AXFD recognizes a second surface:

- <span id="3b59">**Human surface:** UI, explanations, controls, approvals</span>
- <span id="304c">**Agent surface:** schemas, typed failures, explicit state, checkpoints, traces</span>

Modern products increasingly win or lose on the second surface.

### Why now: two shifts made AXFD practical (not philosophical)

### 1) Outputs can finally behave like interfaces

OpenAI’s **Structured Outputs** were introduced specifically to ensure model outputs “exactly match JSON Schemas provided by developers.” (<a href="#">OpenAI</a>) This is a crucial shift: “valid JSON” is not enough; agents need **schema conformance**.

Similarly, OpenAI’s function/tool calling is designed around tools “defined by a JSON schema.” (<a href="#">OpenAI</a>) This means contracts can be enforced at the boundary, not wished into existence with prompt wording.

### 2) Tool ecosystems are being standardized

MCP (Model Context Protocol) explicitly positions itself as a standardized way to connect AI applications to external systems — “like USB-C.” (<a href="#">Model Context Protocol</a>) And the Linux Foundation’s **Agentic AI Foundation (AAIF)** launched with founding contributions including MCP and OpenAI’s AGENTS.md, signaling that agent interoperability is becoming infrastructure. (<a href="#">linuxfoundation.org</a>)

When connectivity becomes standardized, differentiation shifts from “can you connect tools?” to “can your agent operate safely and reliably?”

That’s AXFD.

### Positioning: where AXFD comes from (and why it’s a new center)

AXFD is new as a name, but it’s a convergence of older ideas — recentered around a new “user.”

### Unix philosophy: programs are users too

A common summary attributed to McIlroy is: write programs to work together, and handle text streams as a universal interface. (<a href="#">cscie2x.dce.harvard.edu</a>) AXFD inherits the same spirit: predictable outputs, composability, and explicit failure semantics.

### DevEx: experience drives throughput

DevEx research and practice often distill productivity into **feedback loops, cognitive load, and flow state**. (<a href="#">queue.acm.org</a>) AXFD is DevEx for a different kind of developer: an agent that must maintain “flow” across tool calls, keep cognitive load low via legible state, and rely on tight feedback loops from typed errors and fast verification.

### RL: the environment is half the algorithm

OpenAI Gym’s framing is straightforward: a “standard API to communicate between learning algorithms and environments.” (<a href="#">GitHub</a>) AXFD applies the same lesson to LLM agents: if you improve the environment (tools, state, feedback), the same agent becomes dramatically more capable.

### GitOps/ChatOps: long-running automation needs recovery + observability

The operational world already learned that automation must be observable, declarative, and recoverable. AAIF/MCP suggest agent systems are going the same way — into standardization and ops-grade expectations. (<a href="#">linuxfoundation.org</a>)

AXFD is what you get when those traditions collide with non-deterministic tool callers.

### A practical definition: the Agent Experience Stack

AXFD designs for five “experiences” that decide whether agents thrive or spiral.

### 1) Perception: can the agent see the world clearly?

Agents need state that is:

- <span id="ef0a">machine-readable (not vibes),</span>
- <span id="58c3">stable in format,</span>
- <span id="28af">referenceable (IDs, versions, hashes),</span>
- <span id="4e65">diffable (artifacts, patches).</span>

If the system’s truth is buried in prose, the agent’s plan becomes fiction.

### 2) Action: can the agent act safely and predictably?

Assume duplicates and retries.

HTTP gives a crisp anchor: a method is idempotent if multiple identical requests have the same intended effect as one request. (<a href="#">RFC</a> ) AXFD generalizes this idea to all agent actions:

- <span id="1178">idempotency keys,</span>
- <span id="f8fb">transactional boundaries,</span>
- <span id="d14a">compensating actions,</span>
- <span id="c5b6">“plan then execute.”</span>

### 3) Memory: can the agent remember without poisoning itself?

AXFD treats memory like an OS problem:

- <span id="82a6">short-term working set vs long-term retrieval,</span>
- <span id="10d0">provenance and citations,</span>
- <span id="5b8a">expiration and invalidation,</span>
- <span id="c6ac">compression and checkpoints.</span>

A “chat log” is not memory. It’s entropy.

### 4) Feedback: can the agent tell what happened and what to do next?

Human UX can say “Something went wrong.” Agent UX cannot.

Typed failures should encode:

- <span id="39ed">`error_type`,</span>
- <span id="e7a5">`retryable`,</span>
- <span id="9360">`hint` (next best action),</span>
- <span id="23fc">`partial_results` (what is safe to reuse).</span>

### 5) Recovery: can the agent resume and rewind?

Long-running agents will break mid-flight:

- <span id="3cf2">timeouts,</span>
- <span id="77fc">tool outages,</span>
- <span id="7588">context drift,</span>
- <span id="ce41">partial side effects.</span>

AXFD requires:

- <span id="1362">checkpoints,</span>
- <span id="8c8b">resumable runs,</span>
- <span id="3d6d">replayable tool calls,</span>
- <span id="4104">safe re-entry.</span>

### AXFD’s core framing: “APIs are the new UI”

Here’s the sharp version you can use as your blog’s central frame:

- <span id="c137">**APIs are the new UI.** (Agents “click” endpoints and tools.)</span>
- <span id="d9c1">**Schemas are the new design system.** (Consistency and constraints at scale.)</span>
- <span id="4bce">**Errors are the new copywriting.** (They shape behavior more than success.)</span>
- <span id="cd60">**Checkpoints are the new Undo button.** (They turn failure into progress.)</span>

Or even shorter:

**Design for the operator that never sleeps and never stops retrying.**

### The principles (positioning-friendly and actionable)

### 1) Contract first

Use JSON Schema / OpenAPI-level contracts wherever possible. Structured Outputs exist to guarantee schema conformance, not just well-formed JSON. (<a href="#">OpenAI</a>)

Tool calling should be schema-defined rather than “best effort” parsing. (<a href="#">OpenAI</a>)

### 2) Machine-readable by default

Human-friendly narratives are optional; structured returns are mandatory.

### 3) Typed failure is a feature

Vague errors create agent loops. Typed errors create recovery.

### 4) Idempotent and re-entrant operations

Assume the agent will call it twice. Design it so the second call is safe. (<a href="#">RFC</a>)

### 5) Checkpoint everything that matters

Make progress resumable; make state auditable.

### 6) Observability first

If you can’t debug the agent’s run deterministically, you can’t scale it.

### 7) Budgeted autonomy and least privilege

Agents should earn trust through constraints (scopes, approvals, rate limits, cost ceilings).

### 8) Standardize connectivity; differentiate on experience

MCP and AAIF signal that interoperability is moving toward standard infrastructure. (<a href="#">Model Context Protocol</a>) Your moat shifts to how safely and reliably agents can operate in your system.

### A maturity model for products (useful for positioning)

**Level 0 — Vibes:** free-form text everywhere, manual recovery. **Level 1 — Parseable:** mostly stable output, brittle retries. **Level 2 — Contracted:** schemas, validation, typed failures, explicit state surfaces. (<a href="#">OpenAI</a>) **Level 3 — Recoverable:** checkpoints, resumability, idempotency keys, replayable runs. **Level 4 — Operable at scale:** policy gating, budgets, observability, standardized tool ecosystem (MCP-class). (<a href="#">Model Context Protocol</a>)

AXFD is the discipline of climbing this ladder.

### A copy-paste AXFD checklist (ship this with your repo)

**Contracts**

- <span id="0c70">Every tool has a schema, examples, and strict validation. (<a href="#">OpenAI</a>)</span>
- <span id="cb9b">Outputs are versioned and backward compatible.</span>

**Failure semantics**

- <span id="89f9">Errors include `error_type`, `retryable`, `hint`, and `partial_results`.</span>

**State**

- <span id="a6a2">State is explicit, snapshot-able, and diffable.</span>

**Safety**

- <span id="15b8">Side-effectful actions are idempotent or transactional. (<a href="#">RFC</a> )</span>
- <span id="9e30">Least-privilege tool scopes; high-risk actions are gated.</span>

**Recovery**

- <span id="c557">Runs are resumable from checkpoints.</span>
- <span id="3f09">Supports “plan then execute.”</span>

**Observability**

- <span id="dc4b">Structured logs + trace IDs for every tool call.</span>

### Closing: the next moat after standards

If MCP-style protocols make “connecting tools” cheap and ubiquitous, the next moat is not the connector.

It’s the experience you provide to the operator that will:

- <span id="feb0">misunderstand your system,</span>
- <span id="c3cd">retry aggressively,</span>
- <span id="cecb">run at scale,</span>
- <span id="0a94">and keep going anyway.</span>

That operator is the agent.

**AXFD is simply the name for designing your system so the agent doesn’t go insane inside it.**

\[**1**\] <a href="https://openai.com/index/introducing-structured-outputs-in-the-api/?utm_source=chatgpt.com">https://openai.com/index/introducing-structured-outputs-in-the-api/?utm_source=chatgpt.com</a> Introducing Structured Outputs in the API

\[**2**\] <a href="https://platform.openai.com/docs/guides/function-calling?utm_source=chatgpt.com">https://platform.openai.com/docs/guides/function-calling?utm_source=chatgpt.com</a> Function calling \| OpenAI API

\[**3**\] <a href="https://modelcontextprotocol.io/?utm_source=chatgpt.com">https://modelcontextprotocol.io/?utm_source=chatgpt.com</a> What is the Model Context Protocol (MCP)? — Model Context …

\[**4**\] <a href="https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation?utm_source=chatgpt.com">https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation?utm_source=chatgpt.com</a> Linux Foundation Announces the Formation of the Agentic …

\[**5**\] <a href="https://cscie2x.dce.harvard.edu/hw/ch01s06.html?utm_source=chatgpt.com">https://cscie2x.dce.harvard.edu/hw/ch01s06.html?utm_source=chatgpt.com</a> Basics of the Unix Philosophy

\[**6**\] <a href="https://queue.acm.org/detail.cfm?id=3595878&amp;utm_source=chatgpt.com">https://queue.acm.org/detail.cfm?id=3595878&amp;utm_source=chatgpt.com</a> DevEx: What Actually Drives Productivity

\[**7**\] <a href="https://github.com/openai/gym?utm_source=chatgpt.com">https://github.com/openai/gym?utm_source=chatgpt.com</a> openai/gym: A toolkit for developing and comparing …

\[**8**\] <a href="https://www.rfc-editor.org/rfc/rfc9110.html?utm_source=chatgpt.com">https://www.rfc-editor.org/rfc/rfc9110.html?utm_source=chatgpt.com</a> RFC 9110: HTTP Semantics
