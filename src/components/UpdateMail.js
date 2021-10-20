import React, {useContext, useState}from "react";
import Button from "react-bootstrap/Button";
import TheNavbar from "./TheNavbar";
import {Form} from "react-bootstrap";
import {EndPointContext} from "./App";
import {Link} from "react-router-dom";
import Footer from "./Footer";


function UpdateMail(){

    const URLEndContext = useContext(EndPointContext)
    const URL = URLEndContext + "/activity/" + JSON.parse(localStorage.getItem("actInfo"))["actid"] + "/update/send"

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [sending, setSending] = useState(false)
    const inviteStyle = {
        backgroundColor: "#E6E6E6",
        fontFamily: "Architects Daughter",
        textAlign: "center",
        height: "80vh",
        minHeight: "auto",
        maxHeight: "auto",
        marginTop: "0"
    }

    function checkInput(){
        return(title.length > 0)
    }

    function handleSubmit(){
        setSending(true)
        fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({
                    title: title,
                    content: body
                })
        }).then(res => {
            if (res.status !== 200) {
                setSending(false)
                alert("Oops, failed to send")
                throw Error("Creation failed");

            }
            console.log(res.status)
            return res.text()
        }).then(res => {
            setRedirect(true)
            console.log(res)
        }).catch(err => console.log(err))
    }



    if (redirect){
        return (
            <div style = {{height:"100vh",maxWidth:"100vw", width:"100vw"}}>
                <div  style = {{height:"10vh", backgroundColor:"#222831"}}><TheNavbar/></div>
                    <div className = "dashboard-background-style" style = {{textAlign:"center"}}>
                    <br/> <br/>
                    <h1>
                        Email Successfully Sent
                    </h1>
                    <br/>
                    <br/>
                    <Link to={"/dashboard"}><Button>Go back</Button></Link>
                </div>
                <Footer/>
            </div>
        )
    }

    if (sending){
        return (
            <div style = {{height:"100vh",maxWidth:"100vw", width:"100vw"}}>
            <div  style = {{height:"10vh", backgroundColor:"#222831"}}><TheNavbar/></div>
                <div className = "dashboard-background-style" style = {{textAlign:"center"}}>
                <br/> <br/>
                <h1>
                    Sending...
                </h1>
            </div>
            <Footer/>
        </div>
        )
    }

    return(
        <div style = {{height:"100vh",maxWidth:"100vw", width:"100vw"}}>
            <div  style = {{height:"10vh", backgroundColor:"#222831"}}><TheNavbar/></div>
                <div className = "dashboard-background-style">
                    <div className = "login_signup_Firm" style = {inviteStyle}>
                        <h1>
                            Send Update Email
                        </h1>
                        <br/>
                        <br/>
                        <h5>You've Successfully edited the event</h5><br/><br/>
                        <p>You can send an email and get all participants updated down below</p><br/>
                        <Form>
                            <Form.Group>
                                <Form.Label>Email Title *</Form.Label>
                                <Form.Control type="text"
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                            }}
                                />
                            </Form.Group><br/>
                            <Form.Group>
                                <Form.Label>Main Body</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="text"
                                    value={body}
                                    onChange={(e) => {
                                        setBody(e.target.value);
                                    }}
                                    />
                            </Form.Group><br/>
                            <Button disabled={!checkInput()} onClick={handleSubmit}>Send</Button>
                        </Form>

                        <br/>
                        <br/>
                        <h6>or you can continue without sending an email.</h6>
                        <Link to={"/dashboard"}><Button>Continue w/o sending</Button></Link>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default UpdateMail
