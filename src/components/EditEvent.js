import React, { useState, useContext } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import {EndPointContext} from './App.jsx'
import {Dropdown} from "react-bootstrap";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';
import './CSS/Signup.css'
import {Link, Redirect} from "react-router-dom";
import Footer from "./Footer";
import TheNavbar from "./TheNavbar";
import TimeKeeper from 'react-timekeeper';

function EditEvent() {
    let eventItem = JSON.parse(localStorage.getItem("actInfo"))
    const URLEndContext = useContext(EndPointContext)
    const updateActivityURL = URLEndContext + '/activity/' + eventItem["actid"] + "/update"

    console.log(updateActivityURL)

    const [title, setTitle] = useState(eventItem["title"]);
    const [desc, setDesc] = useState(eventItem["desc"]);
    const [location, setLocation] = useState(eventItem["location"]);
    let dateString = eventItem["time"].slice(5,16)
    let eventDate = dayjs(dateString, 'D MMM YYYY')

    let timeString = eventItem["time"].slice(18,22)


    const [date, setDate] = useState(eventDate.toDate());
    const formatDate = dayjs(date).format('YYYY-MM-DD');
    const [value, setTime] = useState({formatted24: timeString})
    const formatFullTime = formatDate + " " + value.formatted24 + ":00"

    const onChange = date => {
        setDate(date)
    }

    const onChangeDateTime = time => {
        setTime(time)
        console.log(formatFullTime)
    }

    const [creatingFailed, setCreatingFailed] = useState(false)
    const [creatingSuccess, setCreatingSuccess] = useState(false)

    const activityStyle = {
        backgroundColor: "#E6E6E6",
        fontFamily: "Architects Daughter",
        textAlign: "center",
        height: "86vh",
        minHeight: "auto",
        maxHeight: "auto",
        marginTop: "0"
    }

    function validForm(){
        return (title.length > 0)
    }

    function handleClick(event) {
        console.log(JSON.stringify({
            title:title,
            desc:desc,
            location:location,
            time:formatFullTime,

            status:"something" //TODO change this
        }))

        fetch(updateActivityURL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({
                title:title,
                desc:desc,
                location:location,
                time:formatFullTime,
                status:"something" //TODO change this
            })
        }).then(res => {
            if (res.status !== 200) {
                alert("Oops, Activity creation failed")
                setCreatingFailed(true)
                throw Error("Creation failed");

            }

            return res.json()
        }).then(res => {
            localStorage.setItem("actid", res["actid"])
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
        if (eventItem["invite"].length === 0){
            return (

                <Redirect to={"/dashboard"}/>
            )
        }
        return (

            <Redirect to={"/updateEmail"}/>
        )
    }

    return (
        <div style = {{height:"100vh"}}>
            <div  style = {{height:"10vh", backgroundColor:"#222831"}}><TheNavbar/></div>
            <div className = "dashboard-background-style">
                <div className = "login_signup_Firm" style = {activityStyle}>

                    {failWarning}
                    <Link to={"/dashboard"}><Button variant={"warning"} size={"sm"}>Go back</Button></Link>
                    <div style = {{marginLeft:"5rem", marginRight: "5rem"}} >
                        <br/><br/>
                        <h1> Edit Event </h1><br/>
                        <Form >
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    placeholder="Enter the Title of the event (eg. have coffee)"
                                    autoFocus
                                    type="text"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group>
                                <br/>
                                <Form.Label>
                                    Address
                                </Form.Label>
                                <Form.Control
                                    placeholder="Where it's gonna take place"
                                    type="text"
                                    value={location}
                                    onChange={(e) => {
                                        setLocation(e.target.value);
                                    }}
                                />

                            </Form.Group>

                            <Form.Group>
                                <br/>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Anything goes"
                                    rows={3}
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </Form.Group>

                            <br /><br/>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Choose Date
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div>
                                        <Calendar
                                            onChange={onChange}
                                            date={date}
                                        />
                                    </div>
                                    {formatDate}
                                </Dropdown.Menu>
                            </Dropdown>

                            <br/>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Pick a Time
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <TimeKeeper
                                        onChange={onChangeDateTime}
                                        value={value}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            <br/>
                            Current Chosen Time: {formatFullTime}
                            <br />
                            <br/><br/>


                            <Button variant="dark" block size="lg" onClick={handleClick} className="btn3" disabled={!validForm()}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );

}

export default EditEvent;