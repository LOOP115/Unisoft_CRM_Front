import React from "react";
import ReactDOM from "react-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { render } from '@testing-library/react'

it("render login without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Login></Login>, div);
})


it("render signup without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Signup></Signup>, div);
})