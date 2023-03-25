import "./App.css";

import { Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";

import ChatPage from "./Pages/Chats";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/chat" component={ChatPage} />
    </div>
  );
}

export default App;
