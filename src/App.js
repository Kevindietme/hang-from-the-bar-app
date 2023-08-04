import './styles/App.css';
import Exercises from './components/Exercises';
import Results from './components/Results';
import Footer from './components/Footer';
import TotalResults from './pages/TotalResults';
import React, { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/TotalResults" element={<TotalResults/>} />
      <Route path="/" element={<Exercises/>}/>
  {/* <Results /> */}
  {/* <Footer /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
