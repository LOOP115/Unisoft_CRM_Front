import React, {useContext, useState} from "react";
import Card from "react-bootstrap/Card"
import {Accordion, ButtonGroup, DropdownButton} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Dropdown, Modal} from "bootstrap";
import {EndPointContext} from "./App";
import {Redirect} from "react-router-dom";


function ContactItem(props){
    const contact = props.contact
    const inviteMode = props.invite

    const URLEndContext = useContext(EndPointContext)
    const deleteLink = URLEndContext + "/contact/" + contact["contactid"] + "/delete"

    const [redirect, setRedirect] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const [isInvited, setIsInvited] = useState(false)
    function deleteSet(){
        setDeleteConfirm(true)
    }

    function handleDelete(){
        fetch(deleteLink, {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "text/plain",
                'Access-Control-Allow-Credentials': 'true'
        },
        })
            .then(response => response.text())
            .then(result => {
                console.log(result)
                window.location.reload()
            })
            .catch(error => console.log('error', error));
    }

    function handleEdit(){
        localStorage.setItem("contactInfo", JSON.stringify(contact))
        setRedirect(true)
    }

    function handleInvite(){
        if (!isInvited) {
            let listStr = localStorage.getItem("InviteIds")
            let list = JSON.parse(listStr)

            let json = {
            contact_id: contact["contactid"]
            }
            list.push(json)
            let finalStr = JSON.stringify(list)
            localStorage.setItem("InviteIds", finalStr)
            setIsInvited(true)
        }
    }

    function handleUninvite(){
        if (isInvited) {
            let listStr = localStorage.getItem("InviteIds")
            let list = JSON.parse(listStr)
            for (let i = 0; i < list.length; i++){
                if (list[i].contact_id === contact["contactid"]){
                    list.splice(i, 1)
                    break
                }
            }
            let finalStr = JSON.stringify(list)
            localStorage.setItem("InviteIds", finalStr)
            setIsInvited(false)
        }
    }


    function getButton(){
        if (inviteMode){
            if(!isInvited){
                return (
                    <Button variant="outline-success" onClick = {handleInvite}>Invite</Button>
                )
            }
            else{
                return(<Button variant="success" onClick = {handleUninvite}>Cancel Invite</Button>)

            }


        }

        if (!deleteConfirm){
            return(<div>
                <Button variant="warning" onClick = {handleEdit}>Edit</Button>
                {'   '}
                <Button variant="secondary" onClick={deleteSet}>Delete</Button>
            </div>)
        }else{
            return(<div>
                <Button variant="danger" onClick={handleDelete}>Confirm Delete</Button>
                {'   '}
                <Button variant="warning" onClick = {handleEdit}>Edit</Button>
            </div>)
        }
    }

    if (redirect){
        return (
            <Redirect to={"/contacts/edit"}/>
        )
    }

    return(
        <div>

            <Card>
                <Card.Body>
                    <Card.Title>{contact["lastname"] + ", " + contact["firstname"]}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{contact["company"]}</Card.Subtitle>
                    <Card.Text>{contact["email"]}</Card.Text>
                    <Card.Text>{"Ph.: " + contact["phone"]}</Card.Text>
                    <br/>
                    <ButtonGroup>
                        {getButton()}

                    </ButtonGroup>
                </Card.Body>
            </Card>
        </div>
    )

}

export default ContactItem