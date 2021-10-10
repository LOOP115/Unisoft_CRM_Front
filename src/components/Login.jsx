import React, { useState, useContext } from 'react';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button";
import './CSS/Login.css'
import { Redirect } from "react-router-dom";
import { EndPointContext } from './App'
import Footer from "./Footer";

function Login(props) {

  const URLEndContext = useContext(EndPointContext)
  const loginURL = URLEndContext + '/login'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [loginFailed, setLoginFailed] = useState(false)
  const loginStyle = {
    backgroundColor: "#f8f0df",
    fontFamily: "Architects Daughter",
    textAlign: "center",
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

          <div className = "login_signup_Firm">
            <Alert variant="danger">
              Incorrect Email/Password!
            </Alert>
            <Form >
              <Form.Group size="lg" controlId="email">
                <Form.Label >Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button block size="lg" type="submit" disabled={!validForm()} onClick={handleClick}>
                Login
              </Button>
              <p>Does not have an account? <a href="/Signup">Sign up</a> </p>
            </Form>
          </div>
        </>
    )
  }
  return (
    <div className = "background">
    <br /><br /><br /><br /><br /><br /><br /><br />
      <div style={loginStyle} className = "login_signup_Firm">
        <Form >
          <h1>Login</h1> <br /><br /><br /><br />
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
          <br /><br />
          <p>Do not have an account? <a href="/Signup">Sign up</a> </p>
        </Form>
      </div>
      <br /><br /><br /><br /><br /><br /><br />
      <Footer />
      </div>
  )

  // return (
  //   <div className="container">
  //     <div className="heading">
  //       <h1>Log in</h1>
  //     </div>
  //     <div className="form">
  //       <form>
  //         <label>Email: </label>
  //         <input name="email" type="text"/>
  //         <br />
  //         <br />
  //         <label>Password: </label>
  //         <input name="password" type="text" />
  //         <br />
  //         <br />
  //       </form>
  //
  //       <button className="btn4" type="submit">
  //         Login
  //       </button>
  //     </div>
  //   </div>
  // );
}

export default Login;
