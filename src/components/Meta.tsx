import '../styles/Meta.css'

export default function Meta() {
  const crumbs: string[] = []
  const path = window.location.pathname.toLowerCase().replace('/', '')
  const queryParams = new URLSearchParams(location.search)
  function capitalize(txt: string) {
    return txt.charAt(0).toUpperCase() + txt.slice(1)
  }

  crumbs.push(capitalize(path))
  queryParams.forEach((value: string, key: string) => crumbs.push(` / ${capitalize(key)} / ${capitalize(value)} `))

  return (
    <div className="crumbs" style={{ fontWeight: 'bold' }}>
      / {crumbs}
    </div>
  )
}
