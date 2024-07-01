import React from 'react'
import { Link, useLocation} from 'react-router-dom'

const Navbar2 = (props) => {

  const {first, second} = props;

  let location = useLocation();

  return (
    <>
    <div className=' sticky top-[5rem] flex bg-[#521616] justify-around items-center p-3 text-white font-semibold'>
      { (first==="Book Rooms") && <div>
        <Link className= {` ${(location.pathname==="/" || location.pathname==="/BookingRequest")?"":"text-red-400"} hover:underline hover:text-white`} to="/">{first}</Link>
      </div>}
    {(second==="My Requests") && <div>
      <Link className= {` ${location.pathname==="/yourRequests"?" ":"text-red-400"} hover:underline hover:text-white`} to="/yourRequests" >{second}</Link>
    </div>}
    {(first==="All Requests") && <div>
      <Link className= {` ${location.pathname==="/admin"?" ":"text-red-400"} hover:underline hover:text-white`} to="/admin" >{first}</Link>
    </div>}
    {(second==="Manage Rooms") && <div>
      <Link className= {` ${location.pathname==="/manageRooms"?" ":"text-red-400"} hover:underline hover:text-white`} to="/manageRooms" >{second}</Link>
    </div>}
    </div>
    </>
  )
}

export default Navbar2