/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar2 from './Navbar2'
import Navbar from './Navbar'
import RoomItem from './Room_Item'
import roomContext from '../Context/rooms/roomContext';
import { useLocation, useNavigate } from 'react-router-dom';
// import RoomModal from './RoomModal';

const Manage_Rooms = (props) => {

  let isTabHidden = false;

  const {showAlert} = props

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

  const context = useContext(roomContext);
  const [roomUser, roomAdmin, addRoom, removeRoom, fetchAdminRooms, roomAvailable, roomUnavailable, fetchUserRooms] = context;

  const navigate = useNavigate();
  const [room,setRoom] = useState({room : "",type : ""})

  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      fetchAdminRooms();
    }
    else{
      navigate("/login");
    }
  },[])

  const bookRoom = (id) => {
    roomUnavailable(id);
    // fetchAdminRooms();
    window.location.reload();
    showAlert("Room have been Booked","success")
  }

  const availableRoom = (id) => {
    roomAvailable(id);
    // fetchAdminRooms();
    window.location.reload();
    showAlert("Room have been made Available","success")
  }

  const handleModal = () => {
    ref.current.click();
  }

  let avail = null;
  let vip = null;


  const onChange = (e) => {
      setRoom({...room, [e.target.name]:e.target.value})
  }
  
  const handleClick = () => {
      if(document.getElementById("availability").value){
          avail = true
      }
      else{
          avail=false
      }
      if(document.getElementById("vipYes").value){
          vip =true
      }
      else{
          vip=false
      }
      addRoom(room.room , room.type, avail, vip);
        refClose.current.click();
        window.location.reload();
        // showAlert("New room have been Added","success")
    }


  return (
    <>
        <Navbar showAlert = {showAlert} />
        <Navbar2 first="All Requests" second = "Manage Rooms" />

      { roomAdmin.length === 0 && <div className='flex flex-wrap font-extrabold text-4xl text-white justify-center'>
        <p>No rooms available</p>
      </div>}


        <div className='flex flex-wrap justify-center'>
        {roomAdmin.map((room)=>{
          // fetchAdminRooms();
          // fetching();
          return <RoomItem key={room._id} roomAvailable={room.available} roomNo={room.room} roomType={room.type} id={room._id} roomVIP={room.vip} btn2={bookRoom} btn3={availableRoom} showAlert={showAlert} /> ;
        })}
      </div>

      <div className=' flex justify-around mt-12'>
          <button onClick={handleModal} className=' bg-blue-500 text-2xl rounded-lg font-semibold p-2 border-black border-2 text-white' >Add Rooms</button>
      </div>



      <button type="button" ref={ref} className=" collapse btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Room</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                {/* Modal Body */}
                <div className=' flex flex-row justify-center'>
                <div className=' ml-5 flex flex-col mt-[2rem]'>
                <p className=' text-3xl font-mono font-bold'>Add the Information here !!</p>
           
                <p className=' mt-5 ml-[11.5rem] font-mono font-bold text-2xl'>Room No.</p>

                <textarea onChange={onChange} id='room' name='room' value={room.room} placeholder='Enter Room No.' className=' mt-2 border-black border-[0.1rem] w-[27rem] pl-2' rows="1"></textarea>

                <p className=' mt-5 font-mono ml-[9.5rem] font-bold text-2xl'>Type</p>
            
                <textarea onChange={onChange} id='type' name='type' value={room.type} placeholder='Enter the room type' className=' mt-2 border-black border-[0.1rem] w-[27rem] pl-2' rows="1"></textarea>

                <p className=' mt-5 font-mono ml-[12rem] font-bold text-2xl'>Availability</p>

                <input type="radio" className=' mt-3' name="availability" value={true} id="availability" />
                <label htmlFor="Available">Available</label>
              
                <input type="radio" name="availability" value={false} id="unavailability" />
                <label htmlFor="Unavailable">Unavailable</label>



                <p className=' mt-5 font-mono ml-[12rem] font-bold text-2xl'>VIP</p>

                <input type="radio" className=' mt-3' name="vip" value={true} id="vipYes" />
                <label htmlFor="Available">Yes</label>

                <input type="radio" name="vip" value={false} id="vipNo" />
                <label htmlFor="Unavailable">No</label>
                </div>
                </div>

              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={handleClick} type="button" className="btn btn-primary">Add Room</button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Manage_Rooms