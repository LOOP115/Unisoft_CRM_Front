import React, {useEffect, useContext, useState} from "react";
import {EndPointContext} from "./App";
import TheNavbar from "./TheNavbar";
import ActivityItem from "./ActivityItem";
import Button from "react-bootstrap/Button";
import {Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import ContactItem from "./ContactItem";
import Footer from "./Footer";

function Contacts(){
    const URLEndContext = useContext(EndPointContext)
    const getDashURL = URLEndContext + '/contact/all'
    const filterURL = URLEndContext + '/contact/filter/'
    const CARD_WIDTH = 400

    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [numRow, setNumRow] = useState(Math.floor(window.innerWidth / CARD_WIDTH))
    const [isFiltered, setIsFiltered] = useState(false)
    const [filterCompany, setFilterCompany] = useState("")
    const [filteredList, setFilteredList] = useState([])

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
        fetch(getDashURL, {method:'GET', credentials:'include', headers: {
                'Content-Type': 'application/json'
            }}).then
        (res=>{
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
                                    <ContactItem contact={contact}/>
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
            return (
                <h3> You don't have any Contacts yet, add one now!</h3>
            )
        }
        return (
            //do stuff with each thing
            <div>
                <Row xs={1} md={numRow} className="g-4">
                    {
                        list.map(contact => {
                            return(
                                <ContactItem contact={contact}/>
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

    return(
        <div style = {{height:"100vh",maxWidth:"100vw", width:"100vw"}}>
            <div  style = {{height:"10vh", backgroundColor:"#222831"}}><TheNavbar/></div>
            <div className = "dashboard-background-style">
                <div style = {{marginLeft: "0.5rem"}}>
      
                <br/>
                <h1>Contacts</h1>
                <br/>
                <Link to={"/contacts/new"}><Button>+ Create New Contact</Button></Link>
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
                                inputMode={"text"}
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
        </div>
        <div style = {{marginTop:"22%"}}><Footer/></div>
        </div>
        </div>
    )
}

export default Contacts