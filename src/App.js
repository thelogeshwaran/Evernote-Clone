import "./App.css";
import React from "react";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import Navigation from "./Components/Navigation/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Editpage from "./Pages/EditorPage/Editorpage";
import TrashPage from "./Pages/Trashpage/TrashPage";
import { useAuthProvider } from "./Context/AuthProvider";
import Login from "./Pages/LoginPage/LoginPage";

function App() {
  const { user } = useAuthProvider();
  return (
    <div className="app-container">
      {user === false ? (
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/">
                <Login />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      ) : (
        // <div>Logged in</div>
        <BrowserRouter>
          <div>
            <Navigation />
          </div>
          <div>
            <Routes>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/editor">
                <Editpage />
              </Route>
              <Route path="/bin">
                <TrashPage />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;