# Multi-Modal Medical AI Agent

## Objective

Build an AI agent that can process multi-modal medical inputs, use tools dynamically, manage context efficiently, and store structured outputs.

---

## Scenario

You are building a **Medical AI Assistant Agent** that analyzes patient cases using MRI descriptions and text symptoms. It provides structured insights and can search for nearby hospitals.

---

## Inputs

- **Text input** _(required)_
- **MRI/scan** _(image or description)_

---

## Tools (Mandatory)

1. **Search Tool**
2. **CSV Storage Tool**

> The agent must decide when to use tools.

---

## Agent Capabilities

- Analyze inputs
- Generate case summary
- Provide safe medical insights
- Handle hospital search requests
- Store structured case data

---

## Advanced Requirements

Implement **message trimming** and **summarization memory** for context optimization.

---

## Constraints

> ⚠️ Do **not** provide diagnosis or prescriptions.
> Always include disclaimer:
>
> _"This is not a medical diagnosis. Consult a doctor."_
