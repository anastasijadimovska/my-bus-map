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
import AddEditBus from "./pages/AddEditBus";
import AddEditBusLine from './pages/AddEditBusLine';
import AddEditBusSchedule from './pages/AddEditBusSchedule';
import AddEditBusStop from './pages/AddEditBusStop';
import BusLineList from "./pages/BusLineList";

function App() {
  return (
      <Router>
        <HeaderNav/>
          <Routes>
              <Route path={"/home"} element={<HomePage/>}></Route>
              <Route path="/buses" element={<BusList />} />
              <Route path="/buses/add" element={<AddEditBus />} />
              <Route path="/buses/edit/:id" element={<AddEditBus />} />
              <Route path="/schedules" element={<BusScheduleList />} />
              <Route path="/bus-stops" element={<BusStopList />} />
              <Route path="/bus-lines/add" element={<AddEditBusLine />} />
              <Route path="/bus-lines/edit/:id" element={<AddEditBusLine />} />
              <Route path="/bus-schedules/add" element={<AddEditBusSchedule />} />
              <Route path="/bus-schedules/edit/:id" element={<AddEditBusSchedule />} />
              <Route path="/bus-stops/add" element={<AddEditBusStop />} />
              <Route path="/bus-stops/edit/:id" element={<AddEditBusStop />} />
              <Route path="/bus-lines" element={<BusLineList />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Footer/>
      </Router>
  );
}

export default App;
