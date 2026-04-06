# 💰 ZORVYN – Fintech Dashboard UI

A modern, scalable, and fully responsive **Fintech Dashboard UI** built using **React, Redux, Tailwind CSS, and Recharts**.

This project was developed as part of an assignment to demonstrate the ability to design and implement a **real-world financial analytics interface**, focusing on **data visualization, clean architecture, role-based UI behavior, and user experience**.

---

## 📌 Project Overview

**ZORVYN Dashboard UI** simulates a real fintech application that helps users monitor and analyze their financial activities through structured data and interactive visualizations.

The application provides:

* A centralized financial overview
* Transaction management system
* Category-based spending insights
* Role-based UI interaction
* Data-driven insights for better decision-making

The goal was not just to build UI, but to showcase a **complete approach to solving a real-world frontend problem**.

---

## 🎯 Assignment Objectives Covered

This project fulfills all core requirements of the assignment:

* Dashboard with summary and visualizations
* Transactions management with filtering/search
* Role-based UI (frontend simulation)
* Insights generation
* Proper state management
* Responsive and clean UI

---

## 🧠 Architecture & Development Approach

### 🔹 Component-Based Architecture

The application is structured into reusable and domain-specific components:

* **Dashboard Components** → Charts, cards, transaction history
* **Insights Components** → Advanced analytics and breakdowns
* **Layout Components** → Navbar, Sidebar, Layout
* **Common Components** → Shared utilities

This ensures:

* Scalability
* Maintainability
* Reusability

---

### 🔹 State Management (Redux)

Redux is used to manage:

* Transactions data
* Filters and search
* Selected user role
* UI states (modals, sidebar)

**Slices:**

* `transactionSlice` → Financial data
* `uiSlice` → UI behavior

---

### 🔹 Data Visualization Strategy

Implemented using **Recharts**:

* 📊 **Time-Based Visualization**

  * Income vs Expense trends (Bar/Line charts)

* 🥧 **Categorical Visualization**

  * Spending breakdown (Pie chart with total)

* 📈 **Insights Charts**

  * Monthly comparisons and analytics

Focus was on:

* Clarity
* Readability
* Minimal clutter

---

### 🔹 UI/UX & Responsiveness

A key constraint:

👉 **“Make it responsive without changing the UI design”**

Handled by:

* Tailwind responsive utilities
* Flexible layouts
* Horizontal scrolling for tables
* Careful breakpoint handling

---

## ✨ Features Implementation

### 1️⃣ Dashboard Overview

* Summary Cards:

  * Total Balance
  * Total Income
  * Total Expenses

* Time-based financial trends

* Category-wise expense visualization

* Recent transactions preview

---

### 2️⃣ Transactions Section

Displays structured transaction data:

* Date
* Amount
* Category
* Type (Income / Expense)

Features:

* Search functionality
* Basic filtering
* Sorting for usability

---

### 3️⃣ Role-Based UI (Frontend Simulation)

Simulated role-based behavior:

* **Viewer**

  * Can only view data

* **Admin**

  * Can add transactions
  * Can interact with controls

Role switching:

* Implemented via dropdown/toggle
* UI updates dynamically

---

### 4️⃣ Insights Section

Provides meaningful financial insights:

* Highest spending category
* Monthly comparison
* Smart observations from data

---

### 5️⃣ State Management

Handled using Redux:

* Transactions
* Filters
* Role
* UI states

Ensures:

* Predictable updates
* Centralized logic
* Easy scalability

---

### 6️⃣ UI & UX Expectations

* Clean and modern design
* Fully responsive across devices
* Consistent spacing and colors
* Handles edge cases:

  * Empty data
  * No transactions

---

## 🚀 Optional Enhancements (Extendable)

* Dark mode
* Local storage persistence
* Backend integration
* Export (CSV/JSON)
* Advanced filtering

---

## 🛠️ Tech Stack

* React.js
* Redux
* Tailwind CSS
* Recharts
* React Router

---

## 📂 Project Structure

```bash id="struct-final"
ZORVYN/
└─ DASHBOARD-UI/
   ├─ public/
   │  ├─ favicon.svg
   │  └─ icons.svg
   ├─ src/
   │  ├─ assets/
   │  │  ├─ logo.jpeg
   │  │  ├─ profile.png
   │  │  └─ vite.svg
   │  ├─ components/
   │  │  ├─ common/
   │  │  │  └─ ComingSoon.jsx
   │  │  ├─ dashboard/
   │  │  │  ├─ BalanceChart.jsx
   │  │  │  ├─ CategoryChart.jsx
   │  │  │  ├─ MyCard.jsx
   │  │  │  ├─ QuickTransaction.jsx
   │  │  │  ├─ SummaryCards.jsx
   │  │  │  └─ TransactionHistory.jsx
   │  │  ├─ insights/
   │  │  │  ├─ CategoryBreakdown.jsx
   │  │  │  ├─ ExpenseChart.jsx
   │  │  │  ├─ SmartInsights.jsx
   │  │  │  └─ StatsCards.jsx
   │  │  ├─ layout/
   │  │  │  ├─ Layout.jsx
   │  │  │  ├─ Navbar.jsx
   │  │  │  └─ Sidebar.jsx
   │  │  ├─ transaction/
   │  │  │  └─ TransactionModal.jsx
   │  │  └─ ThemeProvider.jsx
   │  ├─ constants/
   │  │  └─ colors.js
   │  ├─ data/
   │  │  └─ mockData.js
   │  ├─ local/
   │  │  └─ english.json
   │  ├─ pages/
   │  │  ├─ Cards.jsx
   │  │  ├─ Dashboard.jsx
   │  │  ├─ Insights.jsx
   │  │  ├─ Payments.jsx
   │  │  ├─ Settings.jsx
   │  │  └─ Transactions.jsx
   │  ├─ redux/
   │  │  ├─ slices/
   │  │  │  ├─ transactionSlice.js
   │  │  │  └─ uiSlice.js
   │  │  └─ store.js
   │  ├─ App.jsx
   │  ├─ index.css
   │  └─ main.jsx
   ├─ .gitignore
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ README.md
   ├─ tailwind.config.js
   └─ vite.config.js

```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash id="setup-final-1"
git clone https://github.com/your-username/zorvyn-dashboard.git
cd DASHBOARD-UI
```

### 2. Install Dependencies

```bash id="setup-final-2"
npm install
```

### 3. Run Development Server

```bash id="setup-final-3"
npm run dev
```

### 4. Open in Browser

```id="setup-final-4"
http://localhost:5173
```

---

## 📊 Evaluation Criteria Coverage

### ✔ Design & Creativity

* Clean fintech UI with intuitive layout

### ✔ Responsiveness

* Fully responsive without breaking UI

### ✔ Functionality

* Dashboard, transactions, insights, RBAC simulation

### ✔ User Experience

* Smooth navigation and usability

### ✔ Technical Quality

* Modular and scalable architecture

### ✔ State Management

* Efficient Redux implementation

### ✔ Documentation

* Clear and detailed README

### ✔ Attention to Detail

* Edge case handling and UI polish

---

## 👨‍💻 Author

**Aditya Roy**
Full Stack Developer

---

## ⭐ Final Note

This project focuses on demonstrating **problem-solving ability, design thinking, and frontend engineering skills** by converting requirements into a structured and working application.
