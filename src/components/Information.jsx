import React from "react";

function Info(){
    const textStyle = {
        textAlign:"center",
        minWidth: "500px",
    }

    return(
        <div className="home-content" >
        <br/><br/>
        <h2 style = {textStyle}>We provide</h2><br/><br/><br/>
        <div className="home-content-detail"  >
            <div className = "box1"  style = {textStyle} > 
                <td style = {textStyle} class = "center"> 
                    <div className = "home-content-detail-text">
                        <br/><br/>
                        <h1 style = {{margin:"0% auto 2% auto"}}>Store Your </h1>
                        <h1>Contacts</h1>
                        <h3 style = {{margin:"15% auto 2% auto"}}>Paper Free, Indexing in </h3>
                        <h3>lightning speed</h3>
                    </div>
                    <div className = "home-content-img"><img className = "home-content-img-size" src = "https://media.istockphoto.com/photos/aerial-view-of-crowd-connected-by-lines-picture-id1180187740?b=1&k=20&m=1180187740&s=170667a&w=0&h=QOfnYYbuOvnEV-XgM0QNP_Rk1mFyNVuxgOkLIUwI-YQ=" alt = "contact_img" /></div>
                </td>
            </div>
                <div className = "box2" style = {textStyle}>
                    <td style = {textStyle} class = "center"> 
                        <div className = "home-content-detail-text">
                        <br/><br/>
                        <h1 style = {{margin:"0% auto 2% auto"}}>Key Dates </h1>
                        <h1>Reminder</h1>
                        <h3 style = {{margin:"15% auto 2% auto"}}>So that you won't </h3>
                        <h3>forget anything</h3>
                        </div>
                        <div className = "home-content-img"><img className = "home-content-img-size" src = "https://media.istockphoto.com/photos/close-up-of-calendar-on-the-table-planning-for-business-meeting-or-picture-id995353918?b=1&k=20&m=995353918&s=170667a&w=0&h=mEfKniHJfu9-zc9ijrFFcGygm8OFdAW40wuwNni8FWo=" alt = "contact_img" /></div>
                    </td>
                </div>
                <div className = "box3" style = {textStyle}>
                    <td style = {textStyle} class = "center">
                        <div className = "home-content-detail-text">
                        <br/><br/>
                        <h1 style = {{margin:"0% auto 2% auto"}}>Auto Templated Email </h1>
                        <h3 style = {{margin:"15% auto 2% auto"}}>Easier life with </h3>
                        <h3>automated stuff</h3>
                        </div>
                        <div className = "home-content-img"><img className = "home-content-img-size" src = "https://media.istockphoto.com/photos/email-marketing-concept-picture-id1282799241?b=1&k=20&m=1282799241&s=170667a&w=0&h=0MRaTWVvtApyUjK2I4wOMbQSDD0HMSxP-I_O7egPFDQ=" alt = "contact_img" /></div>
                    </td>
                </div>
            </div>
        </div>
    );

}

export default Info;