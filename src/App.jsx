import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import  { useState } from 'react';
import { ModalContext } from './ModalContext';


function App() {
  const [isOpenModal, setModal] = useState(false);
  return (
    <>
      <ModalContext.Provider value={{ isOpenModal, setModal }}>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
       </Routes>

      </BrowserRouter>
      </ModalContext.Provider>

    </>
  )
}

export default App
