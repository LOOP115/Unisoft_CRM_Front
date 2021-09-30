import React, { useState } from 'react';
import {Dropdown} from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function Signup() {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date)
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>Sign up</h1>
      </div>
      <div className="form">
        <form>
          <label>Name: </label>
          <input name="name" type="text"/>
          <br />
          <br />
          <label>Email: </label>
          <input name="email" type="text"/>

          <br />
          <br />
          <label>Password: </label>
          <input name="password" type="text" />
          <br />
          <br />
          <label>Re-input Password: </label>
          <input name="password" type="text"/>
          <br />
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
                {date.toString()}
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <br />
        </form>

        <button className="btn4" type="submit">
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;
