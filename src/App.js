//import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

import MessageBoard from "./components/messageBoard/MessageBoard.js";
import Home from "./components/home/Home.js";
import AboutMePage from "./components/aboutMe/AboutMePage.js";
import WordlePage from "./components/pages/wordlePage/WordlePage.js";
import ProjectsPage from "./components/pages/projectPage/ProjectsPage.js";
import { Routes, Route, useLocation } from "react-router-dom";

import ActionPage from "./components/profile/ActionPage";
import ProfilePage from "./components/profile/ProfilePage";
import GamePage from "./components/game/GamePage.js";
import FourNumsPage from "./components/game/fourNums/FourNumsPage";
import NavigationBar from "./components/nav/NavigationBar.js";
function App() {
  const { user } = useSelector((state) => ({ ...state }));
  const email = user ? user.email : null;
  const [blur, setBlur] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const appContainer = document.getElementById("app-container");
    if (appContainer) {
      appContainer.style.filter = blur ? "blur(10px)" : "blur(0)";
      appContainer.style.transform = blur
        ? "translateY(0)"
        : "translateY(-100%);";
    }
  }, [blur]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <NavigationBar blur={() => setBlur(true)} unblur={() => setBlur(false)} />

      <div id="app-container">
        <Routes>
          <Route
            path={"/"}
            key={location.pathname}
            element={<Home login={user} />}
            exact
          />
          <Route
            path="/about-me"
            key={location.pathname}
            element={<AboutMePage />}
            exact
          />
          <Route
            path="/games"
            key={location.pathname}
            element={<GamePage />}
            exact
          />
          <Route
            path="/my-projects"
            key={location.pathname}
            element={<ProjectsPage />}
            exact
          />
          <Route path="/messageboard" element={<MessageBoard />} exact />
          <Route path="/wordle" element={<WordlePage />} exact />
          <Route path="/profile" element={<LoggedInRoutes />} exact />
          <Route path="/login" element={<ActionPage action="login" />} exact />
          <Route
            path="/register"
            element={<ActionPage action="register" />}
            exact
          />
          <Route path="/fournums" element={<FourNumsPage />} exact />
        </Routes>
      </div>
    </>
  );
}
/*          <Route path="/about-me" element={<Introduction />} exact />
          <Route path="/messageboard" element={<MessageBoard />} exact />
          <Route path="/wordle" element={<Wordle />} exact />
          <Route path="/profile" element={<Profile 
          
          />} exact />
          <Route path="/user" element={<User />} exact /> */
/*<Route path="/about-me" element={<Introduction />} exact />
          <Route path="/messageboard" element={<MessageBoard />} exact />
          <Route path="/wordle" element={<Wordle />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />*/
export default App;
