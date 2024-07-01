/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import roomContext from '../Context/rooms/roomContext';

const Room_Item = (props) => {

    const {roomNo, roomType, roomVIP, reqStatus,roomCheckin, btn, btn2, btn3, id, roomAvailable, showAlert} = props;
  const navigate = useNavigate();

    const handleClick = () =>{
        localStorage.setItem('room',roomNo)
        if(roomVIP){
            localStorage.setItem('roomType',"VIP")
        }
        else{
            localStorage.setItem('roomType',"Normal")
        }
        navigate('/BookingRequest');
    }

    const context = useContext(roomContext);
    const [roomUser, roomAdmin, addRoom, removeRoom, fetchAdminRooms, roomUnavailable, fetchUserRooms] = context;


  return (
    <>
        <div className=' bg-[#eab308] font-semibold shadow-2xl mt-10 border-black border-2 p-3 w-[90%] rounded-lg items-center flex justify-around space-y-1'>
        {(roomNo) && <div>
            <p><b>Room :</b> {roomNo}</p>
        </div>}
        { (roomType) && <div>
            <p><b>Type : </b> {roomType}</p>
        </div>}
        {(roomCheckin) && <div>
            <p><b>Check- in  :</b> {roomCheckin.slice(0,10)}</p>
        </div>}
        {(roomVIP) && (roomVIP || !roomVIP ) && <div>
            <p><b>Room Type :</b> {`${roomVIP===true?"VIP":"Normal"}`}</p>
        </div>}
        {(reqStatus) &&  <div>
            <p><b>Status :</b> {reqStatus} </p>
        </div>}
        { (btn) && <div className=' flex space-x-5'>
            <button onClick={handleClick} className=' bg-blue-500 text-white font-semibold p-2 rounded-lg border-black border-2' >{btn}</button>
        </div>}
        { (roomAvailable===true) && <div className=' flex space-x-5'>
            <button onClick={()=>{
                btn2(id)
            }} className=' bg-blue-500 text-white font-semibold p-2 rounded-lg border-black border-2' >Book</button>
        </div>}
        {(roomAvailable===true) &&  <i className=" cursor-pointer fa-solid fa-trash" onClick={()=>{
            removeRoom(id);
            showAlert("Room Deleted!!","danger");
            window.location.reload();
            }}></i>}
        { (roomAvailable===false) && <div className=' flex space-x-5'>
            <button onClick={()=>{
                btn3(id)
            }} className=' bg-blue-500 text-white font-semibold p-2 rounded-lg border-black border-2' >Make Available</button>
        </div>}
        {(roomAvailable===false) &&    <i className=" cursor-pointer fa-solid fa-trash" onClick={()=>{
                        removeRoom(id);
                        showAlert("Room Deleted!!","danger");
                        window.location.reload();
                        }}></i>}
    </div>
    </>
  )
}

export default Room_Item