import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TimetableMain from "./components/TimetableMain";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-100 min-h-screen">
        <Header />

        <Routes>
          <Route path="/" element={<TimetableMain />} />   {/* timetable page */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
