/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
// import Navbar from './Components/Navbar';
import Alerts from './Components/Alerts';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useContext, useState } from 'react';
import Home_User from './Components/Home_User';
import background from "./background.jpg";
// import Navbar2 from './Components/Navbar2';
import RoomState from './Context/rooms/roomState';
import RequestState from './Context/request/requestState';
import My_request from './Components/My_request';
import BookingRequest from './Components/Booking_Request';
import Home_Admin from './Components/Home_Admin';
import Manage_Rooms from './Components/Manage_Rooms';
// import AlertState from './Context/alert/alertState';
// import alertContext from './Context/alert/alertContext';





function App() {

  document.body.style.background =`url(${background}) fixed center` ;
  document.body.style.height ="100vh" ;
  document.body.style.backgroundSize ="cover" ;
  document.body.style.backgroundRepeat ="no-repeat" ;

  // const context = useContext(alertContext);
  // const [alert, alertType, showAlert] = context;



  const [alert, setAlert] = useState("");
  const [alertType,setAlertType] = useState("");

  const showAlert = (msg, type) => {
    setAlert(msg);
    setAlertType(type);
  setTimeout(()=>{
        setAlert("");
        setAlertType("");
      }, 3000)
    }





  return (
    <>
      <RoomState>

        {/* <AlertState> */}


      <RequestState>



      <Router>


      <Alerts msg = {alert} type = {alertType}  />
      <Routes>


      <Route exact path="/" element={
        <Home_User showAlert={showAlert} /> 
      }></Route>

      <Route exact path="/admin" element={
        <Home_Admin showAlert={showAlert} /> 
      }></Route>

<Route exact path="/manageRooms" element={
        <Manage_Rooms showAlert={showAlert} /> 
      }></Route>

  <Route exact path="/yourRequests" element={
      <My_request showAlert={showAlert} />
  }></Route>

  <Route exact path="/BookingRequest" element={
      <BookingRequest showAlert={showAlert} />
    }></Route>

  <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>

  <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>

</Routes>

</Router>
      </RequestState>
        {/* </AlertState> */}
      </RoomState>
    </>
  );
}

export default App;
