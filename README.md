

> **Solve the classic Missionaries & Cannibals puzzle with BFS/DFS – and watch it happen in a cinematic React + GSAP animation.**

[![Vercel](https://img.shields.io/badge/Live-Vercel-black?logo=vercel)](https://mayo-river-ai.vercel.app)
[![API](https://img.shields.io/badge/API-Render-green?logo=render)](https://mayosearch.onrender.com)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TS-5-3178C6?logo=typescript)
![Flask](https://img.shields.io/badge/Flask-3-000?logo=flask)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock)

---

## 🎯 What It Does

Three missionaries and three cannibals must cross a river. If cannibals outnumber missionaries on either side, they get eaten.  
This project **computes a safe path** using BFS or DFS and **animates every crossing** with smooth GSAP motion – boat sailing, characters popping, river flowing.

---

## ✨ Highlights

- **BFS & DFS solvers** – custom Python/Flask API that returns the step‑by‑step plan.
- **GSAP animations** – boat drifts, characters bounce, clouds float, river ripples.
- **Interactive controls** – Play / Pause / Step / Redo, autoplay with speed sync.
- **Fully responsive** – looks great on desktop, tablet, and phone.
- **Branded preloader** – canoe logo with missionary & cannibal.
- **Loading states** – spinner while Render cold starts.

---

## 🛠 Tech Stack

**Frontend** – React 19, TypeScript, Vite, GSAP, React Icons  
**Backend** – Python, Flask, custom search algorithms  
**Deployment** – Vercel (frontend), Render (API)

---

## 🚀 Run Locally

```bash
# frontend
cd frontend
npm install
npm run dev

# backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
