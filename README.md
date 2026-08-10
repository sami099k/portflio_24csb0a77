# Developer Portfolio - Mohammad Sami Syed

A responsive, single-page developer portfolio built with React. This application showcases my skills and featured projects—including a Football Video RAG system, an Agentic AI Compiler Assistant, and Nexus Notes (an independent learning platform for sharing resources). It features a global dark/light mode toggle and a functional contact form.

## 🚀 Setup and Run Instructions

Ensure you have [Node.js](https://nodejs.org/) installed on your local machine before proceeding.

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   *(Note: If you bootstrapped this project with Vite, run `npm run dev` instead).*

4. **View the application**:
   Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

---

## 🌳 Component Tree & State-Lifting Decisions

The application is modularized to ensure maintainability and separation of concerns.

### Component Tree Overview
* `App` (Root Component)
  * `Navbar` (Navigation links and Theme Toggle)
  * `Hero` (Introduction and animated background elements)
  * `Projects` (Showcases project cards)
  * `Contact` (Contact form and state)
  * `Footer` (Copyright and branding)

### State-Lifting Decisions
* **Global Theme State (`isDarkMode`):** Lifted to the `App` component rather than being encapsulated within the `Navbar`. 
  * *Reasoning:* The `Navbar` contains the toggle button, but the global layout (specifically the HTML `<body>` tag) needs to react to this state change to apply the dark/light CSS variables across the entire application. By holding the state in `App`, the toggle function can be passed down as a prop to `Navbar`, while `App` triggers the global DOM changes.
* **Contact Form State (`formData`, `status`):** Kept local to the `Contact` component.
  * *Reasoning:* No parent or sibling components need access to the user's draft message or submission status. Keeping this state localized prevents unnecessary re-renders of the entire application while the user is typing.

---

## 🪝 Implemented `useEffect` Hooks

The following `useEffect` hooks were implemented to handle side effects outside the standard React rendering cycle:

1. **Global Theme Application (`App.jsx`)**
   * **Purpose:** To append or remove the `.dark` and `.light` classes on the document's `<body>` tag whenever the `isDarkMode` state toggles.
   * **Why it was necessary:** React state natively manages the components within its tree, but background colors and base text colors are often applied to the `<body>` tag (which sits outside the React root). Direct DOM manipulation is required as a side effect to sync the React state with the global HTML document.

2. **Scroll-to-Top on Mount (`App.jsx`)**
   * **Purpose:** To force the window to scroll to coordinates `(0, 0)` when the application first loads.
   * **Why it was necessary:** Single Page Applications (SPAs) sometimes retain the user's previous scroll position upon a hard refresh. This effect guarantees the user always starts at the Hero section when landing on the portfolio.

3. **Contact Form Submission Cleanup (`Contact.jsx`)**
   * **Purpose:** To automatically clear the "Message sent successfully!" notification 3 seconds after a user submits the form.
   * **Why it was necessary:** Leaving a success message on the screen indefinitely creates a stale UI. The hook initiates a `setTimeout` function. Crucially, it includes a cleanup function (`clearTimeout`) to ensure that if the `Contact` component unmounts before the 3 seconds finish, the timer is destroyed, preventing React state memory leaks.
