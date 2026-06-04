---
layout: post
title: "On the eve of the Vibe Computing era: Why agentic coding feels like a 1980s terminal — and why that’s the point"
date: 2025-12-31T08:47:58.900Z
categories: [Blog]
tags: [medium, agentic-ai]
imported_from: medium
excerpt: "On the eve of the birth of the Vibe Computer"
original_medium_url: "https://medium.com/@di-zhang-fdu/on-the-eve-of-the-birth-of-the-vibe-computer-why-agentic-coding-feels-like-a-1980s-terminal-and-96c41510c356"
---

<figure id="0583" class="graf graf--figure graf-after--h3">
<img src="https://cdn-images-1.medium.com/max/800/0*IK3C6fUanwDMK6gF.jpg" />
<figcaption>Apple-I (source: apple1.fr)</figcaption>
</figure>

### On the eve of the birth of the Vibe Computer

### — Why agentic coding feels like a 1980s terminal — and why that’s the point

The first time I used Claude Code, I had an oddly anachronistic feeling: this wasn’t an IDE. It felt like sitting in front of an old terminal, face-to-face with an interpreter. I would type a sentence, it would take a step; I would stare at the diff and the test output, and then nudge it again. The “program” wasn’t a file I wrote and compiled — it was the loop itself: intent → action → observation → adjustment.

That sensation got a name in 2025: **vibe coding**. Andrej Karpathy described it as a new kind of coding where you “give in to the vibes” and “forget that the code even exists.” (<a href="https://x.com/karpathy/status/1886192184808149383?lang=en&amp;utm_source=chatgpt.com">X (formerly Twitter)</a>) Simon Willison quickly drew a sharper boundary: vibe coding is not “AI-assisted programming” in general — it’s the specific approach where you let the AI generate code without really caring about the code it produced. (<a href="https://simonwillison.net/2025/Mar/19/vibe-coding/?utm_source=chatgpt.com">Simon Willison’s Weblog</a>)

It’s easy to treat all of this as a “new machine learning model” story: better models, better prompts, better workflows. But there’s a more useful framing — especially if you’re trying to understand what comes next:

> *We’re not just learning to use new models.
> We’re learning to operate a new kind of computer.*

And Claude Code’s retro terminal vibe? That’s not a UX quirk. It’s a tell.

### 1) Vibe coding is a symptom, not the phenomenon

Karpathy’s line about “forgetting the code exists” is provocative because it inverts the usual hierarchy of software development. For decades, code has been the sacred artifact; understanding the code is how you control the system. Vibe coding (in its extreme form) demotes code into a disposable intermediate product and elevates the feedback loop as the real source of progress. (<a href="https://x.com/karpathy/status/1886192184808149383?lang=en&amp;utm_source=chatgpt.com">X (formerly Twitter)</a>)

That’s why the term triggers pushback. In production engineering, “not reading the diff” is a red flag. Willison’s insistence on the definition is essentially a safety rail: if we blur the term to mean “any AI help,” we miss the real discontinuity — this shift from **code-as-artifact** to **loop-as-interface**. (<a href="https://simonwillison.net/2025/Mar/19/vibe-coding/?utm_source=chatgpt.com">Simon Willison’s Weblog</a>)

But if we treat vibe coding purely as a risky workflow choice, we still miss the deeper point: the workflow feels plausible because the underlying machine changed.

### 2) Claude Code feels like an 80s terminal because it is a kind of monitor

Anthropic’s own positioning of Claude Code is revealing: it’s a terminal tool, designed to be “low-level and unopinionated,” giving “close to raw model access” rather than forcing a single workflow. (<a href="https://code.claude.com/docs/en/overview?utm_source=chatgpt.com">Claude Code</a>) That is a very specific design philosophy: it’s closer to a programmable shell than a guided IDE experience.

Then look at the extension surface area Claude Code exposes:

- <span id="a7b7">**Custom slash commands**: turn recurring interactions into reusable “macros,” stored as Markdown files. (<a href="https://code.claude.com/docs/en/slash-commands?utm_source=chatgpt.com">Claude Code</a>)</span>
- <span id="39c0">**Hooks**: deterministic, user-defined shell commands that run at lifecycle points like tool execution or session start — so you can enforce invariants, run tests, block risky actions, etc. (<a href="https://code.claude.com/docs/en/hooks-guide?utm_source=chatgpt.com">Claude Code</a>)</span>
- <span id="1239">**Subagents**: separate, configurable agent profiles stored as Markdown with YAML frontmatter — effectively named “processes” with their own tool permissions and responsibilities. (<a href="https://code.claude.com/docs/en/sub-agents?utm_source=chatgpt.com">Claude Code</a>)</span>
- <span id="373c">**Plugins**: distributable bundles of commands/agents/hooks/MCP servers — basically “packages” for this environment. (<a href="https://code.claude.com/docs/en/plugins?utm_source=chatgpt.com">Claude Code</a>)</span>
- <span id="8600">**MCP (Model Context Protocol)**: a standardized way to connect the agent to external tools and datasets — an ecosystem-level “device bus.” (<a href="https://code.claude.com/docs/en/mcp?utm_source=chatgpt.com">Claude Code</a>)</span>

