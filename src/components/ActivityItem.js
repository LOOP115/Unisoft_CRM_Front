import React, {useContext, useState} from "react";
import Card from "react-bootstrap/Card"
import {Accordion} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ActivityItem(props){
    const activity = props.activity

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
                                Participants not implemented, just here to have a basic idea.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <br/>
                    <Button variant={"danger"}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    )

}

export default ActivityItem