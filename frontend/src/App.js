import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";

import HomePage from "./Pages/HomePage.js";
import ChatPage from "./Pages/Chats.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
