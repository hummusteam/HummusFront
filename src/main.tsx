import './styles/Index.css'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, Menu, Ingredients, Test } from './pages'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu:categoryId" element={<Menu />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/Test" element={<Test />} />
    </Routes>
  </Router>,
  document.getElementById('root')
)
