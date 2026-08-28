import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/course/:courseId" element={<CourseView />} />
      </Routes>
    </Router>
  );
}
