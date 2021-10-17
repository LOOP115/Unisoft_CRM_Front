import React, {useContext, useState} from "react";
import Card from "react-bootstrap/Card"
import {Accordion, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {EndPointContext} from "./App";
import InviteItem from "./InviteItem";

function ActivityItem(props){
    const activity = props.activity

    const URLEndContext = useContext(EndPointContext)
    const deleteURL = URLEndContext + "/activity/" + activity["actid"] + "/delete"

    function handleDelete(){
        fetch(deleteURL,{
            method:"POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true'
            }
        }).then((res)=>{
            if(res.status !== 200){
                console.log("error on deletion")
                throw new Error("error on deletion")
            }
        }).then(result=>{
            window.location.reload()
        }).catch(error => console.log('error', error))

    }

    function getInviteList(){
        if(activity["invite"].length === 0){
            return <p>You are the only participant</p>
        }
        return(
            <div>
            {

                activity["invite"].map(contact => {
                    return(
                        <InviteItem person={contact} actid={activity["actid"]}/>
                    )
                })
            }
            </div>
        )
    }



    return(
        <div>
            <Card>
                <Card.Header>{activity["time"]}</Card.Header>
                <Card.Body>
                    <Card.Title>{activity["title"]}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Location: {activity["location"]}</Card.Subtitle>
                    <Card.Text>{activity["desc"]}</Card.Text>
                    <Accordion defaultActiveKey="3">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Show Participants</Accordion.Header>
                            <Accordion.Body>
                                {getInviteList()}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <br/>
                    <Button variant={"danger"} onClick={handleDelete}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    )

}

export default ActivityItem