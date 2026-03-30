# Lean Six Sigma Yellow Belt Quiz

An interactive exam prep quiz app for the Lean Six Sigma Yellow Belt certification, built with React and Vite.

## Features

- **60-question bank** covering all core Lean Six Sigma Yellow Belt topics
- **Randomized 15-question quizzes** drawn from the full bank each session
- **30-minute countdown timer** that auto-submits when time expires
- **Image-based questions** for chart and diagram interpretation (Pareto, scatter plots, FMEA tables)
- **Detailed answer explanations** shown after submission
- **Results screen** with score and per-question review

## Topics Covered

- DMAIC methodology
- Project Charter and Business Case
- Voice of the Customer (VOC) and CTQ
- Lean principles and the 8 wastes
- SIPOC, Value Stream Mapping, 5S, Kanban, Poka-yoke
- FMEA and risk priority
- Process capability (Cp, Cpk), sigma levels, and normal distribution
- Measurement System Analysis (MSA)
- Control charts and statistical tools

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

## Test Mode

Append `?test=true` to the URL to force image-based questions into the quiz session (useful for testing all question types):

```
http://localhost:5173/?test=true
```

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (icons)
