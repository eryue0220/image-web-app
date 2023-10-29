import { Routes, Route } from 'react-router-dom';
import Page from './Page.js';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Page />} />
      </Routes>
    </div>
  );
}
