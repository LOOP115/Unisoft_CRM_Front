import React, {useContext, useState, useEffect} from "react";
import TheNavbar from "./TheNavbar";
import {EndPointContext} from "./App";
import dayjs from "dayjs";
import Form from "react-bootstrap/Form";
import {ButtonGroup, Dropdown} from "react-bootstrap";
import Calendar from "react-calendar";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Footer from "./Footer";

let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


function Profile(){
    const URLEndContext = useContext(EndPointContext)
    const URL = URLEndContext + '/account'
    const deleteURL = URLEndContext + '/deleteAccount'

    const [ogData, setOgData] = useState({})
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [birthday, setBirthday] = useState(new Date())

    const [lock, setLock] = useState(true)
    const [redirect, setRedirect] = useState(false)
    const [selected, setSelected] = useState(false)


    const formatDate = dayjs(birthday).format('YYYY-MM-DD');
    const profileStyle = {
        backgroundColor: "#E6E6E6",
        fontFamily: "Architects Daughter",
        textAlign: "center",
        height: "86vh",
        minHeight: "auto",
        maxHeight: "auto",
        marginTop: "0"
      }


    const onChange = date => {
        setBirthday(date)
    }

    useEffect(()=>{
        setup()
    }, [])

    function setup(){
        fetch(URL, {
            method: "GET",
            credentials:'include', headers: {
                'Content-Type': 'application/json'
            }}).then
        (res=>{
                if (res.status !== 200) throw new Error("cannot fetch events")
                return res.json()
            }

        ).then(data => {
            setOgData(data)
            let temp = data["birth"].slice(5,16)
            let date = dayjs(temp, 'D MMM YYYY')
            setBirthday(date.toDate())
            setFirstname(data["firstname"])
            setLastname(data["lastname"])
            setEmail(data["email"])
            setUsername(data["username"])
            setLoading(false)
            console.log(JSON.stringify(data))
            return data
        }).catch(err => console.log(err))
    }

    function validForm(){
        return (email.length > 0) && (username.length > 0)
    }

    function showDateSelector(){
        if (!lock){
            return(
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Date of Birth
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div>
                            <Calendar
                                onChange={onChange}
                                date={birthday}
                            />
                        </div>
                        {formatDate}
                    </Dropdown.Menu>
                </Dropdown>
            )
        }
    }

    function handleClick(event) {

        fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                birth:formatDate
            })
        }).then(res => {
            if (res.status !== 200) {
                if (res.status === 300){
                    alert("Oops, You have made no changes")
                }else{
                    alert("Oops, Cannot update")
                }

                throw Error("update failed");

            }

            return res.json()
        }).then(res => {
            window.location.reload()
        }).catch(err => console.log(err))

    }

    function display(){
        if(loading){
            return(
                <h4>Loading...</h4>
            )
        }
        else{
            return (
                <Form >
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            placeholder="Enter Your Email Address"
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            readOnly={lock}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control
                            placeholder="Enter Your Username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            readOnly={lock}
                        />

                        <Form.Group>
                            <Form.Label>
                                First Name
                            </Form.Label>
                            <Form.Control
                                placeholder="Enter Your Firstname"
                                type="text"
                                value={firstname}
                                onChange={(e) => { setFirstname(e.target.value);}}
                                readOnly={lock}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Last Name
                            </Form.Label>
                            <Form.Control
                                placeholder="Enter Your Lastname"
                                type="text"
                                value={lastname}
                                onChange={(e) => { setLastname(e.target.value);}}
                                readOnly={lock}
                            />
                        </Form.Group>

                    </Form.Group>

                    <br />
                    {showDateSelector()}
                    Your date of birth: {formatDate}

                    <br /><br />

                    {showButton()}
                    <br/>
                    <br/>
                    <br/>
                    {showDelete()}
                </Form>
            )
        }
    }

    function handleUpdate(){
        setLock(false)
    }
    function handleCancel(){
        setLock(true)
    }

    function showDelete(){
        if (!lock){
            if (selected){
                return (<div>
                    <h5 style = {{color:"red"}}>You are trying to Delete your Account, This operation cannot be reverted, THINK AGAIN BEFORE PROCEED</h5>
                    <Button variant={"primary"} onClick={unselect} size={"lg"}>Cancel Deletion</Button>
                    <br/>
                    <br/>
                    <Button variant={"danger"} size={"sm"} onClick={handleDelete}>Confirm Delete Account</Button>

                </div>)
            }
            return (<Button variant={"danger"} size={"sm"} onClick={handleSelect}>Delete Account</Button>)
        }
    }

    function handleSelect(){
        setSelected(true)
    }

    function unselect(){
        setSelected(false)
    }

    function handleDelete(){
        fetch(deleteURL, {
            method:"POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true'
            }
        }).then(resp =>{
                if (resp.status !== 200){
                    alert("Deletion Failed")
                    throw new Error("Deletion Failed")
                }
            }
        ).then(
            setRedirect(true)
        )
    }

    function showButton(){
        if(lock){
            return(<Button variant="outline-primary" block size="lg" onClick={handleUpdate} className="btn3" disabled={!validForm()}>
                Edit Profile
            </Button>)
        }else{
            return(
                <ButtonGroup>
                    <Button variant="primary" block size="lg" onClick={handleClick} className="btn3" disabled={!validForm()}>
                        Submit
                    </Button>
                    <Button variant="secondary" block size="lg" onClick={handleCancel} className="btn3" disabled={!validForm()}>
                        Cancel
                    </Button>
                </ButtonGroup>
                )
        }

    }

    if (redirect){
        return (
            <div style = {{height:"100vh"}}>
                <div  style = {{height:"10vh", backgroundColor:"#222831"}}><TheNavbar/></div>
                    <div className = "dashboard-background-style">
                        <div style = {{marginTop: "2rem", textAlign:"center"}}>
                            <h1>Deletion Complete</h1>
                            <br/>
                            <br/>
                            <Link to={"/"}><Button>Back to homepage</Button></Link>
                        </div>
                    </div>
                <Footer/>
            </div>
        )
    }

    return(
        <div className = "background">
            <TheNavbar/>
            <div className = "login_signup_Firm" style = {profileStyle}>
                <div style = {{marginLeft:"1rem", marginRight: "1rem"}}>
                <h1>Profile</h1>
                <br/>
                <br/>
                {display()}
            </div>
            </div>
            <div style = {{marginTop:"1%"}}><Footer/></div>
        </div>
    )
}

export default Profile