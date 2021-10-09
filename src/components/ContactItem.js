import React, {useContext, useState} from "react";
import Card from "react-bootstrap/Card"
import {Accordion} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ContactItem(props){
    const contact = props.contact

    return(
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>{contact["lastname"] + ", " + contact["firstname"]}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{contact["company"]}</Card.Subtitle>
                    <Card.Text>{contact["email"]}</Card.Text>
                    <Card.Text>{"Ph.: " + contact["phone"]}</Card.Text>
                    <br/>
                    <Button variant={"danger"}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    )

}

export default ContactItem