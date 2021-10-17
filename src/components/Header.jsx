import React from "react";
import {Link, Redirect} from "react-router-dom";


function Header(){
    const headerStyle = {
        textAlign: "center",

      };
    
      return (
        
        <header style = {headerStyle}><h1 style ={{fontSize:"300%"}}>Client Relationship Management System</h1> </header>      
        
      );
}



function firstButton(){
  return (<Link to={"signup"}><button className = "btn1">Sign up</button></Link>);
}


function secondtButton(){
  return (<Link to={"login"}><button className = "btn2">Log in</button></Link>);
}

export default Header;
export {firstButton, secondtButton};