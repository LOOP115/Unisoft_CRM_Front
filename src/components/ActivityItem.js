import React, {useContext, useEffect, useState} from "react";
import Card from "react-bootstrap/Card"
import {Accordion, ButtonGroup, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {EndPointContext} from "./App";
import InviteItem from "./InviteItem";
import {Link, Redirect} from "react-router-dom";

function ActivityItem(props){
    const activity = props.activity

    const URLEndContext = useContext(EndPointContext)
    const deleteURL = URLEndContext + "/activity/" + activity["actid"] + "/delete"
    const getAcceptURL = URLEndContext + "/activity/" + activity["actid"] + "/participants"

    const [participants, setParticipants] = useState([])
    const [editRedirect, setEditRedirect] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(false)

    useEffect(()=>{
        setup()
    }, [])

    function setup(){
        if (activity["invite"].length !== 0){
            fetch(getAcceptURL,{
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
                setParticipants(result)
                console.log(JSON.stringify(result))
            }).catch(error => console.log('error', error))
        }
    }

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
        if (participants.length === 0){
            return <p>loading...</p>
        }
        return(
            <div>
            {

                participants.map(contact => {
                    return(
                        <InviteItem person={contact} actid={activity["actid"]}/>
                    )
                })
            }
            </div>
        )
    }

    function handleEdit(){
        localStorage.setItem("actInfo", JSON.stringify(activity))
        setEditRedirect("/event/edit")
    }

    function handleInvite(){
        localStorage.setItem("actInfo", JSON.stringify(activity))
        setEditRedirect("/sendInvite")
    }

    function inviteButton(){
        if(activity["invite"].length > 0){
            return(<Button variant={"success"} onClick={handleInvite}>Send Invitation</Button>)
        }
        return(<Button variant={"outline-success"} disabled={true}>Only 1 Participant</Button>)
    }

    function handleConfirm(){
        setConfirmDelete(true)
    }

    function deleteButton(){
        if (confirmDelete){
            return(
                <Button variant={"danger"} size={"sm"} onClick={handleDelete}>Confirm Delete</Button>
            )
        }
        else{
            return(
                <Button variant={"secondary"} size={"sm"} onClick={handleConfirm}>Delete</Button>
            )
        }
    }

    function handleAdd(){
        localStorage.setItem("actid", activity["actid".toString()])
        setEditRedirect("/activity/editInvite")
    }


    if (editRedirect !== ""){
        return (
            <Redirect to={editRedirect}/>
        )
    }

    return(
        <div style = {{marginBottom: "2%"}}>
            <Card>

                <Card.Body>
                    <Card.Title><h4>{activity["title"]}</h4></Card.Title>
                    <Card.Text>{<h6>{activity["time"]}</h6>}</Card.Text>
                    <Card.Text>Location: {activity["location"]}</Card.Text>
                    <Card.Text>{activity["desc"]}</Card.Text><br/>
                    <Accordion defaultActiveKey="3">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Show Participants</Accordion.Header>
                            <Accordion.Body>
                                {getInviteList()}
                                <Button variant={"primary"} size={"sm"} onClick={handleAdd}>Add Attenders</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <br/>
                    {inviteButton()}
                    <br/>
                    <br/>
                    <ButtonGroup>
                        <Button variant={"warning"} size={"sm"} style={{ marginRight:"0.5rem"}} onClick={handleEdit}>Edit</Button>
                        {deleteButton()}
                    </ButtonGroup>

                </Card.Body>
            </Card>
        </div>
    )

}

export default ActivityItem