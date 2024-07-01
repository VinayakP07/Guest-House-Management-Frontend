import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Alerts from './Alerts';

const Signup = () => {


  const [cred, setCred] = useState({username : "" , email : "" , password : ""})

  const host = "http://localhost:5000";

  const navigate = useNavigate();

  const onChange = (e) =>{
      setCred({...cred,[e.target.name] : e.target.value})
  }

  const submit = async(e) =>{
      e.preventDefault();
      const response = await fetch(`${host}/auth/user/createUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username:cred.username, email : cred.email, password : cred.password}),
        });
        const json = await response.json();
        if(json.success){
          localStorage.setItem('token',json.authToken);
          showAlert("Account Created Successfully","success")
          navigate("/");
        }
        else{
          showAlert("User Already Exist", "danger")
        }
  }

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
    <Navbar/>
    <Navbar2/>
    <Alerts msg = {alert} type = {alertType}  />

        <div>
        <h1 className=' text-white text-4xl font-mono mt-[1rem] font-bold flex justify-center'>SignUp To Create an Account and Continue !!</h1>
      </div>
       <form onSubmit={submit} className=' bg-[#eab308] pt-4 rounded-3xl shadow-2xl pb-4 ml-[27rem] mr-[27rem] flex justify-center mt-[2.5rem] mb-[12rem] text-2xl'>
            <div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className=' font-bold mb-2'>Email address</label> <br />
                    <input type="email" required value={cred.email} name='email' onChange={onChange} className=" mt-2 rounded-lg p-1 text-center w-[25rem] border-2 border-black form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div> <br />
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className=' font-bold mb-2'>Username</label> <br />
                    <input type="text" required minLength={3} value={cred.username} name='username' onChange={onChange} className=" mt-2 rounded-lg p-1 text-center  w-[25rem] border-2 border-black form-control" id="exampleInputUsername" placeholder="Username"/>
                </div> <br />
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className=' font-bold mb-2'>Password</label> <br />
                    <input type="password" required minLength={8} value={cred.password} name='password' onChange={onChange} className=" mt-2 rounded-lg p-1 text-center  w-[25rem] border-2 border-black form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div> <br />
                <div className=' flex justify-center'>
                    <button type="submit" className=" bg-blue-500 p-1 font-semibold rounded-lg border-2 border-black btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </>
  )
}

export default Signup