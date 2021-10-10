import React from "react";

function Footer(){
    const currentYear = new Date().getFullYear();

    const footerStyle ={
        backgroundColor : "#4A403A",
        color : "lightGray",
        textAlign : "center",
        height: "50px",
        marginTop: "1%",
        position: "relative",
        bottom: "0"
    };

    return (
        <p style = {footerStyle}><p>Copyright © {currentYear} by: Team Unisoft</p></p>
    );       
}

export default Footer;