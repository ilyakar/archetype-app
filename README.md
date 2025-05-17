# Reflection App

A self-reflection web app built with Next.js, React, and Redux. Users can enter personal values and daily reflections, and receive AI-generated feedback via OpenAI.

---

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/reflection-app.git
   cd reflection-app
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack Used

* [Next.js](https://nextjs.org/) — React framework for SSR and API routes
* [React](https://react.dev/) — Frontend library
* [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
* [Redux](https://redux.js.org/) — State management
* [Redux Toolkit](https://redux-toolkit.js.org/) — Simplified Redux patterns
* [Bootstrap 5](https://getbootstrap.com/) — UI framework
* [Sass](https://sass-lang.com/) — CSS preprocessor

---

## 📌 Implementation Notes

* **State Management**: Uses Redux Toolkit with `redux-persist` to persist the user's responses and app state.
* **Styling**: Combines Bootstrap with Sass for theming. The Material Dashboard theme is integrated via global CSS.
* **Layout**: Built with Next.js App Router, using server and client components. All providers (`Redux`, `PersistGate`) are wrapped in a client-side `<Providers>` component.
* **Form Validation**: Includes basic validation for text length and a helper to conditionally show OpenAI response summaries.
* **AI Integration**: The app communicates with OpenAI through two custom API routes:

  * `/api/reflectionAnalysis` — analyzes the user's reflection answers
  * `/api/isGoodAnswerAnalysis` — checks if an individual answer meets quality expectations