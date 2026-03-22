# EASYRICE Junior Exam: Rice Inspection App

A comprehensive web application developed for the EASYRICE Junior Exam.

---

## Features

**Frontend:**
- **Inspection History:** View all past inspections with a clean data table.
- **Search & Filter:** Find specific inspections by ID easily.
- **Create Inspection:** Upload `raw.json`, select a standard, and automatically calculate the Composition and Defect results.
- **Result View:** Detailed breakdown of rice quality (Wholegrain, Broken, Chalky, Yellow, etc.).
- **Edit & Delete:** Manage your inspection history seamlessly.

**Backend:**
- RESTful APIs for handling Standards and History.
- Advanced calculation engine to process `raw.json` against `standards.json`.
- Automated Database Seeding (Mock data ready to use).
- Comprehensive API Documentation via Swagger UI.

## Tech Stack

- **Frontend:** React (TypeScript), Tailwind CSS, React Router
- **Backend:** Node.js, Express, TypeScript, Axios
- **Database:** PostgreSQL, Drizzle ORM
- **Infrastructure:** Docker & Docker Compose

---

##  How to Run the Web Application (Docker - Recommended)

Already configured a complete Docker environment. You **do not** need to install PostgreSQL or configure databases manually. The database is pre-populated with mock data upon initial run.

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd easyrice-rice-inspection