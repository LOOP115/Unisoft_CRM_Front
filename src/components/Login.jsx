import React, { useState, useContext } from 'react';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button";
import './CSS/Login.css'
import {Link, Redirect} from "react-router-dom";
import { EndPointContext } from './App'
import Footer from "./Footer";

function Login(props) {

  const URLEndContext = useContext(EndPointContext)
  const loginURL = URLEndContext + '/login'
  // const resetURL = "https://unisoft-back.herokuapp.com/reset_password"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [loginFailed, setLoginFailed] = useState(false)
  const loginStyle = {
    backgroundColor: "#E6E6E6",
    fontFamily: "Architects Daughter",
    textAlign: "center",
    height: "80vh",
    marginTop: "5rem"
  }

  function handleClick(e) {
    e.preventDefault()
    /* Send the POST request and save JWT to localStorage */
    fetch(loginURL, { method: 'POST', credentials: 'include', headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'

      },
      body: JSON.stringify({
        email: email,
        password: password})
    })
        .then(res => {
          console.log(JSON.stringify({email: email, password: password}))
          if (res.status !== 200 && res.status!== 300) throw new Error("Connection error")
          return res.json()
        })
        .then(data => {
          if (data.hasOwnProperty("error")) throw new Error("Wrong Email/Password")
          localStorage.setItem("username", data["username"])
          localStorage.setItem("userID", data["userid"])
          localStorage.setItem("email", data["email"])
          localStorage.setItem("logIn", "true")
          setRedirect("/dashboard")

        })
        .catch(err => {console.error(err); setLoginFailed(true)})

    //clean the email and pw fields
    setPassword('')
  }

  function validForm() {
    return email.length > 0 && password.length > 0
  }

  if (redirect) {
    return (<Redirect to={"/dashboard"} />);
  }
  if (loginFailed){
    return (<>
        <div className = "background">
        <br/>
          <div style={loginStyle} className = "login_signup_Firm">
            <Alert variant="danger">
              Incorrect Email/Password!
            </Alert>
            <br/><br/>
            <Form >
              <a href={"/"}><Button variant={"warning"} size={"sm"}>Back</Button></a>
              <br /><br /><br /><br/><br/>
              <Form.Group size="lg" controlId="email">
                <Form.Label >Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group><br/><br/>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group><br/><br/>
              <Button block size="lg" type="submit" disabled={!validForm()} onClick={handleClick}>
                Login
              </Button><br/><br/><br/>
              <p>Don't have an account? <a href="/Signup">Sign up</a> </p>
              <p>Forgot your Password? <a href="https://unisoft-back.herokuapp.com/reset_password">Reset here</a>.</p>
            </Form>
          </div>
          <Footer />
          </div>
        </>
    )
  }
  return (
    <div className = "background">
    <br />
      <div style={loginStyle} className = "login_signup_Firm">
        <Form >
          <a href={"/"}><Button variant={"warning"} size={"sm"}>Back</Button></a>
          <br /><br/><br/>
          <h1>Login</h1> <br /><br />
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label><br />
            <Form.Control
                autoFocus
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
          <br /><br />
            <Form.Label>Password</Form.Label>
            <br />
            <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br /><br />
          <Button block size="lg" type="submit" disabled={!validForm()} onClick={handleClick}>
            Login
          </Button>
          <br /><br /><br/>
          <p>Don't have an account? <a href="/Signup">Sign up</a> </p>
          <p>Forgot your Password? <a href="https://unisoft-back.herokuapp.com/reset_password">Reset here</a>.</p>
        </Form>
      </div>
      <Footer />
      </div>
  )
}

export default Login;
