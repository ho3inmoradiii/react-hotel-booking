import "./App.css";
import Header from "./components/Headers/Header.jsx";
import { Toaster } from 'react-hot-toast';
import LocationList from "./components/LocationList/LocationList.jsx";

function App() {
  return <>
    <Toaster />
    <Header />
    <LocationList />
  </>
}

export default App;

