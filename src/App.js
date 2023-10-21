// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeScreen from './components/homescreen.jsx';
import PostScreen from './components/postscreen.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/post/:id" element={<PostScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
