import Input from "./Input";
import "./App.css";
import { useState } from "react";
import Loader from "./Loader";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>To-Do List</h1>
        </header>
        <Input setLoading={setLoading} />
      </div>
      {loading && <Loader />}
    </>
  );
}

export default App;
