import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './mainPage/mainPage';
import DriversPage from './driversPage/driversPage'

function App() {
  return (
    <div className="App">
     
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="drivers" element={<DriversPage />} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
