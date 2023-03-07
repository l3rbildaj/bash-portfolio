import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import "./App.css";
import Layout from './components/layout';
import Projects from './pages/projects';
import Terminal from './pages/terminal';

function App() {

  return (

    <>
      <Routes>

<Route
      path='/'
      element={<Layout/>}
>
        <Route
              path=''
              element={<Terminal/>}
        />


        <Route
              path='/projects'
              element={<Projects/>}
        />
</Route>


      </Routes>
    </>
  )
}

export default App
