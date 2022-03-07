import "../styles/Meta.css";

export default function Meta({ path }: { path: string }) {
  const paths = path.split("/");

  return <div className="crumbs">
      {paths.map(p => {
          " / " + p 
      })}
      </div>;
}
