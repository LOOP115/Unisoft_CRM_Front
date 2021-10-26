import React, {useEffect, useContext, useState} from "react";
import {EndPointContext} from "./App";
import TheNavbar from "./TheNavbar";
import ActivityItem from "./ActivityItem";
import Button from "react-bootstrap/Button";
import {Col, Form, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import ContactItem from "./ContactItem";
import Footer from "./Footer";

function InviteContact(props){
    const URLEndContext = useContext(EndPointContext)
    const getDashURL = URLEndContext + '/contact/all'
    const filterURL = URLEndContext + '/contact/'
    const activityid = parseInt(localStorage.getItem("actid"))
    const inviteURL = URLEndContext + '/activity/' + activityid + '/invite'
    const getAreadyInvitedURL = URLEndContext + "/activity/" + activityid + "/participants"
    const CARD_WIDTH = 400

    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [numRow, setNumRow] = useState(Math.floor(window.innerWidth / CARD_WIDTH))
    const [isFiltered, setIsFiltered] = useState(false)
    const [filterCompany, setFilterCompany] = useState("")
    const [filteredList, setFilteredList] = useState([])
    const [inviteSuccess, setInviteSuccess] = useState(false)

    const [width, setWidth] = React.useState(window.innerWidth);

    const updateWidth = () => {
        setWidth(window.innerWidth);
        let newNumRow = Math.floor(window.innerWidth/CARD_WIDTH)
        if (newNumRow !== numRow){
            setNumRow(newNumRow)
        }
    };

    React.useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    });

    useEffect(()=>{
        setup()
    },[])

    function setup(){
        localStorage.setItem("InviteIds", JSON.stringify([]))
        if (props.edit === true){
            console.log("coool")
            fetch(getAreadyInvitedURL,{
                method:"GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Credentials': 'true'
                }
            }).then((res)=>{
                if(res.status !== 200){
                    console.log("error on getting participants")
                    throw new Error("error on getting participants")

                }
                return res.json()
            }).then(result=>{
                console.log(JSON.stringify(result))
                let i;
                let alreadyIn = []
                for (i = 0; i < result.length; i++){
                    console.log(result[i]["contactid"])
                    alreadyIn.push(result[i]["contactid"])
                }
                console.log(alreadyIn)

                fetch(getDashURL, {method:'GET', credentials:'include', headers: {
                        'Content-Type': 'application/json'
                    }}).then
                (res=>{
                        if (res.status !== 200) throw new Error("cannot fetch contacts")
                        return res.json()
                    }

                ).then(data => {
                    let filteredData = []
                    for (i = 0; i < data.length; i++){
                        if (alreadyIn.indexOf(data[i]["contactid"]) < 0){
                            filteredData.push(data[i])
                        }
                    }
                    setList(filteredData)
                    setLoading(false)
                    return data
                }).catch(err => console.log(err))
            }).catch(error => console.log('error', error))
        }
        else {
            fetch(getDashURL, {
                method: 'GET', credentials: 'include', headers: {
                    'Content-Type': 'application/json'
                }
            }).then
            (res => {
                    if (res.status !== 200) throw new Error("cannot fetch contacts")
                    return res.json()
                }
            ).then(data => {
                setList(data)
                setLoading(false)
                console.log(JSON.stringify(data))
                return data
            }).catch(err => console.log(err))
        }
    }

    function handleInvite(){
        fetch(inviteURL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true'
            },
            body: (localStorage.getItem("InviteIds"))
        }).then(res => {
            if (res.status !== 200) {
                alert("Oops, Invitation Failed")
                throw Error("Creation failed");
            }

            return res.json()
        }).then(res => {
            localStorage.removeItem("InviteIds")
            localStorage.removeItem("actid")
            setInviteSuccess(true)
        }).catch(err => console.log(err))
    }


    function printList(){
        if (isFiltered){
            if (filteredList.length === 0){
                return(
                    <div>
                        <h3>You have no Contacts from the company {filterCompany}</h3>
                        <br/>
                        <Button size={"sm"} variant={"warning"} onClick={clearFilter}>Clear Filter</Button>
                        <br/>
                    </div>

                )
            }
            else{return(
                <div>
                    <p>Showing Results for {filterCompany}</p>
                    <Button size={"sm"} variant={"warning"} onClick={clearFilter}>Clear Filter</Button>
                    <br/>
                    <br/>
                    <Row xs={1} md={numRow} className="g-4">
                        {
                            filteredList.map(contact => {
                                return(
                                    <ContactItem contact={contact} invite={true}/>
                                )
                            })
                        }
                    </Row>
                </div>
            )
            }
        }
        if (loading){
            return(
                <h3>Loading...</h3>
            )
        }
        if (list.length === 0){
            if (props.edit){
                return (
                    <div>
                        <h3>Every available contact has already been added.</h3>
                        <br/>
                        <br/>
                        <Link to={"/dashboard"}><Button>
                            Go Back
                        </Button></Link>
                    </div>)
            }
            return (
                <div>
                    <h3> You cannot invite Contacts if you don't have any, Create one first</h3>
                    <br/>
                    <br/>
                    <Link to={"/dashboard"}><Button>
                        Go Back
                    </Button></Link>
                </div>

            )
        }
        return (
            //do stuff with each thing
            <div>
                <Row xs={1} md={numRow} className="g-4">
                    {
                        list.map(contact => {
                            return(
                                <ContactItem contact={contact} invite={true}/>
                            )
                        })
                    }
                </Row>
            </div>
        )
    }

    function clearFilter(){
        setFilteredList([])
        setFilterCompany("")
        setIsFiltered(false)
    }

    function handleFilter(){
        fetch(filterURL + filterCompany, {method:'GET', credentials:'include', headers: {
                'Content-Type': 'application/json'
            }}).then
        (res=>{
                if (res.status !== 200) throw new Error("cannot filter contacts")
                return res.json()
            }

        ).then(data => {
            setFilteredList(data)
            setIsFiltered(true)
            console.log(JSON.stringify(data))
            return data
        }).catch(err => console.log(err))
        console.log(filterCompany)
    }

    function showEditHint(){
        if(props.edit === true){
            return(<h3>Only not invited people listed here</h3>)
        }
        return(<></>)
    }

    if (inviteSuccess){
        return <Redirect to={"/dashboard"}/>
    }

    return(
        <div style = {{height:"100vh"}}>
            <div  style = {{height:"10vh", backgroundColor:"#222831"}}><TheNavbar/></div>
            <div className = "dashboard-background-style">
            <div style = {{marginLeft: "0.5rem"}}>
                <br/>
                <h1>Invite Contacts</h1>
                <br/>
                {showEditHint()}
                <br/>
                <Link to={"/dashboard"}><Button variant={"warning"} size={"sm"}>Proceed with no one invited</Button></Link>

                <br/>
                <br/>
                <Form>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                                Name
                            </Form.Label>

                            <Form.Control
                                className="mb-2"
                                id="Filtering"
                                placeholder="Filter by Company"
                                value={filterCompany}
                                onChange={(e) => setFilterCompany(e.target.value)}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button onClick={handleFilter}>
                                Filter
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <br/>
                {printList()}
                <br/>
                <Button size={"lg"} onClick={handleInvite}>Invite</Button>
            </div>
            <div style = {{marginTop:"22%"}}><Footer/></div>
        </div>
        </div>
    )
}

export default InviteContact