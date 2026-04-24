# SafeHer AI – Proactive Voice-Activated Intelligent Women Safety System

SafeHer AI is a smart women's safety application that provides proactive risk detection, voice-triggered activation, AI-based guidance, and semi-automated monitoring with both online and offline support.

## Problem Statement
In potentially dangerous situations, interacting with a phone screen to trigger safety alerts or figure out an escape plan can be difficult or impossible. SafeHer AI solves this by introducing a **proactive** safety net. It continuously monitors journey parameters, listens for specific verbal distress cues ("help", "stop"), and uses AI to analyze complex situations to offer realistic, actionable escape plans and immediate guidance. 

## Features
- **AI Situation Analyzer**: Describe a situation verbally or textually. The AI (Google Gemini) assesses the risk level, creates an escape plan, provides immediate actions, and offers reassurance.
- **Voice Trigger & Audio Detection**: Uses Web Speech API to detect keywords and Web Audio API to detect loud screams/anomalies to trigger alerts without touching the screen.
- **Smart Safe Mode**: "One-tap activation" journey tracking. If the expected time elapses and the user does not respond to the safety check-in, an alert is triggered.
- **Offline Fallback System**: Reliable offline keyword detection to ensure the app continues to function even without an internet connection.
- **Premium Glassmorphism UI**: Beautiful, calming, and dark-mode optimized aesthetics built using Vanilla CSS.

## Tech Stack
- **Frontend**: React (Vite), Web Speech API, Web Audio API, Vanilla CSS.
- **Backend**: Node.js, Express.
- **AI**: Google Gemini API (`@google/generative-ai`).

## Setup and Running

You will need two terminal windows to run both the frontend and backend.

### 1. Setup Gemini API Key
Navigate to `backend/.env` and replace `your_gemini_api_key_here` with a real Gemini API Key.
If you don't add one, the backend will automatically use its internal **Mock Fallback System** so the app won't crash!

### 2. Start the Backend
```bash
cd backend
npm install
npm start
```
The backend runs on `http://localhost:5000`.

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend runs on `http://localhost:5173`. Open this URL in your browser.
The deployed link of the project "https://teal-griffin-ff37f2.netlify.app" . open URL in your browser.

## Using the Prototype
1. Ensure microphone permissions are granted when prompted by the browser. 
2. Test the **Situation Analyzer** by typing a scenario like "I got into a cab and the driver looks suspicious and turned off the route."
3. Test **Safe Mode** by putting in a small expected duration (1 min) and waiting for the automated prompt!
