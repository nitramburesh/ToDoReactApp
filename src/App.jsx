import "./App.css";
import ToDoPage from "./Page/ToDoPage.jsx";
import NotFoundPage from "./Page/NotFoundPage.jsx";
import Dashboard from "./Page/Dashboard.jsx";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Molecule/Header";
function App() {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");

  return (
    <BrowserRouter>
      <Header language={language} setLanguage={setLanguage} />
      <Routes>
        <Route
          path=""
          element={
            <ToDoPage
              loading={loading}
              setLoading={setLoading}
              language={language}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              loading={loading}
              setLoading={setLoading}
              language={language}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
