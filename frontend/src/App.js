import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HeaderNav from "./Components/Header/HeaderNav";
import Footer from "./Components/Footer/Footer"
import HomePage from "./Components/Home/HomePage"
import BusList from "./pages/BusList";
import BusScheduleList from "./pages/BusScheduleList";
import BusStopList from "./pages/BusStopList";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BusLineList from "./pages/BusLineList";

function App() {
  return (
      <Router>
        <HeaderNav/>
          <Routes>
              <Route path={"/home"} element={<HomePage/>}></Route>
              <Route path="/buses" element={<BusList />} />
              <Route path="/schedules" element={<BusScheduleList />} />
              <Route path="/bus-stops" element={<BusStopList />} />
              <Route path="/bus-lines" element={<BusLineList />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Footer/>
      </Router>
  );
}

export default App;
