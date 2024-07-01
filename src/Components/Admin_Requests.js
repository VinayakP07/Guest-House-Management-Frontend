/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Admin_Requests = (props) => {

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

    const navigate = useNavigate();


    const { reqEmail, reqName, reqDepartment, reqCompany, reqCheckin, reqCheckout,  btn1, btn2, id,showAlert} = props

    const handleApprove = () =>{
        btn1(id);
        showAlert("Request have been Approved!!" ,"success")
    }

    const handleReject = () =>{
        btn2(id);
        showAlert("Request have been Rejected!!" ,"success")
    }


  return (
    <>
    <div className=' bg-yellow-500 font-semibold shadow-2xl mt-10 border-black border-2 p-3 w-[90%] rounded-lg items-center flex-col justify-around space-y-1'>
        <div>
            <p><b>Email :</b> {reqEmail}</p>
        </div>
        <div>
            <p><b>Name :</b> {reqName}</p>
        </div>
        <div>
            <p><b>Department :</b> {reqDepartment}</p>
        </div>
        <div>
            <p><b>Company :</b> {reqCompany}</p>
        </div>
        <div>
            <p><b>Check-in :</b> {reqCheckin}</p>
        </div>
        <div>
            <p><b>Check-out :</b> {reqCheckout}</p>
        </div>
        <div className=' flex space-x-3 mt-2'>
            <div className=' flex space-x-5'>
                <button onClick={handleApprove} className=' bg-blue-500 text-white font-semibold p-2 rounded-lg border-black border-2' >Approve</button>
            </div>
            <div className=' flex space-x-5'>
                <button onClick={handleReject} className=' bg-blue-500 text-white font-semibold p-2 rounded-lg border-black border-2' >Reject</button>
            </div>
        </div>
    </div>

    </>
  )
}

export default Admin_Requests