//import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MessageBoard from "./components/messageBoard/MessageBoard.js";
import Home from "./components/home/Home.js";
import Introduction from "./components/introduction/Introduction.js";
import Wordle from "./components/game/wordle/Wordle.js";
import { Routes, Route } from "react-router-dom";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import LoginPage from "./components/profile/LoginPage";
import RegisterPage from "./components/profile/RegisterPage";
import Profile from "./components/profile/Profile";
import Game from "./components/game/Game";
import FourNums from "./components/game/fourNums/FourNums";
import NavigationBar from "./components/navi/NavigationBar";
function App() {
  const { user } = useSelector((state) => ({ ...state }));
  const email = user ? user.email : null;
  const [blur, setBlur] = useState(false);
  useEffect(() => {
    console.log("can I blur???", blur);
    if (blur) {
      document.getElementById("app-container").style.filter = "blur(8px)";
    } else {
      document.getElementById("app-container").style.filter = "blur(0)";
    }
  }, [blur]);
  return (
    <div>
      <NavigationBar blur={() => setBlur(true)} unblur={() => setBlur(false)} />
      <div id="app-container">
        <Routes>
          <Route path={"/"} element={<Home login={user} />} exact />
          <Route path="/about-me" element={<Introduction />} exact />
          <Route path="/games" element={<Game />} exact />
          <Route path="/messageboard" element={<MessageBoard />} exact />
          <Route path="/wordle" element={<Wordle />} exact />
          <Route path="/profile" element={<LoggedInRoutes />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/register" element={<RegisterPage />} exact />
          <Route path="/fournums" element={<FourNums />} exact />
        </Routes>
      </div>
    </div>
  );
}
/*          <Route path="/about-me" element={<Introduction />} exact />
          <Route path="/messageboard" element={<MessageBoard />} exact />
          <Route path="/wordle" element={<Wordle />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/user" element={<User />} exact /> */
/*<Route path="/about-me" element={<Introduction />} exact />
          <Route path="/messageboard" element={<MessageBoard />} exact />
          <Route path="/wordle" element={<Wordle />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />*/
export default App;
