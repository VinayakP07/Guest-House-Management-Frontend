/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import Navbar2 from './Navbar2'
import Navbar from './Navbar'
import requestContext from '../Context/request/requestContext';
import { useNavigate } from 'react-router-dom';
import AdminRequests from './Admin_Requests';


const Home_Admin = (props) => {

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
    
    const {showAlert} = props;
  
    useEffect(()=>{
      if(localStorage.getItem('token')){
        fetchAdminReq();
      }
      else{
        navigate("/login");
      }
    },[])

    const handleApprove = (id) =>{
        approveReq(id);
    }

    const handleReject = (id) =>{
        rejectReq(id);
    }


  return (
    <>
        <Navbar showAlert={showAlert} />
        <Navbar2 first="All Requests" second = "Manage Rooms" />



        { reqAdmin.length === 0 && <div className='flex flex-wrap font-extrabold mt-5 text-4xl text-white justify-center'>
        <p>No Requests</p>
      </div>}


        <div className='flex flex-wrap justify-center'>
        {reqAdmin.map((req)=>{
            fetchAdminReq();
          return <AdminRequests key={req._id} id={req._id} reqEmail={req.email} reqName={req.name} reqDepartment={req.department} reqCompany={req.company} reqCheckin={req.checkin} reqCheckout={req.checkout}  btn1={handleApprove} btn2={handleReject} showAlert={showAlert}/> ;
        })}
      </div>
    </>
  )
}

export default Home_Admin