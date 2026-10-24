# AZ-Ready

### Your Personal AZ-900 Exam Coach

**Know what you know. Fix what you don't.**

AZ-Ready is an unofficial, learner-focused study companion for the Microsoft Azure Fundamentals (AZ-900) exam. It helps learners assess their understanding, receive immediate explanations, identify weaker learning areas, and focus practice where it is most needed.

> **Disclaimer:** AZ-Ready is an independent project and is not affiliated with, endorsed by, or sponsored by Microsoft. It does not contain or reproduce real Microsoft certification exam questions.

## Live Prototype

https://az-cloud-quest-companion.lovable.app/dashboard

## Project Repository

https://github.com/haron2000/screenshot-exact-match

## The Problem

Certification preparation can become inefficient when learners do not know which concepts they understand well and which ones require more attention.

Generic practice can provide a score, but a score alone does not always answer the learner's most useful question:

**What should I study next?**

## The Solution

AZ-Ready turns practice into a focused learning loop:

**Assess → Understand → Identify Weaknesses → Practise → Improve**

The application combines diagnostic assessment, instant feedback, performance tracking, and targeted practice in one simple workflow.

## Core Features

### 1. Diagnostic Assessment
A 15-question diagnostic assesses the learner across three AZ-900 learning areas.

### 2. Instant Learning Feedback
After answering a question, learners can see:
- Whether their answer was correct
- Why the answer is correct
- A key concept to remember
- A common confusion to watch for

### 3. Weakness Detection
Performance is analysed across the learning areas to help identify where the learner needs more practice.

### 4. Targeted Practice
The practice experience prioritises weaker areas and previously missed questions instead of relying only on random repetition.

### 5. Readiness Dashboard
Learners can review their overall readiness, area performance, and progress from the dashboard.

### 6. Topic Exploration
Learners can explore AZ-900 learning topics and use them to guide further study.

## What Makes AZ-Ready Different?

The core idea is not simply to provide more questions.

AZ-Ready uses the learner's answers to help answer:

> **"What should I work on next?"**

The current personalisation engine is intentionally lightweight and explainable. It uses assessment performance and question-level results to guide targeted practice rather than claiming to be a fully autonomous AI tutor.

## Learning Flow

```text
              ┌───────────────┐
              │   Diagnostic  │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │    Feedback   │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │    Results    │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │ Weakness      │
              │ Detection     │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │    Targeted   │
              │    Practice   │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │    Progress   │
              └───────────────┘
```

## Technology

The current prototype uses:

- **React 19**
- **TypeScript**
- **Vite**
- **TanStack Start / TanStack Router**
- **Tailwind CSS**
- **Recharts**
- **Vitest**
- **Lovable** for rapid prototyping and development workflow

The repository is connected to Lovable, allowing development changes to remain synchronised with GitHub.

## Running Locally

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/haron2000/screenshot-exact-match.git
cd screenshot-exact-match
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run tests

```bash
npm run test
```

### Run linting

```bash
npm run lint
```

## Project Structure

The main application code is organised under:

```text
src/
public/
supabase/
```

Additional project configuration includes Vite, TypeScript, Tailwind, Vitest, and Lovable configuration files.

## Hackathon Focus

AZ-Ready was developed as a rapid prototype for an AZ-900 exam preparation challenge.

The prototype demonstrates:

- A complete learner assessment flow
- Question-level feedback
- Weak-area identification
- Targeted practice
- Readiness tracking
- A focused user experience for entry-level cloud learners

## Future Development

Potential next steps include:

- Larger and more diverse original question banks
- More granular topic-level analytics
- Personalised study plans
- Improved study assistance
- Learner feedback and usability testing
- Institutional dashboards for training partners
- More robust progress persistence and analytics

## Responsible Use

AZ-Ready is intended as a study companion, not as a replacement for official Microsoft learning resources or certification policies.

All practice content should remain original and should not reproduce confidential, recalled, or copyrighted certification exam questions.

## Contact

**Haron Mwania**

GitHub: https://github.com/haron2000

Project repository: https://github.com/haron2000/screenshot-exact-match

Live prototype: https://az-cloud-quest-companion.lovable.app/dashboard
