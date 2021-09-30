import React, { useState, useContext } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import {EndPointContext} from './App.jsx'
import './CSS/Signup.css'

function Signup() {
  const URLEndContext = useContext(EndPointContext)
  const RegisterURL = URLEndContext + '/register'

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const [regFailed, setRegFailed] = useState(false)
  const [regSuccess, setRegSuccess] = useState(false)

  function validForm(){
    return (email.length > 0) && (password.length > 0) && (username.length > 0)
  }

  function handleClick(event) {

    fetch(RegisterURL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        firstName: fname,
        lastName: lname,
        email: email,
        password: password,
        username: username
      })
    }).then(res => {
      if (res.status !== 200) {
        alert("Oops, Cannot sign up")
        setRegFailed(true)
        throw Error("Register failed");

      }

      return res.json()
    }).then(res => {
      setRegSuccess(true)
    }).catch(err => console.log(err))


    setPassword('')

  } // end handleSubmit


  // maybe redirect user to an error page on error
  if (regFailed) {
    return <Alert variant="danger">
      Oops! Something went wrong
    </Alert>
  }

  if (regSuccess) {
    return <Alert variant="success">
      `Welcome! ${username}`
    </Alert>
  }

  return (
      <>
        <h2> Signup </h2>
        <div className="Signup">
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                  placeholder="Enter Your Email Address"
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Username
              </Form.Label>
              <Form.Control
                  placeholder="Enter Your Username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
              />

              <Form.Group>
                <Form.Label>
                  First Name
                </Form.Label>
                <Form.Control
                    placeholder="Enter Your Firstname"
                    type="text"
                    value={fname}
                    onChange={(e) => { setFname(e.target.value);}}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Last Name
                </Form.Label>
                <Form.Control
                    placeholder="Enter Your Lastname"
                    type="text"
                    value={lname}
                    onChange={(e) => { setLname(e.target.value);}}
                />
              </Form.Group>


            </Form.Group>

            <Form.Group size="sm">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" block size="lg" onClick={handleClick} className="btn" disabled={!validForm()}>
              Register
            </Button>
          </Form>
          <p>Already have account? <a href="/login">Log in</a> </p>
        </div>
      </>
  );

}

export default Signup;
