# React Portfolio Website with Node.js/Express Backend

A full-stack Developer Portfolio application featuring a React (Vite) frontend integrated with a live Node.js/Express REST API backend.

---

## 🚀 Overview & Features

- **Frontend**: Single-Page Application (SPA) built with **React** and **Vite**, dynamic project routing (`react-router-dom`), custom CSS styling, responsive layouts, and interactive UI components.
- **Backend**: **Node.js** & **Express** REST API serving project data, accepting contact form submissions with server-side validation, and reading/writing to persistent JSON files.
- **API Integration**: Asynchronous `fetch` calls with loading states, user feedback, retry mechanisms, and graceful error boundaries.
- **Testing**: Includes a pre-configured **Postman Collection** and automated **cURL testing script**.

---

## 📁 Project Structure

```text
portfolio-website/
├── public/                 # Static assets (images, stack icons)
├── src/                    # React frontend application
│   ├── components/         # Reusable UI components (Navbar, Layout, ProjectCard, etc.)
│   ├── config/             # Centralized API configuration (api.js)
│   ├── pages/              # Page routes (Home, Projects, ProjectDetail, Contact, About)
│   └── App.jsx             # Main router & theme provider
├── server/                 # Express backend API server
│   ├── data/               # Persistent JSON data storage (projects.json, contactSubmissions.json)
│   ├── index.js            # Express server entry point & routes (B1-B7)
│   ├── package.json        # Backend package configuration
│   ├── .env                # Backend environment configuration (git-ignored)
│   └── .env.example        # Environment variable template
├── portfolio_api.postman_collection.json # Exported Postman collection
├── curl_tests.sh           # Shell script for CLI API testing
├── package.json            # Frontend package configuration
└── README.md               # Project documentation
```

---

## ⚙️ Setup & Running Instructions

This application requires two running processes: the Express backend server and the React frontend development server.

### 1. Backend Server Setup & Run
Open a terminal in the root folder and execute:
```bash
cd server
npm install
npm run dev
# Or npm start
```
The Express server will start listening on port `5000` (or the port defined in `server/.env`).

### 2. Frontend Setup & Run
Open a second terminal in the root directory and execute:
```bash
npm install
npm run dev
```
The React development server will start at `http://localhost:5173`.

---

## 🔑 Environment Configuration

### Backend (`server/.env.example`)
The backend uses `dotenv` to load environment variables. Below are the required variables:

```env
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
DATA_FILE_PATH=./data
```

> **Note**: A `.env.example` file is included in the `/server` directory. No secrets are committed in `.env`.

---

## 💾 Data Storage Strategy

- **Storage Type**: Persistent JSON File Storage.
- **Location**:
  - `server/data/projects.json`: Stores project objects served by `GET /api/projects`.
  - `server/data/contactSubmissions.json`: Persists contact submissions sent via `POST /api/contact`.

---

## 🛠️ API Documentation & Endpoints (B1–B7)

### B1. Base Health Check
- **Endpoint**: `GET /`
- **Description**: Confirms the API server is up and running.
- **Response**: `200 OK`
```json
{
  "status": "ok"
}
```

---

### B2. Get All Projects
- **Endpoint**: `GET /api/projects`
- **Description**: Serves the list of all portfolio projects.
- **Response**: `200 OK`
```json
[
  {
    "id": "1",
    "title": "StudyNotion",
    "description": "A full-stack learning management system built on the MERN stack...",
    "skills": ["MongoDB.svg", "Express.png", "React.png", "NodeJs.svg", "Redux.svg", "Tailwind.png"],
    "techStack": ["MongoDB", "Express", "React", "Node.js", "Redux", "Tailwind CSS"],
    "image": "Project1.png",
    "githubLink": "https://github.com/sami099k",
    "liveLink": "#",
    "link": "https://github.com/sami099k"
  }
]
```

---

### B3. Get Single Project Details
- **Endpoint**: `GET /api/projects/:id`
- **Description**: Retrieves data for a specific project by ID.
- **Success Response**: `200 OK`
```json
{
  "id": "1",
  "title": "StudyNotion",
  "description": "A full-stack learning management system...",
  "skills": ["MongoDB.svg", "Express.png", "React.png", "NodeJs.svg", "Redux.svg", "Tailwind.png"],
  "image": "Project1.png",
  "githubLink": "https://github.com/sami099k"
}
```
- **Error Response (404 Not Found)**: `404 Not Found`
```json
{
  "error": "Project not found"
}
```

