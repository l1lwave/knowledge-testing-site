import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Zno from './pages/Zno';
import TestPage from './pages/TestPage';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Completed from './pages/Completed';
import CreateTest from './pages/CreateTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/zno" element={<Zno />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/create-test" element={<CreateTest />} />
      </Routes>
    </Router>
  );
}

export default App;