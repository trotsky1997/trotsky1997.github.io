---
layout: post
title: "From Pointers to Footnotes: Why Agents will be “Reference-First”"
date: 2026-01-25T11:59:52.685Z
categories: [Blog]
tags: [medium, agentic-ai]
imported_from: medium
excerpt: "If you’ve built anything non-trivial with LLMs, you’ve felt the temptation: just paste more context. Another chunk. Another thread. Another…"
original_medium_url: "https://medium.com/@di-zhang-fdu/from-pointers-to-footnotes-why-agents-will-be-reference-first-88d0e9730e37"
---

<figure id="3fa5" class="graf graf--figure graf-after--h3">
<img src="https://cdn-images-1.medium.com/max/800/0*2g_CMRAu43hMMy77" />
</figure>

If you’ve built anything non-trivial with LLMs, you’ve felt the temptation: **just paste more context.** Another chunk. Another thread. Another doc. Another “final final” spec.

It works — until it doesn’t.

Costs climb, prompts sprawl, and reliability gets weirdly brittle. You start debugging *where* the important sentence sits, not *what* it says. And you realize you’re treating the context window like a warehouse when it’s really a workbench.

This is where an old idea returns: **reference-first** thinking.

Not the buzzword kind. The systems-history kind.

Because we’ve been here before — back when memory was measured in kilobytes, and operating systems had to be built on machines like the PDP-11. That era didn’t solve scarcity by “remembering more.” It solved it by inventing better **ways to point**.

### The recurring problem: scarce workspaces

There’s a reason “workbench” is the right metaphor. In cognitive science, *working memory* isn’t long-term storage; it’s the limited-capacity space where you **hold a few things and manipulate them**. (<a href="https://pubmed.ncbi.nlm.nih.gov/1736359/?utm_source=chatgpt.com">PubMed</a>)

