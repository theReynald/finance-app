---
description: "Use when: generating quiz questions, knowledge checks, or test-my-understanding prompts about a codebase or topic"
---

# Quiz Format Guidelines

## Structure
- Generate exactly **10 questions** per quiz unless otherwise specified
- Each question must target a **different aspect** (e.g., state management, props, hooks, utilities, styling, data flow, rendering, performance, tooling, data structures)
- Mix difficulty: ~4 recall, ~4 understanding, ~2 reasoning ("why was this chosen?")

## Question Format
- Use **multiple choice** (A–D) for every question
- Keep questions concise — one clear concept per question
- Include at least one plausible distractor per question that tests a common misconception
- Number questions sequentially (1–10)

## Answer Flow
1. Present all questions first — do **not** reveal answers inline
2. Wait for the user to submit their answers
3. Score the results (e.g., "7/10")
4. Show each correct answer with a **brief explanation referencing the actual code** (file + line when possible)
5. Offer to re-quiz on any missed questions
