/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
// import { useLocation } from 'react-router-dom';


const Alerts = (props) => {
    const {msg, type} = props;

    // const location = useLocation();

    // const topSet =() =>{
    //   if(location.pathname==="/admin"){
    //     return "15rem"
    //   }
    //   else{
    //     return "8rem"
    //   }
    // }

  return (
    <>
        <div className= {` z-10 sticky top-[0rem] alert text-center alert-${type}`} role="alert">
            {msg}
        </div>
    </>
  )
}

export default Alerts