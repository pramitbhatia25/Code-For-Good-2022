import Form from "./InitialForm/Form";
import LandingPage from "./LandingPage/Landing_Page";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Login/Login"
import AdminDashBoard from "./AdminDash/AdminDashboard"
import Progress from "./UserDash/Progress";
import ApplyFunds from "./UserDash/ApplyFunds"
import TrackFunds from "./UserDash/TrackFunds"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminDashBoard />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/applyFunds" element={<ApplyFunds />} />
        <Route path="/trackFunds" element={<TrackFunds />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
