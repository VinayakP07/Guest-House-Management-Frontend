/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import requestContext from '../Context/request/requestContext';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';


const Booking_Request = (props) => {

  let isTabHidden = false;

   document.addEventListener('visibilitychange', () => {
   if (document.visibilityState === 'hidden') {
       isTabHidden = true;
   }
  });

  window.onbeforeunload = function(){
    if(isTabHidden){
      localStorage.removeItem('token')
    }
 }

 const {showAlert} = props


    const [req,setreq] = useState({email : "", name : "" , department : "",company : "", checkin : "", checkout : ""})


    const context = useContext(requestContext);
    const [addUserRequest, fetchUserReq, reqUser, reqAdmin, removeUserReq, fetchAdminReq, approveReq, rejectReq] = context;


    const onChange = (e) => {
      setreq({...req, [e.target.name]:e.target.value})
  }


    const handleClick = async() => {
      console.log(req.email,req.name,req.department,req.company,req.checkin,req.checkout, Math.floor(localStorage.getItem('room')));
        await addUserRequest(req.email,req.name,req.department,req.company,req.checkin,req.checkout, Math.floor(localStorage.getItem('room')),localStorage.getItem('roomType'));
        console.log(localStorage.getItem('succe'))
        if(localStorage.getItem('succe')==='true'){
          console.log("in true");
          showAlert(localStorage.getItem('reqMes'), "success");
        }
        else{
          console.log("in false");
          showAlert(localStorage.getItem('reqMes'), "danger");
        }

        setreq({email : "", name : "" , department : "",company : "",checkin : "", checkout: ""});
        let ci = document.getElementById('checkin');
        ci.value = "";
        let co = document.getElementById('checkout');
        co.value = "";
      }



  return (
    <>
    {/* <Navbar showAlert={showAlert}/>
    <Navbar2 first="Book Rooms" second="My Requests"/> */}
            <div className=' mt-[3rem] bg-[#eab308] border-3 border-black text-black p-3 shadow-2xl rounded-2xl ml-[28rem] mr-[28rem] flex flex-row justify-center'>
            <div className=' ml-5 flex flex-col mt-[2rem]'>
            <p className=' text-4xl font-mono font-bold'>Fill details to book a room!!</p>
           
            <p className=' mt-4 font-mono font-bold text-2xl'>Email</p>

            <textarea onChange={onChange} id='email' name='email' value={req.email} className=' text-black mt-2 border-black border-[0.1rem] w-[27rem] pl-2 ' placeholder='Enter your email id here' rows="1"></textarea>

            <p className=' mt-3 font-mono font-bold text-2xl'>Your Name :</p>
            
            <textarea onChange={onChange} id='name' name='name' value={req.name} className='text-black mt-2 border-black border-[0.1rem] w-[27rem] pl-2' rows="1" placeholder='Enter your name here'></textarea>

            <p className=' mt-3 font-mono font-bold text-2xl'>Department :</p>
            
            <textarea onChange={onChange} id='department' name='department' value={req.department} className='text-black mt-2 border-black border-[0.1rem] w-[27rem] pl-2' rows="1" type="text" placeholder='Enter your Department here'></textarea>

            <p className=' mt-3 font-mono font-bold text-2xl'>Company :</p>
            
            <textarea onChange={onChange} id='company' name='company' value={req.company} className='text-black mt-2 border-black border-[0.1rem] w-[27rem] pl-2' rows="1" type="text" placeholder='Enter your Company here'></textarea>

            {/* <p className=' mt-2 font-mono font-bold text-2xl'>Room :</p>
            
            <textarea onChange={onChange} id='room' name='room' value={localStorage.getItem('room')} className='text-black mt-2 border-black border-[0.1rem] w-[27rem] pl-2' rows="1" type="text" placeholder='Enter the room no. here'></textarea>

            <p className=' mt-3 font-mono font-bold text-2xl'>Room Type :</p>
            
            <textarea onChange={onChange} id='roomType' name='roomType' value={localStorage.getItem('roomType')} className='text-black mt-2 border-black border-[0.1rem] w-[27rem] pl-2' rows="1" type="text" placeholder='Enter the room no. here'></textarea> */}

            <p className=' mt-3 font-mono font-bold text-2xl'>Check-In :</p>
            

            <input onChange={onChange} type='date' id='checkin' name='checkin' className=' text-black mt-2 border-black border-[0.1rem] w-[27rem] pl-2' rows="2" placeholder='yyyy-mm-dd'></input>

            <p className=' mt-3 font-mono font-bold text-2xl'>Check-out :</p>
            
            <input onChange={onChange} type='date' id='checkout' name='checkout' className=' text-black mt-2 border-black border-[0.1rem] w-[27rem] pl-2' rows="2" placeholder='yyyy-mm-dd'></input>

            <button onClick={handleClick} className='bg-blue-500 border-2 border-black mt-8 ml-[9.5rem] w-[8rem] font-bold  text-white p-2 rounded-md'>Submit</button>
        </div>
      </div>
    </>
  )
}

export default Booking_Request