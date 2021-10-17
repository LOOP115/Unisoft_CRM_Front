import React from "react";

function Footer(){
    const currentYear = new Date().getFullYear();

    const footerStyle ={
        backgroundColor : "#4A403A",
        marginBottom: "-0%",
        color : "lightGray",
        textAlign : "center",
        height: "4rem",
        width: "100%",
        position: "absolute",
        bottom: "0"
    };

    return (
        <p style = {footerStyle}><p>Copyright © {currentYear} by: Team Unisoft</p></p>
    );       
}

export default Footer;