import '../styles/Meta.css';

export default function Meta() {
  const capitalize = (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  };
  const crumbs: string[] = [];

  const path = window.location.pathname.toLowerCase().replace('/', '');
  crumbs.push(capitalize(path));

  const queryParams = new URLSearchParams(location.search);
  queryParams.forEach((value: string, key: string) => crumbs.push(` / ${capitalize(key)} / ${capitalize(value)} `));

  return (
    <div className="crumbs" style={{ fontWeight: 'bold' }}>
      / {crumbs}
    </div>
  );
}
