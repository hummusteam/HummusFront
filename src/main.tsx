import './styles/Index.css'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, Menu, Ingredients, Cart, Stock } from './pages'
import Welcome from './pages/Welcome'
import Orders from './pages/orders'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join/:tableId" element={<Welcome />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/menu:categoryId" element={<Menu />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  </Router>,
  document.getElementById('root')
)
