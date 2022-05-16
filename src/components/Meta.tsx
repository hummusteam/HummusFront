import '../styles/Meta.css'

export default function Meta({ table, pin }: { table: number, pin: number }) {
  return (
    <div className='metaContainer'>
      <div><b>{table}</b>	&nbsp; Table Number</div>
      <div><b>{pin}</b> &nbsp; Table PIN</div>
    </div>
  )
}
