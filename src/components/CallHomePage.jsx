import React from "react";
import Header, {firstButton, secondtButton}  from "./Header";
import Info from "./Information";
import Footer from "./Footer";

function CallHomePage(){
    const headerStyle = {
        margin: "auto",
        width : "auto",
        backgroundColor: "#F7F6F2",
        height: "300px",
        bottom : "0px",    
        textAlign: "center", 
    };


    const wholeColor = {
        backgroundColor:"#F7F6F2",
    }
    return (
    <div style = {wholeColor} className = "home-style">
        <div style = {headerStyle}>
        <Header />
        < br/>
        {firstButton()}
        {"- or -"}
        {secondtButton() }
        </div>
        <Info />
        <div style = {{marginTop:"2%"}}>
        <Footer />
        </div>
    </div>
    );
}

export default CallHomePage;
