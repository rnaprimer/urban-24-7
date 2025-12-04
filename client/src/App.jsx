import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfessionalList from './components/ProfessionalList';
import AdminPanel from './components/AdminPanel';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<ProfessionalList />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
