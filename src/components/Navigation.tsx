import '../styles/Navigation.css'
import { Link } from 'react-router-dom'
import Button from "./Button";
import {useLocalStorage} from "../util/UseLocalStorage";

export default function Navigation({ url }: { url: string }) {
    const [AUTHED, setAuthed] = useLocalStorage("authed", false);
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
