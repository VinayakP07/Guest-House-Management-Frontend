/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import requestContext from './requestContext'

const RequestState = (props) => {

    const host = "http://localhost:5000"

    let initialRequestUser = [];
    const [reqUser, setReqUser] = useState(initialRequestUser);

    let initialRequestAdmin = [];
    const [reqAdmin, setReqAdmin] = useState(initialRequestAdmin);


    // Adding User Request 
    const addUserRequest = async (email, name, department, company, checkin, checkout, room, roomtype) =>{

        // API Call

        const response = await fetch(`${host}/requests/addRequest`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth_token" : localStorage.getItem("token"),
            },
          body: JSON.stringify({email, name, department, company, checkin, checkout, room,roomtype}),
          });
          const json = await response.json(); 
          
          
          // Logic
          setReqUser(reqUser.concat(json));
          localStorage.setItem('succe',json.success);
          localStorage.setItem('reqMes',json.message);
          
    }


    // Fetching Request for User

    const fetchUserReq = async () =>{
        // API Call
        const response = await fetch(`${host}/requests/user/fetchRequest`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth_token" : localStorage.getItem("token"),
            },
          });
          const json = await response.json();
          setReqUser(json);
    }


    // Remove User Request
    const removeUserReq = async (id) =>{
                // API CALL 
                const response = await fetch(`${host}/requests/removeRequest/${id}`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      "auth_token" : localStorage.getItem("token"),
                    },
                  });
          
          
                  // Logic
                  const newReq = reqUser.filter((n) => {
                     return n._id !== id 
                    });
                    setReqUser(newReq);
    }



    // Fetching Request for Admin

    const fetchAdminReq = async () =>{
        // API Call
        const response = await fetch(`${host}/requests/admin/fetchRequest`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth_token" : localStorage.getItem("token"),
            },
          });
          const json = await response.json();
          setReqAdmin(json);
    }


    // Approving Request
    const approveReq = async (id) =>{

        // API Call
        const response = await fetch(`${host}/requests/admin/approveRequest/${id}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth_token" : localStorage.getItem("token"),
            },
        });
        const json = await response.json();
    };



        // Rejecting Request
        const rejectReq = async (id) =>{

            // API Call
            const response = await fetch(`${host}/requests/admin/rejectRequest/${id}`, {
    
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token" : localStorage.getItem("token"),
                },
            });
            const json = await response.json();
        };


  return (
    <>
        <requestContext.Provider value={[addUserRequest, fetchUserReq, reqUser, reqAdmin, removeUserReq, fetchAdminReq, approveReq, rejectReq]}>
            {props.children}
        </requestContext.Provider>
    </>
  )
}

export default RequestState