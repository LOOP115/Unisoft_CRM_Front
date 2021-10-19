import React, {useContext, useState}from "react";
import Button from "react-bootstrap/Button";
import TheNavbar from "./TheNavbar";
import {Form} from "react-bootstrap";
import {EndPointContext} from "./App";
import {Link} from "react-router-dom";


function InviteMail(){

    const URLEndContext = useContext(EndPointContext)
    const URL = URLEndContext + "/activity/" + JSON.parse(localStorage.getItem("actInfo"))["actid"] + "/invite/send"

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [redirect, setRedirect] = useState(false)

    function checkInput(){
        return(title.length > 0)
    }

    function handleSubmit(){
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
                alert("Oops, failed to send")
                throw Error("Creation failed");

            }
            return res.text()
        }).then(res => {
            setRedirect(true)
        }).catch(err => console.log(err))
    }



    if (redirect){
        return (
            <div>
                <TheNavbar/>
                <h1>
                    Invitation Successfully Sent
                </h1>
                <br/>
                <br/>
                <Link to={"/dashboard"}><Button>Go back</Button></Link>
            </div>
        )
    }

    return(
        <div>
            <TheNavbar/>
            <h1>
                Send Invitation
            </h1>
            <br/>
            <br/>
            <h4>You can send an email and get all participants updated down below, participants who has an account will receive an invitation on their dashboard</h4>
            <Form>
                <Form.Group>
                    <Form.Label>Email Title *</Form.Label>
                    <Form.Control type="text"
                                  value={title}
                                  onChange={(e) => {
                                      setTitle(e.target.value);
                                  }}
                    />
                </Form.Group>
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
                </Form.Group>
                <Button disabled={!checkInput()} onClick={handleSubmit}>Send</Button>
            </Form>

            <br/>
            <br/>
            <Link to={"/dashboard"}><Button>Cancel</Button></Link>
        </div>
    )
}

export default InviteMail