import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import List from "./employeeData.js/List";
import Edit from "./employeeData.js/Edit";
import Create from "./employeeData.js/Create";

function App() {
  return (
    <div>
      <Routes>
        <Route>
          <Route path="/" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
