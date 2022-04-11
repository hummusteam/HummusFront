import './styles/Index.css'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, Menu, Ingredients, Welcome } from './pages'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join/:tableId" element={<Welcome />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu:categoryId" element={<Menu />} />
      <Route path="/ingredients" element={<Ingredients />} />
    </Routes>
  </Router>,
  document.getElementById('root')
)
