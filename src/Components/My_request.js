/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import requestContext from '../Context/request/requestContext';
import { useNavigate } from 'react-router-dom';
import RoomItem from './Room_Item';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';


const My_request = (props) => {

  const {showAlert} = props;

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

  const context = useContext(requestContext);
  const [addUserRequest, fetchUserReq, reqUser, reqAdmin, removeUserReq, fetchAdminReq, approveReq, rejectReq] = context;
  const navigate = useNavigate();


  useEffect(()=>{
    if(localStorage.getItem('token')){
      fetchUserReq();
    }
    else{
      navigate("/login");
    }
  },[])

  return (
    <>
    <Navbar showAlert={showAlert} />
    <Navbar2 first="Book Rooms" second="My Requests"/>


      {reqUser.length === 0 && <div className='flex flex-wrap font-extrabold text-4xl text-white justify-center'>
            <p>No Requests</p>
      </div>}

      <div className='flex flex-wrap justify-center'>
        {reqUser.map((req)=>{
          return <RoomItem key={req._id} roomNo={req.room} roomCheckin={req.checkin} reqStatus={req.status} showAlert={showAlert} /> ;
        })}
      </div>

    </>
  )
}

export default My_request