/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
// import Alerts from './Alerts';

const Login = (props) => {

  const {showAlert} = props

  const [cred, setCred] = useState({email : "" , password : ""})

  const host = "http://localhost:5000";

  const navigate = useNavigate();

  const onChange = (e) =>{
      setCred({...cred,[e.target.name] : e.target.value})
  }

  const submit = async(e) =>{
      e.preventDefault();
      const response = await fetch(`${host}/auth/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email : cred.email, password : cred.password}),
        });
        const json = await response.json();
        if(json.success){
          localStorage.setItem('token',json.authtoken);
          showAlert("Logged In Successfully","success");
          navigate("/");
        }
        else if(!json.success){
          const response = await fetch(`${host}/auth/admin/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email : cred.email, password : cred.password}),
          });
          const json = await response.json();
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            showAlert("Logged In Successfully","success");
            navigate("/admin");
          }
          else{
            showAlert("Invalid Credentials","danger");
          }
        }
  }



    
    
    return (
      <>
    <Navbar/>
    <Navbar2/>
    {/* <Alerts msg = {alert} type = {alertType}  /> */}
      <div>
        <h1 className=' text-white text-4xl font-mono mt-[4rem] font-bold flex justify-center'>LogIn To Continue !!</h1>
      </div>
        <form onSubmit={submit} className=' bg-[#eab308] pt-8 pb-8 ml-[28rem] rounded-3xl shadow-2xl mr-[28rem] flex justify-center mt-[2.8rem] mb-[12rem] text-2xl'>
            <div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className=' font-bold mb-2'>Email address</label><br />
                    <input type="email" value={cred.email} name='email' required onChange={onChange} className=" rounded-lg p-1 text-center mt-2 w-[25rem] border-2 border-black form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div><br />
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className=' font-bold'>Password</label> <br />
                    <input type="password" minLength={8} required value={cred.password} name='password' onChange={onChange} className=" rounded-lg p-1 text-center mt-2  w-[25rem] border-2 border-black form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className=' mt-8 flex justify-center'>
                    <button type="submit" className=" bg-blue-500 rounded-lg p-1 border-2 border-black font-semibold mt-2 btn btn-primary">LogIn</button>
                </div>
            </div>
        </form>

    </>
  )
}

export default Login