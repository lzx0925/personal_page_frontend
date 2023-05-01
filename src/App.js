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
import ActionPage from "./components/profile/ActionPage";
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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <NavigationBar blur={() => setBlur(true)} unblur={() => setBlur(false)} />
      <div id="app-container">
        <Routes>
          <Route path={"/"} element={<Home login={user} />} exact />
          <Route path="/about-me" element={<Introduction />} exact />
          <Route path="/games" element={<Game />} exact />
          <Route path="/messageboard" element={<MessageBoard />} exact />
          <Route path="/wordle" element={<Wordle />} exact />
          <Route path="/profile" element={<LoggedInRoutes />} exact />
          <Route path="/login" element={<ActionPage action="login"/>} exact />
          <Route path="/register" element={<ActionPage action="register" />} exact />
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
