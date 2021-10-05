import React, {useContext, useState, useEffect} from "react";
import {EndPointContext} from "./App";
import {Redirect} from "react-router-dom";


function Logout(props) {
    const URLEndContext = useContext(EndPointContext)
    const logoutURL = URLEndContext + '/logout'

    const [redirect, setRedirect] = useState(false)


    useEffect(()=>{
        setup()
    },[])

    function setup(){
        fetch(logoutURL, {method:'GET', credentials:'include', headers: {
                'Content-Type': 'application/json'
            }}).then
        (res=>{
                localStorage.clear()
                setRedirect(true)
            }

        )
    }

    if (redirect) return (<Redirect to={"/"}/>)

    return (<h3>Redirecting...</h3>)
}

export default Logout