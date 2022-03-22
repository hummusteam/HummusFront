import './styles/Index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Menu } from './pages';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu:categoryId" element={<Menu />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
