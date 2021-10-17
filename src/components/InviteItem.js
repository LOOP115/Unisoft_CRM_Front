import React, {useContext} from "react";
import Button from "react-bootstrap/Button";
import {Badge} from "react-bootstrap";
import {EndPointContext} from "./App";

function InviteItem(props){
    let person = props.person
    let actid = props.actid

    const URLEndContext = useContext(EndPointContext)
    const  DeleteURL = URLEndContext + '/activity/' + actid + '/invite/' + person["contactid"] + '/delete'

    function handleRemove(){
        fetch(DeleteURL,{
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

    return (<div>
                {person["firstname"] + " " + person["lastname"]}
                <Button variant="link" onClick={handleRemove}>Remove</Button>
            <Badge bg={"success"}>√</Badge>
            <Badge bg={"danger"}>×</Badge>

            </div>

    )
}

export default InviteItem