import '../styles/CategoryCard.css'
import { Category } from '../types'
import EditFormCategories from './EditFormCategories'
import {useLocalStorage} from "../util/UseLocalStorage";

export default function CategoryCard(category: Category) {
    const [AUTHED, setAuthed] = useLocalStorage("authed", false);


  return (
    <div className="category-card-container" style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {AUTHED ? <EditFormCategories {...category} /> : null}
      <a href={`/menu?category=${category.id}`}>
        <div className="big-category-card">{category.name}</div>
      </a>
    </div>
  )
}
