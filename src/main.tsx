import './styles/Index.css'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, Menu, Ingredients, Cart } from './pages'
import Welcome from './pages/Welcome'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join/:tableId" element={<Welcome />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/menu:categoryId" element={<Menu />} />
      <Route path="/ingredients" element={<Ingredients />} />
    </Routes>
  </Router>,
  document.getElementById('root')
)
