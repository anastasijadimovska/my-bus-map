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
import Maps from "./pages/Maps"
import SavedBusLinesList from "./pages/SavedBusLinesList";

function App() {
  return (
      <Router>
        <HeaderNav/>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/buses" element={<BusList />} />
              <Route path="/schedules" element={<BusScheduleList />} />
              <Route path="/bus-stops" element={<BusStopList />} />
              <Route path="/bus-lines" element={<BusLineList />} />
              <Route path="/maps" element={<Maps />} />
              <Route path="/saved-bus-lines" element={<SavedBusLinesList />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Footer/>
      </Router>
  );
}

export default App;
