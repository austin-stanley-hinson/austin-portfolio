# Austin Hinson - Developer Portfolio

A full-stack and AI-focused portfolio built with Next.js, TypeScript, and Tailwind CSS.

Live Site: https://www.austinhinson.tech
GitHub: https://github.com/austin-stanley-hinson

## Overview

This portfolio covers my work across full-stack engineering, AI systems, performance-oriented backend design, and systems thinking grounded in applied mathematics.

The interface uses a warm editorial design language with a dark "growth map" hero that frames the journey as a tree: roots, trunk, branches, and glowing section nodes. The goal is a build that feels personal and a little playful while staying fast and recruiter friendly.

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4 and shadcn/ui
- Animations: AOS (Animate On Scroll) and lightweight CSS keyframes
- Icons: Lucide React and React Icons
- Deployment: Vercel

## Features

- Dark mode with a theme toggler
- Interactive tree hero with branch-node navigation and hover previews
- Custom animated cursor that reacts to interactive elements, disabled on touch and reduced-motion
- "Ask Austin" chat panel with a floating launcher, backed by an `/api/ask` route
- Smooth scroll navigation and section anchors
- Fully responsive layout and mobile navigation
- Project cards driven by a centralized `data.ts`, with live site and source links
- Timeline-style experience section
- Contact section with mail integration

## Featured Projects

- PulseGrid: Distributed Monitoring Platform
- myLokala: Local Rewards and Coupon Platform
- Planty: Multi-Source Research Agent
- Sign Language Detector and Translator
- Portfolio Website
- Desktop Voice Assistant

## Ask Austin Chat

The chat panel works out of the box with a built-in fallback response, so the page never breaks.

To enable live answers, set an environment variable:

```bash
ANTHROPIC_API_KEY=your_key_here
```

Optionally override the default model:

```bash
ASK_AUSTIN_MODEL=claude-haiku-4-5-20251001
```

On Vercel, add the same variables under Project Settings and Environment Variables.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/austin-stanley-hinson/austin-portfolio.git
cd austin-portfolio
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Build for Production

```bash
npm run build
```
