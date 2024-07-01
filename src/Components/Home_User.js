/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import roomContext from '../Context/rooms/roomContext';
import RoomItem from './Room_Item';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import BookingRequest from './Booking_Request';
// import Alerts from './Alerts';


const Home_User = (props) => {

  let isTabHidden = false;

  // Detect when the visibility of the page changes
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

  const context = useContext(roomContext);
  const [roomUser, roomAdmin, addRoom, removeRoom, fetchAdminRooms, roomAvailable, roomUnavailable, fetchUserRooms] = context;
  
  const navigate = useNavigate();



  useEffect(()=>{
    if(localStorage.getItem('token')){
      fetchUserRooms();
    }
    else{
      navigate("/login");
    }
  },[])

  // const [alert, setAlert] = useState("");
  // const [alertType,setAlertType] = useState("");

  // const showAlert = (msg, type) => {
  //   setAlert(msg);
  //   setAlertType(type);
  // setTimeout(()=>{
  //       setAlert("");
  //       setAlertType("");
  //     }, 3000)
  //   }



  return (
    <>
    <Navbar showAlert = {showAlert} />
    <Navbar2 first="Book Rooms" second="My Requests"/>
    {/* <Alerts msg = {alert} type = {alertType}  /> */}

      { roomUser.length === 0 && <div className=' flex flex-wrap font-extrabold text-4xl text-white justify-center'>
        <p>No rooms available.</p>
      </div>}


        {/* <div className='flex flex-wrap justify-center'>
        {roomUser.map((room)=>{
          // fetchUserRooms();
          return <RoomItem key={room._id} roomType={room.type} btn="Apply" /> ;
        })}
      </div> */}

      {roomUser.length !==0 && <BookingRequest showAlert={showAlert} /> }
    </>
  )
}

export default Home_User