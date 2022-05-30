import '../styles/Navigation.css'
import { Link } from 'react-router-dom'

export default function Navigation() {
  const url = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'

  return (
    <>
      <Link to="/">
        <div className="navigation-container">
          <img className="banner" src={url} />
        </div>
      </Link>
    </>
  )
}