---

### B4. Submit Contact Form
- **Endpoint**: `POST /api/contact`
- **Headers**: `Content-Type: application/json`
- **Sample Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Job Opportunity",
  "message": "Hi Sami, I loved your portfolio project!"
}
```
- **Success Response**: `201 Created`
```json
{
  "message": "Submission received successfully",
  "data": {
    "id": "1789406026838",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Job Opportunity",
    "message": "Hi Sami, I loved your portfolio project!",
    "submittedAt": "2026-09-14T17:13:46.838Z"
  }
}
```
- **Error Response (Missing Fields)**: `400 Bad Request`
```json
{
  "error": "Validation failed",
  "details": {
    "name": "Name is required",
    "message": "Message is required"
  },
  "message": "Name is required, Message is required"
}
```
- **Error Response (Invalid Email)**: `400 Bad Request`
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format (must contain @)"
  },
  "message": "Invalid email format (must contain @)"
}
```

---

### B5. List Contact Submissions (Verification Endpoint)
- **Endpoint**: `GET /api/contact`
- **Description**: Returns all contact form submissions stored on the backend.
- **Authentication**: **Open Endpoint (No Authentication Required)** - Exposed specifically for assignment evaluation and verification.
- **Response**: `200 OK`
```json
[
  {
    "id": "1789406026838",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Job Opportunity",
    "message": "Hi Sami, I loved your portfolio project!",
    "submittedAt": "2026-09-14T17:13:46.838Z"
  }
]
```

---

### B6. Centralized Error Handling & 404s
- **Undefined Route**: `GET /api/doesnotexist` -> `404 Not Found`
```json
{
  "error": "Route not found"
}
```
- **Global Error Handler Middleware**: Catches unhandled errors and returns JSON payloads without leaking raw HTML or crashing the Express server.

---

### B7. CORS & Environment Variable Support
- Configured via `cors` middleware bound to `process.env.ALLOWED_ORIGIN`. Allows cross-origin requests from the React dev server (`http://localhost:5173`).

---

## 🌳 Component Tree & State-Lifting Decisions

The frontend application is modularized to ensure maintainability and separation of concerns.

### Component Tree Overview
* `App` (Root Component)
  * `Navbar` (Navigation links and Theme Toggle)
  * `Hero` (Introduction and animated background elements)
  * `Projects` (Fetches & showcases project cards)
  * `ProjectDetail` (Fetches & renders full single project details)
  * `Contact` (Contact form state & API submission)
  * `Footer` (Copyright and branding)

### State-Lifting Decisions
* **Global Theme State (`isDarkMode`):** Lifted to the `App` component rather than being encapsulated within the `Navbar`. 
  * *Reasoning:* The `Navbar` contains the toggle button, but the global layout (specifically the HTML `<body>` tag) needs to react to this state change to apply dark/light CSS variables across the entire application. By holding state in `App`, the toggle function is passed as a prop to `Navbar`, while `App` triggers global DOM updates.
* **Contact Form State (`formData`, `status`, `isSubmitting`):** Kept local to the `Contact` component.
  * *Reasoning:* No parent or sibling components need access to the user's draft message or submission status. Keeping this state localized prevents unnecessary re-renders of the application while the user types.

---

## 🪝 Implemented React Hooks & Side Effects

1. **Backend Fetching (`Projects.jsx` & `ProjectDetail.jsx`)**
   * **Purpose:** Uses `useEffect` to trigger async GET requests to `/api/projects` and `/api/projects/:id` when components mount. Handles loading, error, and dynamic UI updates.
2. **Global Theme Application (`App.jsx`)**
   * **Purpose:** Appends or removes `.dark` and `.light` classes on the document `<body>` tag whenever `isDarkMode` state toggles.
3. **Contact Form Submission Cleanup (`Contact.jsx`)**
   * **Purpose:** Automatically clears the "Message sent successfully!" notification after 4 seconds. Includes a cleanup function (`clearTimeout`) to destroy the timer if the component unmounts.

---

## 🧪 Testing API Endpoints

### Postman Collection
Import [`portfolio_api.postman_collection.json`](file:///c:/Users/MD%20SAMI/Desktop/Course@ch/FrontEnd/css/portfolio-website/portfolio_api.postman_collection.json) into Postman to test all 7 endpoints, including success and failure validation cases.

### Shell Script (cURL)
Run the automated test script in a bash terminal:
```bash
bash curl_tests.sh
```