If you squint, the shape looks less like “chat with a model” and more like a computer architecture emerging in slow motion:

- <span id="5aa7">An **execution core** (LLM)</span>
- <span id="91eb">A set of **system calls** (tool use)</span>
- <span id="e4f7">A **shell** (Claude Code terminal interface)</span>
- <span id="f5cf">A **device protocol** (MCP)</span>
- <span id="0679">Early **packaging and extension** primitives (plugins)</span>

This is exactly what a new machine looks like before it has a proper programming language.

### 3) We’ve been here before: new machines start with monitors and REPLs

If Claude Code feels like a primitive terminal, it’s worth remembering: early personal and minicomputers really did begin with something like that — often *lower* level.

### The Altair front panel as “physical machine-code REPL”

The **Altair 8800 Operator’s Manual** describes the front panel’s **SINGLE STEP** switch (“implements a single machine language instruction each time it is actuated”) and the **EXAMINE / DEPOSIT** switches for reading and writing memory. (<a href="https://altairclone.com/downloads/manuals/Altair%208800%20Operator%27s%20Manual.pdf?utm_source=chatgpt.com">Altair Clone</a>)
That’s a literal read→write→step→observe loop — just implemented with toggle switches and LEDs.

### Wozmon: a monitor program as the first shell

The Apple-1’s “human interface” was mediated by a monitor program known as the **Woz Monitor (Wozmon)**, stored in a tiny ROM and responsible for letting the machine do anything sensible after reset. (<a href="https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/apple1/Apple_1_Replica_Computer_Manual.pdf?utm_source=chatgpt.com">APPLE2.ORG.ZA — Mirrors</a>)
Wozmon’s command style — examine memory, deposit bytes, run from an address — embodies the same direct-manipulation relationship between human and machine state. (<a href="https://www.sbprojects.net/projects/apple1/wozmon.php?utm_source=chatgpt.com">SB项目</a>)

### ODT: debugging as a command language

DEC’s **Octal Debugging Technique (ODT)** is documented as a tool that lets you examine/modify memory and set breakpoints — essentially a command-driven control plane over execution. (<a href="https://en.wikipedia.org/wiki/On-line_Debugging_Tool?utm_source=chatgpt.com">维基百科</a>)
In some PDP-11 variants, ODT functioned as a substitute for a physical front panel, using a serial console to read/write memory and control execution. (<a href="https://gunkies.org/wiki/QBUS_CPU_ODT?utm_source=chatgpt.com">Gunkies</a>)

### CP/M: even “operating system” grew out of “monitor”

CP/M originally stood for **Control Program/Monitor**, later reinterpreted as **Control Program for Microcomputers**. (<a href="https://en.wikipedia.org/wiki/CP/M?utm_source=chatgpt.com">维基百科</a>) That “monitor” word matters: it signals an era where the OS is still a resident control layer — half shell, half supervisor — rather than the modern abstraction stack we take for granted.

Put those together and a historical pattern snaps into focus:

> *When a new computing form appears, humans start by operating it interactively —
> through monitors, REPLs, and debuggers —
> and only later do languages and toolchains harden into place.*

So when Claude Code feels like “BASIC era terminal computing,” it’s not nostalgia. It’s a developmental stage.

### 4) The misframing of the last few years

The industry’s default lens has been: *models are the new thing, agents are apps built on models.* That lens forces everything into the “ML product” vocabulary: prompting, temperature, chain-of-thought, agent frameworks, etc.

The “Vibe Computer” framing flips that:

- <span id="9d07">Prompting becomes **programming**, just in a pre-language era.</span>
- <span id="45ee">Tools become **I/O** and **syscalls**, not “plugins.”</span>
- <span id="68c8">Memory becomes **state**, not merely “context.”</span>
- <span id="22a8">Evaluation becomes **replay** and **verification**, not only benchmarks.</span>

Claude Code’s own features — hooks, permissions, subagents, plugins, MCP — make this flip hard to ignore, because they are exactly the kinds of control surfaces you build when you’re turning interactive use into dependable systems. (<a href="https://code.claude.com/docs/en/hooks-guide?utm_source=chatgpt.com">Claude Code</a>)

