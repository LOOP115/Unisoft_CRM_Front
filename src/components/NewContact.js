import React, { useState, useContext } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import {EndPointContext} from './App.jsx'
import 'react-calendar/dist/Calendar.css';
import './CSS/Signup.css'
import {Link, Redirect} from "react-router-dom";
import Footer from "./Footer";
import TheNavbar from "./TheNavbar";

function NewContact() {
    const URLEndContext = useContext(EndPointContext)
    const newActivityURL = URLEndContext + '/contact/new'

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");


    const [creatingFailed, setCreatingFailed] = useState(false)
    const [creatingSuccess, setCreatingSuccess] = useState(false)


    function validForm(){
        return (firstName.length > 0 && lastName.length > 0 && company.length > 0 && email.length > 0 && phone.length > 0)
    }

    function handleClick(event) {
        console.log(JSON.stringify({
            firstname:firstName,
            lastname:lastName,
            company:company,
            email:email,
            phone:phone
        }))

        fetch(newActivityURL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({
                firstname:firstName,
                lastname:lastName,
                company:company,
                email:email,
                phone:phone
            })
        }).then(res => {
            if (res.status !== 200) {
                alert("Oops, Contact creation failed")
                setCreatingFailed(true)
                throw Error("Creation failed");

            }

            return res.json()
        }).then(res => {
            setCreatingSuccess(true)
        }).catch(err => console.log(err))

    } // end handleSubmit

    function failWarning(){
        if (creatingFailed) {
            return <Alert variant="danger">
                Creation failed, check Your input or try again later
            </Alert>
        }
        return(<div/>)

    }

    // maybe redirect user to an error page on error


    if (creatingSuccess) {
        return (
            <Redirect to={"/contacts"}/>
        )
    }

    return (
        <div>
            <TheNavbar/>
            <div className = "login_signup_Firm">

                {failWarning}
                <div className="Signup">
                    <Link to={"/contacts"}><Button variant={"warning"} size={"sm"}>Go back</Button></Link>
                    <br/>
                    <h2> New Contacts </h2>
                    <Form >
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Last Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />

                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Company
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={company}
                                onChange={(e) => {
                                    setCompany(e.target.value);
                                }}
                            />

                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />

                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Phone
                            </Form.Label>
                            <Form.Control
                                type="number"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />

                        </Form.Group>

                        <br />
                        <br />
                        <br/>


                        <Button variant="dark" block size="lg" onClick={handleClick} className="btn3" disabled={!validForm()}>
                            Submit
                        </Button>
                    </Form>
                </div>
                <Footer />
            </div>
        </div>
    );

}

export default NewContact;