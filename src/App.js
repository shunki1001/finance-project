import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./view/Dashboard";
import Kotei from "./view/Kotei";
import MainLayout from "./view/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kotei" element={<Kotei />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
