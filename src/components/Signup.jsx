import React, { useState, useContext } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import {EndPointContext} from './App.jsx'
import {Dropdown} from "react-bootstrap";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';
import './CSS/Signup.css'
import {formatDay} from "react-calendar/dist/umd/shared/dateFormatter";
import {Link} from "react-router-dom";
import Footer from "./Footer";

function Signup() {
  const URLEndContext = useContext(EndPointContext)
  const RegisterURL = URLEndContext + '/register'

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [date, setDate] = useState(new Date());
  const formatDate = dayjs(date).format('YYYY-MM-DD');

  const onChange = date => {
    setDate(date)
  }

  const [regFailed, setRegFailed] = useState(false)
  const [regSuccess, setRegSuccess] = useState(false)

  const signupStyle = {
    backgroundColor: "#E6E6E6",
    fontFamily: "Architects Daughter",
    textAlign: "center",
    height: "86vh",
    minHeight: "auto",
    maxHeight: "auto",
    marginTop: "0"
  }
  const marginTop = {
    marginTop:"2rem"
  }

  const mergeFirm = {
    mergeLeft: "100px"
  }

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
        firstname: fname,
        lastname: lname,
        email: email,
        password: password,
        username: username,
        birth:formatDate
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
    return (
        <div className = "background" style = {signupStyle}>
          <h1>Welcome, {username}!</h1>
          <br/>
          <h3>Click the following button to login with your credentials</h3>
          <br/>
          <Link to={"login"}><Button>login</Button></Link>
        </div>
    )
  }

  return (
    <div className = "background"><br /><br />
      <div style = {signupStyle} className = "login_signup_Firm">
        <h2> Signup </h2>
        <div style = {marginTop}>
          <Form >
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
            <br />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Date of Birth
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div>
                  <Calendar
                      onChange={onChange}
                      date={date}
                  />
                </div>
                {formatDate}
              </Dropdown.Menu>
            </Dropdown>
            Your date of birth: {formatDate}

            <br /><br />

            <Button variant="dark" block size="lg" onClick={handleClick} className="btn3" disabled={!validForm()}>
              Register
            </Button>
          </Form>
          <p style =  {marginTop}>Already have account? <a href="/login">Log in</a> </p>
        </div>         
      </div>
      <br /><br /><br />
      <Footer />  
      </div>
  );

}

export default Signup;
