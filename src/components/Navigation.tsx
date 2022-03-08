import { useNavigate } from "react-router-dom";
import "../styles/Navigation.css";

export default function Navigation({ url }: { url: string }) {
  const navigate = useNavigate();
  const redirect = () => {
    navigate('/');
  };

  return (
    <div className="navigation-container" onClick={redirect}>
      <img className="banner" src={url} />
    </div>
  );
}
