import './App.css';
import { Routes, Route } from 'react-router';
import Login from './pages/Login';
import Main from './pages/Main';
import { Layout } from './components/Layout';
import React from 'react';
import Navigation from './components/Navigation';

function App() {
  return (
    <React.Fragment>
      <Navigation />
      <Layout>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </Layout>
    </React.Fragment>
  );
}

export default App;
