# EASYRICE Junior Exam: Rice Inspection App

A comprehensive web application developed for the EASYRICE Junior Exam.

## Live Demo & Documentation

* **Frontend (Production):** [https://rice-inspection-web-application.vercel.app/]
* **Backend API (Production):** [https://rice-inspection-web-application.onrender.com]
* **API Documentation (Swagger):** [https://rice-inspection-web-application.onrender.com/api-docs]

---

## Features

**Frontend:**
- **Inspection History:** View all past inspections with a clean data table.
- **Search & Filter:** Find specific inspections by ID easily.
- **Create Inspection:** Upload `raw.json`, select a standard, and automatically calculate the Composition and Defect results.
- **Result View:** Detailed breakdown of rice quality (Wholegrain, Broken, Chalky, Yellow, etc.).
- **Edit & Delete:** Manage your inspection history seamlessly.

**Backend:**
- **RESTful APIs:** Efficient endpoints for handling Rice Standards and Inspection History.
- **Calculation Engine:** Advanced logic to process `raw.json` against defined `standards.json`.
- **Database Seeding:** Automated data seeding to ensure the system is ready for testing.
- **Swagger UI:** Comprehensive and interactive API documentation.

## Tech Stack

- **Frontend:** React (TypeScript), Tailwind CSS, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (Hosted on **Neon.tech**), Drizzle ORM
- **Deployment:** Docker, Render (Backend), Vercel (Frontend)

---

## How to Run Locally (Docker)

The project is fully containerized. You **do not** need to install PostgreSQL or Node.js manually if you have Docker installed.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Stxmplhz/rice-inspection-web-application.git](https://github.com/Stxmplhz/rice-inspection-web-application.git)
    cd rice-inspection-web-application
    ```

2.  **Start the application:**
    ```bash
    docker-compose up --build
    ```
    *This will automatically set up the database, run migrations, seed mock data, and start both the frontend and backend.*

3.  **Access points:**
    * **Frontend:** `http://localhost:5173`
    * **Backend API:** `http://localhost:3000`
    * **API Docs:** `http://localhost:3000/api-docs`

---

## Project Structure
```text
.
├── backend/            # Express.js Server, Drizzle Schema & Seeders
├── frontend/           # React App (Vite), Axios Instance & Components
├── docker-compose.yml  # Local Environment Orchestration
└── README.md           # Project Documentation