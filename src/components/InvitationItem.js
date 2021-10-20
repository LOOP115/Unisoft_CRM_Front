import React, {useContext, useEffect, useState} from "react";
import Card from "react-bootstrap/Card"
import {Accordion, ButtonGroup, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {EndPointContext} from "./App";
import InviteItem from "./InviteItem";
import {Redirect} from "react-router-dom";

function InvitationItem(props){
    const activity = props.activity

    const URLEndContext = useContext(EndPointContext)
    const deleteURL = URLEndContext + "/incident/" + activity["actid"] + "/delete"
    const acceptURL = URLEndContext + "/incident/" + activity["actid"] + "/accept"


    const [participants, setParticipants] = useState([])
    const [creator, setCreator] = useState("")
    const [editRedirect, setEditRedirect] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(false)


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

    function handleAccept(){
        fetch(acceptURL,{
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

    function handleConfirm(){
        setConfirmDelete(true)
    }

    function deleteButton(){
        if(!activity["accept"]){
            return (
                <Button variant={"danger"} onClick={handleDelete}>Decline</Button>
            )
        }
        if (confirmDelete){
            return(
                <Button variant={"danger"} size={"sm"} onClick={handleDelete} style={{ marginRight:"0.5rem"}}>Confirm Delete</Button>
            )
        }
        else{
            return(
                <Button variant={"secondary"} size={"sm"} onClick={handleConfirm}>Delete</Button>
            )
        }
    }

    function acceptButton(){
        if(!activity["accept"]){
            return (
                <Button variant={"success"} onClick={handleAccept} style={{ marginRight:"0.5rem"}}>Accept</Button>
            )
        }
        return(<Button variant={"outline-success"} disabled={true}>Accepted</Button>)
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
                    <Card.Text>{activity["time"]}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Location: {activity["location"]}</Card.Subtitle>
                    <Card.Text>{activity["desc"]}</Card.Text>
                    <br/>
                    <br/>
                    <ButtonGroup>
                        {acceptButton()}
                        {deleteButton()}
                    </ButtonGroup>

                </Card.Body>
            </Card>
        </div>
    )

}

export default InvitationItem