### 5) What’s missing: a “program artifact” for this new machine

A chat transcript is not deployable. A vibe-driven session is not reproducible. An agent that can touch the real world (codebases, infra, money, users) needs the things software has always needed:

- <span id="2216">explicit boundaries (permissions)</span>
- <span id="188e">deterministic guardrails (hooks)</span>
- <span id="c035">tests and evidence</span>
- <span id="b375">audit trails</span>
- <span id="e910">replayable executions</span>

Claude Code’s hooks are a strong example of this evolution: they exist specifically to make certain actions *always happen*, instead of trusting the LLM to remember to do them. (<a href="https://code.claude.com/docs/en/hooks-guide?utm_source=chatgpt.com">Claude Code</a>)

That is the “toolchain wants to exist” signal. The next step is almost certainly some form of **AgentScript** — not necessarily a single language, but a move toward **versioned, testable, replayable artifacts** that describe intent, constraints, and verification in a structured way.

You can see the embryos already:

- <span id="ceaf">A `CLAUDE.md` or project rules file becomes a kind of “firmware.” (<a href="https://www.anthropic.com/engineering/claude-code-best-practices?utm_source=chatgpt.com">Anthropic</a>)</span>
- <span id="73d8">Slash commands become a macro library. (<a href="https://code.claude.com/docs/en/slash-commands?utm_source=chatgpt.com">Claude Code</a>)</span>
- <span id="2b67">Subagents become specialization and isolation. (<a href="https://code.claude.com/docs/en/sub-agents?utm_source=chatgpt.com">Claude Code</a>)</span>
- <span id="a8bd">Plugins become packaging and distribution. (<a href="https://code.claude.com/docs/en/plugins?utm_source=chatgpt.com">Claude Code</a>)</span>
- <span id="3e08">MCP becomes a standardized peripheral ecosystem. (<a href="https://www.theverge.com/2024/11/25/24305774/anthropic-model-context-protocol-data-sources?utm_source=chatgpt.com">The Verge</a>)</span>

These are exactly the building blocks that, historically, precede a stable programming model.

### 6) A simple litmus test: are we still in the “monitor era”?

Here’s a practical way to ground the whole idea:

- <span id="809a">If you can only reproduce behavior by re-enacting a conversation, you’re in the monitor era.</span>
- <span id="2688">If you can reproduce behavior by running a versioned artifact (spec/script/tests/replay), you’re crossing into “software.”</span>
- <span id="86e1">If permissions, auditing, and failure recovery are default semantics, you’re building an OS.</span>

Vibe coding is compelling because it makes the monitor era feel powerful. It’s also dangerous because it tempts us to ship monitor-era practices into production.

### Closing: why “the birth of the Vibe Computer” is the right metaphor

The phrase “On the eve of the birth of the Vibe Computer” works because it captures a precise moment in the lifecycle of a new machine:

1.  <span id="a24f">The execution core becomes capable enough to be useful.</span>
2.  <span id="814c">Humans interface with it interactively (REPL/monitor).</span>
3.  <span id="6760">Toolchains and languages emerge to make it reliable.</span>
4.  <span id="9168">Software practices re-form around the new runtime.</span>

Claude Code’s terminal feel is stage (2). Vibe coding is a cultural name for what stage (2) feels like when the interpreter suddenly got powerful.

If this framing is right, the most important question isn’t “which model is best?” but:

> *What are the* languages, runtimes, and operating disciplines*
> that will make this new computer dependable?*

That’s the real work of the next chapter.

- <span id="a978"><a href="https://x.com/karpathy/status/1886192184808149383?lang=en&amp;utm_source=chatgpt.com">X (formerly Twitter)</a></span>
- <span id="71c0"><a href="https://simonwillison.net/2025/Mar/19/vibe-coding/?utm_source=chatgpt.com">Simon Willison’s Weblog</a></span>
- <span id="2ea7"><a href="https://www.anthropic.com/engineering/claude-code-best-practices?utm_source=chatgpt.com">Anthropic</a></span>
- <span id="eb59"><a href="https://code.claude.com/docs/en/hooks-guide?utm_source=chatgpt.com">Claude Code</a></span>
- <span id="0677"><a href="https://code.claude.com/docs/en/mcp?utm_source=chatgpt.com">Claude Code</a></span>
- <span id="3c0b"><a href="https://altairclone.com/downloads/manuals/Altair%208800%20Operator%27s%20Manual.pdf?utm_source=chatgpt.com">Altair Clone</a></span>
