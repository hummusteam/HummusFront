import './styles/Index.css'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, Menu, Ingredients, Cart, Stock, Welcome, Orders, Pin, Feedback } from './pages'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/welcome/:tableId" element={<Welcome />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/menu:categoryId" element={<Menu />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/feedbacks" element={<Feedback />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/pin" element={<Pin />} />
    </Routes>
  </Router>,
  document.getElementById('root')
)
