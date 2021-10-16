import React, {useContext, useState} from "react";
import Card from "react-bootstrap/Card"
import {Accordion, ButtonGroup, DropdownButton} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Dropdown, Modal} from "bootstrap";
import {EndPointContext} from "./App";
import {Redirect} from "react-router-dom";


function ContactItem(props){
    const contact = props.contact

    const URLEndContext = useContext(EndPointContext)
    const deleteLink = URLEndContext + "/contact/" + contact["contactid"] + "/delete"

    const [redirect, setRedirect] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    function deleteSet(){
        setDeleteConfirm(true)
    }

    function handleDelete(){
        fetch(deleteLink, {
            method: "GET",
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


    function getButton(){
        if (!deleteConfirm){
            return(<Button variant="secondary" onClick={deleteSet}>Delete</Button>)
        }else{
            return(<Button variant="danger" onClick={handleDelete}>Confirm Delete</Button>)
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
                        <Button variant="warning" onClick = {handleEdit}>Edit</Button>
                        {getButton()}

                    </ButtonGroup>
                </Card.Body>
            </Card>
        </div>
    )

}

export default ContactItem