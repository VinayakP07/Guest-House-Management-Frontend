/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import roomContext from './roomContext'


const RoomState = (props) => {

    const host = "http://localhost:5000"

    let initialRoomUser = [];
    const [roomUser, setRoomUser] = useState(initialRoomUser);

    let initialRoomAdmin = [];
    const [roomAdmin, setRoomAdmin] = useState(initialRoomAdmin);

    
    // Adding Rooms in Database

    const addRoom = async (room, type, available, vip) => {

        // API Call

        const response = await fetch(`${host}/rooms/addRoom`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth_token" : localStorage.getItem("token"),
            },
          body: JSON.stringify({type, available, vip, room}),
          });
          const json = await response.json();

          // Logic
        setRoomUser(roomUser.concat(json));
    }


    // Removing Rooms from Database

    const removeRoom = async (id) =>{

         // API CALL 
         const response = await fetch(`${host}/rooms/removeRoom/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth_token" : localStorage.getItem("token"),
            },
          });
  
  
          // Logic
          let newRoom = roomUser.filter((n) => {
             return n._id !== id 
            });
            setRoomUser(newRoom);
    }



    // Fetching Rooms for Admin 
    const fetchAdminRooms = async () =>{

        // API Call
        const response = await fetch(`${host}/rooms/admin/fetchRooms`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth_token" : localStorage.getItem("token"),
            },
          });
          const json = await response.json();
          setRoomAdmin(json);
    }


    // Making Room Available
    const roomAvailable = async (id) =>{

                // API Call
                const response = await fetch(`${host}/rooms/roomAvailable/${id}`, {

                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "auth_token" : localStorage.getItem("token"),
                    },
                });
                const json = await response.json();
    }


        // Making Room Unavailable
        const roomUnavailable = async (id) =>{

            // API Call
            const response = await fetch(`${host}/rooms/roomUnavailable/${id}`, {

                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token" : localStorage.getItem("token"),
                },
            });
            const json = await response.json();
}


    // Fetching Rooms for the User
    const fetchUserRooms = async () =>{

        // API Call
        const response = await fetch(`${host}/rooms/user/fetchRooms`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth_token" : localStorage.getItem("token"),
            },
          });
          const json = await response.json();
          setRoomUser(json);
    }



  return (
    <>
        <roomContext.Provider value={[roomUser, roomAdmin, addRoom, removeRoom, fetchAdminRooms, roomAvailable, roomUnavailable, fetchUserRooms]}>
            {props.children}
        </roomContext.Provider>
    </>
  )
}

export default RoomState