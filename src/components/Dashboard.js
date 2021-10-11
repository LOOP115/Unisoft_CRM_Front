import React, {useEffect, useContext, useState} from "react";
import {EndPointContext} from "./App";
import TheNavbar from "./TheNavbar";
import ActivityItem from "./ActivityItem";
import Button from "react-bootstrap/Button";
import {Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Footer from "./Footer";

function Dashboard(){
    const URLEndContext = useContext(EndPointContext)
    const  getDashURL = URLEndContext + '/activity/all'
    const CARD_WIDTH = 400

    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [numRow, setNumRow] = useState(Math.floor(window.innerWidth / CARD_WIDTH))

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
                if (res.status !== 200) throw new Error("cannot fetch events")
                return res.json()
            }

        ).then(data => {
            setList(data)
            setLoading(false)
            console.log(JSON.stringify(data))
            return data
        }).catch(err => console.log(err))
    }

    function getCardPerRow(){
        console.log(window.screen.availWidth / 500)
        return (window.screen.availWidth / 500)
    }

    function printList(){
        if (loading){
            return(
                <h3>Loading...</h3>
            )
        }
        if (list.length === 0){
            return (
                <h3> You don't have any activities yet, create one now!</h3>
            )
        }
        return (
            //do stuff with each thing
            <div>
                <Row xs={1} md={numRow} className="g-4">
                {
                    list.map(activity => {
                        return(
                            <ActivityItem activity={activity}/>
                        )
                    })
                }
                </Row>
            </div>
        )
    }

    return(
        <div >
            <TheNavbar/>
            <div className = "dashboard-background-style">
            <div style = {{  marginLeft: "2%"}}>
            <br/>
            <h1>Events</h1>
            <br/>
            <Link to={"/dashboard/new"}><Button>+ Create New Activity</Button></Link>
            <br/>
            <br/>
            {printList()}
            </div>
            <div style = {{marginTop:"21%"}}><Footer/></div>
        </div>

        </div>
    )
}

export default Dashboard