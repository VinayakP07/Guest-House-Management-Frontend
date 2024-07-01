import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props) => {

  const {showAlert} = props


  const navigate = useNavigate();
    const handleClick = () =>{
        localStorage.removeItem('token');
        navigate("/login");
        showAlert("Logged Out Successfully !!","success")
      }


  return (
    <>
      <nav className=" -mt-[3.1rem] pt-1 pb-1 sticky top-0 flex justify-between items-center pl-6 pr-6 bg-yellow-500 text-black">
      <div className="text-[1.5rem] font-bold">
        <img className=' w-[9rem] h-[4.5rem]' src="https://seeklogo.com/images/A/aditya-birla-group-logo-7C1F5CEC79-seeklogo.com.png" alt="" />
      </div>
      <div>

        {!(localStorage.getItem('token')) && <div className=" space-x-5">
        <Link to="/login" ><button className=" bg-black text-white p-2 rounded-lg items-center font-semibold hover:border-black hover:border-2 ">LogIn</button></Link>
        <Link to="/signup" ><button className=" bg-black text-white p-2 rounded-lg items-center font-semibold hover:border-black hover:border-2">SignUp</button></Link>
      </div>}
<div className=' flex space-x-3'>

      { localStorage.getItem('token') && <div>
      <Link to="/login" ><button onClick={handleClick} className=" bg-black text-white p-2 rounded-lg items-center font-semibold hover:border-black hover:border-2 ">LogOut</button></Link>
        </div>}
</div>

      </div>
    </nav>
    </>
  )
}

export default Navbar