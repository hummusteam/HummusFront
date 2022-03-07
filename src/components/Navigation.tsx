import "../styles/Navigation.css";

export default function Navigation({ url }: { url: string }) {
  return (
    <div className="navigation-container">
      <img className="banner" src={url} />
    </div>
  );
}
