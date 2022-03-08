import "../styles/Navigation.css";
import { Link } from "react-router-dom";

export default function Navigation({ url }: { url: string }) {
  return (
    <Link to="/">
      <div className="navigation-container">
        <img className="banner" src={url} />
      </div>
    </Link>
  );
}
