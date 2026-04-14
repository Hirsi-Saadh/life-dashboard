# Life Dashboard

A premium, minimal personal life dashboard built with **React + Vite + Tailwind CSS**, powered by a **Google Sheet as a backend**.

> Intentions. Effort. Gratitude.

---

## ✨ Features

- 🔐 Lock screen with date-based authentication
- 📊 Live data from Google Sheets (CSV)
- ⚡ Fast loading (optional caching support)
- 📱 Fully responsive (mobile-first)
- 🎯 Goal tracking by category
- 🔍 Filters (Planned / In Progress / Done)
- 📈 Summary insights (Total, In Progress, Completed)

---

## 🧠 Concept

This is **not a task manager**.

It is a:

- Personal life dashboard
- Reflection system
- Goal clarity tool

Designed with:

- Minimal UI
- Calm experience
- Premium dark aesthetic

---

## 🏗️ Tech Stack

- React (Hooks)
- Vite
- Tailwind CSS
- Axios
- Google Sheets (CSV export)

---

## 📁 Project Structure
src/
│
├── components/
│ ├── Dashboard.jsx
│ ├── LockScreen.jsx
│ ├── GoalCard.jsx
│ ├── SectionBlock.jsx
│ ├── Filters.jsx
│ ├── StatCard.jsx
│ └── ClockPill.jsx
│
├── utils/
│ ├── constants.js
│ ├── csv.js
│ ├── formatters.js
│ └── storage.js
│
├── App.jsx
├── main.jsx
└── index.css


---

## 🔗 Data Source (Google Sheets)

The app reads from a public Google Sheet:
- https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}


---

## 📊 Required Columns

Your Google Sheet must include:
- Category, Goal, Type, Priority, Estimated Value, Frequency, Expected, Achieved, Status, Notes


---

## ⚠️ Important Setup

### 1. Make Google Sheet Public

Go to:

- Share → Anyone with the link → Viewer


Otherwise, the app will receive HTML instead of CSV.

---

### 2. Verify CSV Access

Paste your CSV URL in browser:

- ✅ Should download CSV
- ❌ If it opens Google UI → permissions issue

---

## 🔐 Lock Screen

Access requires selecting the correct date:

> 14 March 2003 (change it in constants.js)


- Stored in `localStorage`
- Session persists until locked

---

## 🚀 Run Locally
npm install
npm run dev


---

## 🏗️ Build
npm run build

---

## 🌐 Deployment (Vercel)

### Steps:

1. Push project to GitHub
2. Import into Vercel
3. Use configuration:

- Framework: Vite
- Build Command: npm run build
- Output Directory: dist


---

## 🌍 Custom Domain

For: founder-goals.techzap.co.uk

---

## 🧠 Future Improvements

- Search functionality
- Animations (Framer Motion)
- PWA support
- Theme switcher (Gold / Blue)
- Encrypted authentication
- Multi-user support

---

## 🧑‍💻 Author

Built for clarity, intention, and long-term vision.

---

## 📜 License

Private / Internal Use