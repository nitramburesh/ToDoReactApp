import "./App.css";
import ToDoPage from "./ToDoPage.jsx";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <ToDoPage loading={loading} setLoading={setLoading} />
    </div>
  );
}

export default App;
