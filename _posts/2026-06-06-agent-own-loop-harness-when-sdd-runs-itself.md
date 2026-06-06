---
layout: post
title: "Agent-Own Loop Harness: When SDD Runs Itself"
date: 2026-06-06T00:00:00.000+08:00
categories: [Blog]
tags: [agentic-ai, harness-engineering, openspec, sdd]
excerpt: "A small practice report on turning OpenSpec from a human-attended workflow into an agent-owned loop harness."
---

Over the past two days I have been playing with another small practice pattern.
I call it the **agent-own loop harness**.

The name came out of using OpenSpec. OpenSpec is a lightweight spec-driven
development framework for AI coding assistants [[1]](#references). Its own
docs frame the core job as helping a human and an AI coding assistant agree on
what to build before code is written [[2]](#references). After initialization,
that agreement becomes concrete project structure: long-lived specs, proposed
changes, proposals, delta specs, design notes, and implementation tasks
[[2]](#references).

That structure is useful, but the default usage pattern can feel strangely
attended. A person describes the desired change, the agent writes a proposal,
then the system asks for the next step. The agent writes the specs, then the
person says next. The agent writes the design, then the person says next. The
agent writes the tasks, then the person says next again.

That is not really an autonomous loop. It is a user-owned loop with an agent
inside it.

The human is not contributing much domain judgment at every step. In the boring
middle of the process, the human is mostly acting as a clock pulse. The user is
there to say "continue", to pick the obvious active change, to approve a
non-controversial next artifact, or to tell the agent to run validation after
the process itself has already made validation the next required move.

That is the irritating part: the workflow is already procedural enough for an
agent to run, but it is still packaged as if a human has to stand beside it.

So I built a no-human-in-the-loop version.

<figure class="graf graf--figure">
<img src="/images/blog/agent-own-loop-harness/user-own-vs-agent-own.svg" alt="Diagram comparing a user-owned harness, where human attention clocks each step, with an agent-owned harness, where the agent operates the loop from intent to done." width="1200" height="720" loading="lazy" decoding="async">
<figcaption>User-own harness keeps the human inside the event loop. Agent-own harness moves routine control into the agent.</figcaption>
</figure>

The core observation is simple. OpenSpec's slash-command flow is not magic. It
is a set of procedural scripts for an agent. Underneath it, the CLI already
exposes the useful machine surfaces. The official docs even separate
non-interactive setup from attended setup through `openspec init --tools ...`,
which is exactly the kind of affordance an unattended loop needs [[3]](#references):

- `status` tells the agent which artifact is ready, blocked, or done.
- `instructions` tells the agent what to read, what to write, and where to write
  it.
- `validate --strict` gives the agent a correction oracle.
- `archive -y` closes the loop without waiting for a confirmation prompt.

Once those pieces are treated as a state machine, the person does not need to
stand in the middle saying next. The agent can own the loop:

1. Derive the change name from the user's wish.
2. Create the OpenSpec change.
3. Read the state.
4. Generate the ready artifact.
5. Re-read the state.
6. Validate.
7. Implement the tasks.
8. Mark tasks done as work is completed.
9. Validate again.
10. Archive the change.

<figure class="graf graf--figure">
<img src="/images/blog/agent-own-loop-harness/openspec-state-machine.svg" alt="OpenSpec state machine diagram showing status, instructions, artifact writing, validation, task application, and archive." width="1200" height="640" loading="lazy" decoding="async">
<figcaption>Once the CLI is treated as a state machine, "next" becomes a state transition rather than a human duty.</figcaption>
</figure>

The user says what they want. The agent maintains the spec-driven development
loop.

That shift sounds small, but it changes the shape of the product. In the
attended version, the user is still the harness owner. The user holds the
workflow in their head, knows the next command, resolves the pause, and restarts
the process whenever it stops. The agent is powerful, but it is still being
pulled through a human-operated machine.

In the agent-own version, the loop becomes part of the agent's operating body.
The harness tells the agent how to observe state, choose the next legal move,
write durable artifacts, test its own work, and close the change. The human is
not removed from intent or accountability. The human is removed from the
low-value attendance layer.

That is the distinction I now care about:

**User-own harness:** the human operates the loop, and the agent performs steps.

**Agent-own harness:** the agent operates the loop, and the human supplies
intent.

OpenSpec is a good example because the shape is so explicit. It already has
proposal, specs, design, tasks, apply, validation, and archive. It already has
machine-readable state. It already has precise validation failures that can be
used for self-correction. The missing move is not a new planning theory. The
missing move is to stop treating procedural agent instructions as human UX.

This also explains why some "agent workflows" feel heavier than they should.
They are often built as user-owned harnesses. The system gives the user a
beautiful sequence of buttons, commands, and checkpoints, but the user is still
the scheduler. The agent may be writing code, opening files, running tests, and
repairing failures, but the user's attention is still the event loop.

That will not last.

Complex attended agent operation modes will keep folding inward. Anything that
is deterministic enough to be scripted, stateful enough to be inspected, and
recoverable enough to be validated is a candidate to move from user-owned
harness to agent-owned harness. The person should not need to babysit a loop
whose next state is already machine-readable.

The same pattern shows up outside OpenSpec. A coding agent should not need a
person to remind it to inspect git status before editing. A deployment agent
should not need a person to say "check the logs now" after a failed rollout. A
research agent should not need a person to say "compare the sources" when source
conflict is already visible in the evidence table. These are harness behaviors.
At first they are explicit procedures. Then they become agent-owned loops.

Eventually, some of them may become model intuition.

<figure class="graf graf--figure">
<img src="/images/blog/agent-own-loop-harness/boundary-migration.svg" alt="Layered diagram showing explicit harness procedure becoming agent-owned loop behavior and later model intuition through post-training." width="1200" height="620" loading="lazy" decoding="async">
<figcaption>The boundary moves: first the harness teaches the agent how to operate, then repeated operation becomes a candidate for post-training.</figcaption>
</figure>

That is the interesting long-term direction: **harness/post-training co-design**.
Today, a harness makes an agent behave better by surrounding the model with
state machines, tools, validators, memory, and recovery rules. Tomorrow, the
best repeated harness patterns can become training data, evaluation targets, and
eventually something closer to default behavior. The harness teaches the model
what good operation feels like. Post-training makes some of that operation feel
native.

That does not mean the harness disappears. It means the boundary moves.

Early versions of a capability often live outside the model as explicit
scaffolding. The harness says: read status, follow dependencies, write the next
artifact, validate strictly, repair the named failure, continue. After enough
exposure, the model may begin to internalize the rhythm. It starts to expect
state before action, durable artifacts before implementation, validation before
claiming done, and archival after completion.

The external loop becomes an internal habit.

This is why I think "agent-own loop harness" is a useful phrase. It names the
middle layer between a human-driven workflow and a model that simply knows how
to conduct itself. It is not just automation. It is a transfer of operational
ownership.

I packaged this specific OpenSpec loop as a small reusable skill:
`openspec-agent-sdd` [[4]](#references). The repository is intentionally tiny:
one `SKILL.md` file with the operational loop, plus a README and license. That
shape matters. The point is not to create another framework around OpenSpec,
but to preserve the agent procedure in the smallest shareable unit: state
inspection, artifact generation, strict validation, task application, and
non-interactive archive.

The user should be able to make a wish:

I need this feature.

I need this post.

I need this investigation.

Then the agent should drive the appropriate loop until it reaches a real stop:
completed, validated, archived, or genuinely blocked.

No ceremony. No "next" button as a human obligation. No person standing inside
the event loop.

Just intent at the boundary, and an agent-owned harness doing the work.

## References

[1] [OpenSpec official site](https://openspec.dev/)

[2] [OpenSpec Getting Started](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md)

[3] [OpenSpec Supported Tools: Non-Interactive Setup](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md#non-interactive-setup)

[4] [openspec-agent-sdd: Agent skill for running OpenSpec SDD end-to-end without human-in-the-loop next prompts](https://github.com/trotsky1997/openspec-agent-sdd)