And it’s small. Reviews of working-memory capacity often put the core limit around **3–5 chunks** under many conditions. (<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2864034/?utm_source=chatgpt.com">PMC</a>)

That’s not a flaw — it’s a design constraint. Humans compensate with **external memory**: notebooks, libraries, indexes, footnotes. We don’t carry the whole book in our heads; we remember *how to find it*.

LLM agents are facing the same constraint in silicon: the context window is a **limited working set**. You can make it bigger, but you still need to manage it like a scarce resource.

### Act I: Pointers weren’t a “C quirk” — they were a scarcity technology

C didn’t “invent” addresses. Hardware has always lived in an addressable world. What C did — famously and unapologetically — was to expose that reality as a programming model.

Dennis Ritchie’s own account of C’s development is inseparable from Unix and the PDP-11 era. He describes early Unix work moving onto the PDP-11 and the evolution from B toward what became C. (<a href="https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.html?utm_source=chatgpt.com">Nokia Corporation | Nokia</a>)

The deeper point: in that environment, copying data was expensive, and identity mattered. A pointer is a compact way to say:

> *“Not this thing — ****where this thing lives****.”*

This is reference-first as an engineering instinct:

- <span id="1123">Don’t ship the payload if you can ship an address.</span>
- <span id="9618">Don’t duplicate state if you can share a reference.</span>
- <span id="f543">Don’t confuse “same value” with “same thing.”</span>

In other words: **addressability** is how you scale when the workspace is tiny.

### Act II: Unix turns reference-first into a universal interface (the file descriptor)

If pointers are the reference primitive for memory, **file descriptors (FDs)** are the reference primitive for system resources.

Here’s the key sentence from the Linux man-pages (which is also the cleanest conceptual definition I know):

> *“A file descriptor is a reference to an open file description.” (*<a href="https://man7.org/linux/man-pages/man2/open.2.html?utm_source=chatgpt.com"><em>man7.org</em></a>*)*

And `open()` doesn’t just “open a path.” It creates an *open file description*—an entry in a system-wide table that stores state like file offset and status flags. (<a href="https://man7.org/linux/man-pages/man2/open.2.html?utm_source=chatgpt.com">man7.org</a>)

The killer detail is what comes next: this reference is stable even if the filesystem name changes. The man-page notes that the FD’s reference is “unaffected” if the path is removed or modified to refer to a different file. (<a href="https://man7.org/linux/man-pages/man2/open.2.html?utm_source=chatgpt.com">man7.org</a>)

That’s a systems definition of **identity**:

- <span id="3d69">**Path** is a label you can rewrite.</span>
- <span id="5ed9">**FD** is a handle to a specific open-instance state.</span>

Unix didn’t make you carry the file around. It gave you a small integer — an ID you can pass, store, duplicate, hand off, and compose into pipelines.

That’s not an implementation detail. It’s a design philosophy:

> ***Make the expensive thing live elsewhere. Pass around cheap, stable references.***

### Act III: LLMs live in a “value world” (and that’s why they drift)

Now swing the mirror to LLM agents.

An LLM doesn’t naturally have “addresses.” It has token sequences and learned associations. The default mode is **value-first**:

- <span id="c3ad">“Put the text in the context.”</span>
- <span id="c915">“Summarize the text into the context.”</span>
- <span id="3423">“Rephrase the text into the context.”</span>

Everything becomes *content*, and content gets duplicated. That’s why agent memory systems often degrade into:

- <span id="f61e">re-summarizing summaries,</span>
- <span id="dd5f">losing provenance,</span>
- <span id="d934">blending sources,</span>
- <span id="e2e7">and slowly drifting.</span>

Even if you buy a bigger desk (longer context), there’s a second problem: models don’t necessarily use long context robustly.

The paper **“Lost in the Middle”** tests long-context models on tasks where the relevant information is at different positions in the prompt. They find performance is often best when the key information is at the beginning or end — and can degrade sharply when it’s in the middle. (<a href="https://arxiv.org/abs/2307.03172?utm_source=chatgpt.com">arXiv</a>)

So “just add more” fails twice:

1.  <span id="263d">it’s expensive and messy, and</span>
2.  <span id="d961">it’s not even reliably utilized.</span>

A bigger desk is not a library.

### Act IV: Reference-first is the missing primitive for agents

This is why serious agent design trends toward what you called “use memory like a library”:

- <span id="926c">**Context = workbench / working set**</span>
- <span id="2440">**Memory = external store**</span>
- <span id="d20d">**References = the bridge**</span>

In research, retrieval-augmented generation (RAG) is one prominent expression of this idea: combine parametric memory (the model’s weights) with **explicit non-parametric memory** (an external index), and fetch what you need at generation time. (<a href="https://arxiv.org/abs/2005.11401?utm_source=chatgpt.com">arXiv</a>)

What’s especially telling is *why* the RAG paper motivates the approach. It explicitly calls out **provenance** and the difficulty of **updating world knowledge** as core open problems for pure parametric models. (<a href="https://arxiv.org/abs/2005.11401?utm_source=chatgpt.com">arXiv</a>)

That’s reference-first, stated plainly:

- <span id="8817">If you need provenance, you need **links back to sources**.</span>
- <span id="154a">If you need updates, you need knowledge to live in a place you can **swap, version, and re-index**, not re-train into weights.</span>

This is how “pointers to footnotes” becomes more than a metaphor:

- <span id="a559">Unix handles let you track *which* open resource instance you’re using.</span>
- <span id="9eba">Agent references let you track *which* source you’re grounding on.</span>

A citation is a human-friendly FD.

### The reference-first pattern (for Medium readers who want something actionable)

Here’s the minimal architecture shift:

### 1) Store handles, not payloads, in the workbench

Instead of pasting full documents into context, carry compact references:

- <span id="c046">`doc_id`, `chunk_id`, `message_id`</span>
- <span id="f1f7">`version`, `timestamp`</span>
- <span id="2e23">`hash` or signature for integrity</span>

### 2) Make dereferencing a first-class operation

A reference isn’t useful unless it’s reliably dereferenceable:

- <span id="e605">fetch the exact chunk,</span>
- <span id="27be">retrieve by version,</span>
- <span id="2e4c">with consistent permissions.</span>

### 3) Treat “verification” as part of memory, not a bonus

Unix FDs are meaningful because they refer to something real and stable. Similarly, agent references should support:

- <span id="6ab9">provenance (where did this come from?)</span>
- <span id="9638">integrity (did it change?)</span>
- <span id="d92d">reproducibility (can I get the same thing tomorrow?)</span>

### 4) Keep a small “working set” on the desk

Working memory isn’t a database. It’s a staging area:

- <span id="e861">the current plan,</span>
- <span id="25dd">the current constraints,</span>
- <span id="aed0">the current open questions,</span>
- <span id="c67c">plus a handful of references.</span>

That’s it.

### A useful warning: similarity is not identity

One of the most common agent design mistakes is treating vector similarity like an address.

Similarity gives you *neighbors*, not *the thing itself*. Two passages can embed close but mean different things. Or the same source can drift after edits, leaving your “reference” pointing to a different semantic region over time.

Unix solved this by separating labels (paths) from handles (FDs). (<a href="https://man7.org/linux/man-pages/man2/open.2.html?utm_source=chatgpt.com">man7.org</a>) Agent memory needs a similar separation:

- <span id="ece7">embeddings help you *find candidates*,</span>
- <span id="3de0">but stable references decide *what you actually mean*.</span>

### Why this is a “systems history” story, not an AI fad

Once you see the pattern, it stops being about LLMs.

When the workspace is scarce, systems evolve toward **addressability**:

- <span id="1215">C makes memory addressable.</span>
- <span id="3e72">Unix makes resources handleable.</span>
- <span id="ae73">Humans make knowledge citeable.</span>
- <span id="6f58">Agents will make context manageable by becoming reference-first.</span>

Not because it’s elegant, but because it’s what survives scale.

And the evidence is already visible:

- <span id="c947">Long-context models don’t consistently exploit “more” context well. (<a href="https://arxiv.org/abs/2307.03172?utm_source=chatgpt.com">arXiv</a>)</span>
- <span id="c20e">Retrieval-based approaches explicitly target provenance and updatability. (<a href="https://arxiv.org/abs/2005.11401?utm_source=chatgpt.com">arXiv</a>)</span>
- <span id="19a7">Even in human cognition, the workbench is inherently limited. (<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2864034/?utm_source=chatgpt.com">PMC</a>)</span>

### Closing: Context is a workbench; memory is a library

If you want a single line to end the piece (and to guide your agent designs):

**Don’t make your agent “remember more.” Make it “point better.”**

That’s the throughline from pointers to file descriptors to footnotes.

And it’s why reference-first isn’t a technique — it’s a re-discovery of an old systems truth.
