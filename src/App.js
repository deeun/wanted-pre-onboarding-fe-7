import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import Todo from "./components/Todo/Todo";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* {authContext.isLoggedIn && <Route path="/todo" element={<Todo />} />} */}
      
      </Routes>
    </div>
  );
}

export default App;
