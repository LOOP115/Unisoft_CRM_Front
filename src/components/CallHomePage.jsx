import React from "react";
import Header, {firstButton, secondtButton}  from "./Header";
import Info from "./Information";
import Footer from "./Footer";

function CallHomePage(){
    const headerStyle = {
        margin: "auto",
        width : "auto",
        height: "25vh",
        minHeight:"auto",
        backgroundColor: "#E6E6E6",
        minHeight: "250px",
        bottom : "0px",    
        textAlign: "center", 
    };


    const wholeColor = {
        backgroundColor:"#F7F6F2",
    }
    return (
    <div style = {wholeColor} className = "home-style">
        <div style = {headerStyle}>
        < br/>< br/>< br/>
        <Header />
        < br/>
        {firstButton()}
        {"- or -"}
        {secondtButton() }
        </div>
        
        <div style = {{height:"75vh",minHeight:"auto"}}>
        <Info />
        <Footer />
        </div>
    </div>
    );
}

export default CallHomePage;
