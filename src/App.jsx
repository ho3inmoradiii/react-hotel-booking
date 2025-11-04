import "./App.css";
import Header from "./components/Headers/Header.jsx";
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import HotelsPage from "./components/Hotels/HotelsPage.jsx";
import SingleHotel from "./components/Hotels/SingleHotel.jsx";
import { HotelsLayoutWithContext } from "./components/Hotels/HotelsLayoutWithContext.jsx";

function App() {
  return <>
    <Toaster />
    <Header />


    <Routes>
      <Route path="/" element={<HomePage />} />7
      <Route path="/hotels" element={<HotelsLayoutWithContext />}>
        <Route index element={<HotelsPage />} />
        <Route path=":hotelId" element={<SingleHotel />} />
      </Route>
    </Routes>
  </>
}

export default App;

