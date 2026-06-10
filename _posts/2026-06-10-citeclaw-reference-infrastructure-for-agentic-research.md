---
layout: post
title: "CiteClaw: Reference Infrastructure for Agentic Research"
date: 2026-06-10T00:00:00.000+08:00
categories: [Blog]
tags: [agentic-ai, research-tools, citations, mcp, skills, zotero]
excerpt: "CiteClaw combines citation lookup, PDF metadata, Zotero, BibTeX, CSL, batch processing, MCP tools, and an agent skill into reference infrastructure for research agents."
---

A research agent that cannot hold its references cannot really write.

It can draft fluent paragraphs. It can summarize a paper. It can sketch a
survey outline, group methods by theme, and produce something that looks like a
literature review. But the fragile part appears at the bottom of the page: the
references.

Which work does this sentence actually depend on? Is that DOI the published
version or an older preprint? Did the PDF title match the paper the agent
thought it was reading? Can the generated BibTeX compile? Is the same paper
appearing twice under an arXiv key and a venue key? If a user asks where a claim
came from three days later, can the agent reconstruct the path from text back
to source?

This is why I built [CiteClaw](https://github.com/trotsky1997/citeclaw).

Not because citation formatting is glamorous. It is not. Citation work is full
of malformed DOI strings, publisher redirects, partial HTML metadata, PDF-only
pages, rate limits, duplicate records, broken BibTeX, half-synced Zotero
libraries, and local files whose only useful clue is a title printed on the
first page.

But that is exactly why it matters. Reliable research agents need boring
machinery. They need tools that turn messy identifiers into stable bibliography
state. They need a way to ask for a citation, inspect the result, batch the
process, recover when one source fails, and hand the final record to LaTeX,
Markdown, Zotero, or another agent.

Citation is infrastructure, not decoration.

<figure class="graf graf--figure">
<img src="/images/blog/citeclaw-reference-infrastructure/reference-pipeline.svg" alt="Diagram showing CiteClaw turning DOI, URL, arXiv, PDF, Zotero, and title inputs into normalized citation records, exports, and agent tools." width="1200" height="640" loading="lazy" decoding="async">
<figcaption>CiteClaw treats references as a pipeline: normalize the input, resolve metadata, enrich and verify, then expose the result through CLI, HTTP, batch, Zotero, MCP, and agent skill surfaces.</figcaption>
</figure>

## The Reference Problem Is Not Formatting

The easy version of the problem is:

```bash
npx citeclaw cite bibtex 10.1145/3368089.3409741
```

Turn an identifier into BibTeX. Useful, but not enough.

The real version of the problem starts when the identifier is not clean. A user
may paste an arXiv page, a DOI URL, a publisher page, a title, a local PDF, an
OpenURL resolver result, a Zotero item key, or a mixed text file of all of the
above. Some records have enough metadata in Crossref. Some are easier to
resolve through Semantic Scholar or OpenAlex. Some URLs need Zotero
translators. Some PDFs need local probing before the agent even knows what work
it is holding. Some batch jobs should fail partially but keep moving, because a
survey bibliography with 180 candidates should not die on entry 37.

For a human, these are annoying edge cases. For an agent, they are operational
failure modes.

An agent without citation infrastructure tends to do one of three bad things:

- It invents a plausible citation from memory.
- It over-trusts the first metadata source it touches.
- It produces a bibliography that looks complete but cannot survive compile,
  deduplication, or manual audit.

CiteClaw is built around the opposite habit: start from the most canonical
identifier available, resolve metadata through explicit sources, normalize the
result into a Zotero-like item shape, export through known formats, and keep the
workflow callable from both scripts and agents.

That sounds mundane. It is mundane. It is also the difference between a writing
agent and a research assistant that can be held accountable.

## One Pipeline, Several Surfaces

CiteClaw has two main runtime faces.

The first is the CLI:

```bash
npx citeclaw citoid bibtex "https://arxiv.org/abs/1706.03762"
npx citeclaw crossref "10.1021/acsomega.2c05310" --json
npx citeclaw semantic-scholar paper-search "transformer attention" --limit 5
npx citeclaw cite-pdf ./paper.pdf
npx citeclaw batch --op cite --format bibtex --in ./ids.txt --out-jsonl ./result.jsonl
```

The second is a Citoid-compatible HTTP service, derived from the same tradition
as Wikimedia's Citoid: give it a format and a query, and it returns citation
data in a requested shape such as BibTeX, Zotero JSON, MediaWiki, or Wikibase.

Those two surfaces share the same core pipeline:

1. Normalize the input.
2. Classify it as DOI, URL, arXiv, PMID, PMCID, ISBN, QID, local PDF, or a
   search query.
3. Resolve metadata from the strongest available source.
4. Fall back across Zotero translators, Crossref, Semantic Scholar, OpenAlex,
   PubMed, webpage metadata, PDF signal extraction, or Wayback-assisted URL
   scraping where configured.
5. Normalize the result into a stable item schema.
6. Export it into the format the user or downstream system needs.

The important part is not that CiteClaw knows many services. A thin wrapper can
call many services. The important part is that the services are arranged into a
recoverable reference workflow. The same request can start as a DOI, move
through a publisher URL, fall back to Crossref, enrich with another source, and
still end up as a record that a batch job or agent can reason about.

The boundary between "citation lookup" and "reference workflow" is exactly
there. Lookup returns a string. Workflow preserves enough structure for the next
step to make sense.

## MCP: References as Agent Tools

The most interesting surface is not the command line. It is MCP.

CiteClaw can run as a small stdio MCP server:

```bash
npx citeclaw mcp
```

That changes the shape of the tool. A human CLI is episodic: run a command,
copy the output, paste it somewhere. An MCP server makes citation work part of
the agent's operating environment. The agent can call a `cite` tool for a DOI,
call `cite_pdf` for a local file, call `fetch_pdf` when it needs the paper
artifact, or call lower-level lookup tools when it is building a larger
bibliography.

This matters because bibliography work is rarely a one-shot operation inside an
agentic loop.

A real research agent may need to:

- collect candidate papers for a topic;
- separate core citations from supplemental coverage;
- resolve title-only candidates to canonical identifiers;
- generate BibTeX for the stable set;
- fetch PDFs for the papers that need reading;
- deduplicate arXiv and venue versions;
- add or update Zotero records;
- write a literature map grouped by method, benchmark, domain, or claim;
- compile a LaTeX draft and repair missing citation keys.

The agent should not improvise that process from prose every time. It should
have a tool surface that lets it manipulate references as state.

MCP turns CiteClaw from a utility into a harness component.

## The Skill Is the Policy Layer

Tools give an agent hands. A skill gives it habits.

That is why CiteClaw also includes a reusable agent skill:
[`citeclaw-bibliography-curation`](https://github.com/trotsky1997/citeclaw/blob/master/.skills/citeclaw-bibliography-curation/SKILL.md).
The CLI and MCP server expose actions: cite this DOI, fetch this PDF, call
Crossref, query Semantic Scholar, run a batch. The skill tells the agent how to
conduct itself when those actions become a research workflow.

It encodes the rules that are easy for humans to know and easy for agents to
forget:

- classify the task first: single citation, main bibliography, supplemental
  bibliography, or literature map;
- prefer canonical identifiers in order: DOI, arXiv page, anthology page,
  official project or benchmark page, and only then title search;
- use CiteClaw where it is strongest, but switch to web search or manual
  verification when APIs rate-limit or return weak title-only matches;
- keep the main bibliography small and argument-driven;
- put broad coverage into a supplemental bibliography or topic-wise literature
  map;
- deduplicate by DOI, arXiv ID, and normalized title;
- verify that the draft compiles and that every cited key exists.

This is the part I want to emphasize most: the skill is not documentation for a
human operator. It is a compact operating procedure for an agent. It turns
"please expand this bibliography" from an open-ended writing prompt into a
stateful loop: gather candidates, resolve identifiers, generate metadata,
deduplicate, split core from supplemental coverage, and validate the result.

The difference is subtle but important. Without the skill, CiteClaw is a strong
set of citation tools. With the skill, CiteClaw becomes a repeatable
bibliography curation behavior that an agent can carry from project to project.

## Zotero Is State, Not Just Storage

Zotero is already where many researchers keep their long-lived memory of papers.
CiteClaw treats that as part of the workflow rather than an afterthought.

The CLI includes commands for logging in with Zotero API credentials, querying a
library, dumping items, citing one item, adding or updating records, managing
notes, filling missing citation keys, suggesting duplicates, enriching records,
exporting Markdown, watching queries, and enabling a persistent safe mode for
write operations.

That sounds like a lot of commands, but the product idea is simple: the
bibliography should not live only in a generated `.bib` file at the end of a
run. It should be able to round-trip through the researcher's actual reference
manager.

For agentic research this is especially important. A local bibliography file is
good for a paper. A Zotero library is closer to long-term research memory. If an
agent helps with several related drafts over several weeks, it should be able to
reuse and repair that memory instead of recreating a new pile of citations every
time.

The goal is not to hide human review. It is to make human review land on a
structured object: this item, this DOI, this generated key, this note, this
duplicate candidate, this missing field.

## Why the Fallbacks Matter

Every citation source has a personality.

Crossref is excellent when a DOI is clean and publisher metadata is available.
Semantic Scholar is useful for paper search, arXiv-like workflows, author and
paper graph queries, and modern ML literature. OpenAlex gives another broad
scholarly metadata surface. Zotero translators are often the most practical way
to pull structured metadata from real webpages. PubMed and PMC matter for
biomedical identifiers. Webpage scraping is the last mile for pages that are
not clean academic records but still need to be cited. PDF probing matters when
the only artifact in hand is a file on disk.

None of these sources should be treated as an oracle.

That is why the pipeline is designed around source composition rather than
source worship. Prefer canonical identifiers when they exist. Use DOI over
title search. Use an official arXiv or anthology page over a vague title. Treat
curated lists as recall, not truth. Keep API output machine-readable when the
next step is another program. Batch the dirty work, but preserve enough logs and
structured output to diagnose failures.

This is the same principle I care about in agent harness design more broadly:
the model should not be trusted to remember procedure when the procedure can be
made explicit. Reference handling is full of crisp procedural rules. Build them
into the tool.

## The Smallest Useful Research Agent Loop

With CiteClaw, a minimal reference-aware agent loop can look like this:

1. The user asks for a section or survey.
2. The agent extracts candidate claims and candidate papers.
3. For each candidate, it resolves a canonical identifier.
4. CiteClaw generates structured citation data.
5. The agent deduplicates by DOI, arXiv ID, or normalized title.
6. The main bibliography stays small and argument-driven.
7. The long tail goes into a supplemental bibliography or literature map.
8. The draft compiles, and missing keys become concrete repair tasks.

This is not "the agent writes citations." It is more precise than that. The
agent maintains bibliography state while it writes.

That distinction matters. Writing is continuous, but references are a database.
If the database is unstable, the writing is unstable. If the database is
recoverable, the writing can be audited.

## What CiteClaw Is For

CiteClaw is useful for small things:

```bash
npx citeclaw cite mediawiki https://arxiv.org/abs/1706.03762
npx citeclaw cite-style --plain --locale zh-CN "10.1145/3368089.3409741"
```

It is also useful for larger bibliography work:

```bash
npx citeclaw batch --op cite --format bibtex --in ./candidate_ids.txt --out-jsonl ./citations.jsonl
npx citeclaw translators sync
npx citeclaw styles sync
```

And it is useful as an agent tool:

```bash
npx citeclaw mcp
```

But the tool surface is only half the story. The skill is what tells the agent
how to use those tools without turning a bibliography into a pile of loosely
related commands. It is the difference between calling `citeclaw` and curating a
research bibliography.

The same project supports DOI and URL citation, arXiv resolution, PDF-based
citation, PDF fetching, OpenURL resolution, Crossref lookup, Semantic Scholar
Graph API access, Zotero library operations, CSL rendering, translator/style
sync, batch jobs, MCP tool calls, and the `citeclaw-bibliography-curation`
skill.

That is a long list, but the center is small:

**give research agents a reliable grip on references.**

Not perfect truth. Not full scholarly judgment. Not a replacement for reading
the paper. Just a reference layer that is structured enough for agents to use
and explicit enough for humans to inspect.

That is the kind of boring infrastructure I want more of. As agents become
better at drafting, reviewing, coding, and searching, the bottleneck shifts from
"can it produce text" to "can it preserve the chain of responsibility behind
that text." References are one of the oldest accountability mechanisms in
research. They should not be an afterthought in agentic systems.

CiteClaw is my attempt to make that layer callable.

## References

[1] [CiteClaw on GitHub](https://github.com/trotsky1997/citeclaw)

[2] [CiteClaw architecture notes](https://github.com/trotsky1997/citeclaw/blob/master/DOCUMENT.md)

[3] [CiteClaw bibliography curation skill](https://github.com/trotsky1997/citeclaw/blob/master/.skills/citeclaw-bibliography-curation/SKILL.md)

[4] [CiteClaw npm package](https://www.npmjs.com/package/citeclaw)

[5] [Model Context Protocol](https://modelcontextprotocol.io/)
